import React, { useEffect, useState } from "react";
import { Button, Typography, Card, Input } from "@material-tailwind/react";

function PomoDoro() {
  const defaultTime = 25 * 60; // Default time is 25 minutes in seconds
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const savedTime = localStorage.getItem("secondsLeft");
    return savedTime ? JSON.parse(savedTime) : defaultTime;
  });
  const [timer, setTimer] = useState(null); // Timer reference
  const [manualTime, setManualTime] = useState(""); // State for manual time input
  const alarmSound = new Audio("/alarm.mp3"); // Path to the alarm sound

  // Preload alarm sound
  useEffect(() => {
    alarmSound.load();
  }, [alarmSound]);

  // Start the timer
  const start = () => {
    if (!timer && secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0)); // Prevent negative time
      }, 1000);
      setTimer(interval);
    }
  };

  // Reset the timer to the default time and clear any running interval
  const reset = () => {
    clearInterval(timer); // Stop the current timer
    setTimer(null); // Reset the timer reference
    setSecondsLeft(defaultTime); // Reset the timer to default time (25 minutes)
    localStorage.setItem("secondsLeft", JSON.stringify(defaultTime)); // Update localStorage
  };

  // Set manual timer
  const setManualTimer = () => {
    const timeInMinutes = parseInt(manualTime, 10);
    if (!isNaN(timeInMinutes) && timeInMinutes > 0) {
      const newTime = timeInMinutes * 60;
      setSecondsLeft(newTime);
      localStorage.setItem("secondsLeft", JSON.stringify(newTime));
      setManualTime(""); // Clear the input field
    } else {
      alert("Please enter a valid time in minutes.");
    }
  };

  // Save the time in local storage whenever it updates
  useEffect(() => {
    localStorage.setItem("secondsLeft", JSON.stringify(secondsLeft));

    if (secondsLeft === 0 && timer) {
      clearInterval(timer);
      setTimer(null);
      alarmSound.play(); // Play alarm sound
    }
  }, [secondsLeft, timer, alarmSound]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  // Format the time into minutes and seconds
  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <Card className="p-8 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl w-full max-w-md">
        <Typography variant="h2" color="blue-gray" className="mb-6 text-center font-bold">
          Pomodoro Timer
        </Typography>

        {/* Timer Display */}
        <div className="flex justify-center mb-8">
          <Typography
            variant="h1"
            color="blue-gray"
            className="font-mono text-6xl font-bold"
          >
            {formatTime()}
          </Typography>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={start}
            size="lg"
            color="green"
            className="flex items-center gap-2"
            disabled={timer !== null}
          >
            <i className="fas fa-play" /> Start
          </Button>
          <Button
            onClick={reset}
            size="lg"
            color="red"
            className="flex items-center gap-2"
          >
            <i className="fas fa-redo" /> Reset
          </Button>
        </div>

        {/* Manual Timer Set Section */}
        <div className="flex flex-col items-center gap-4">
          <Typography variant="h6" color="blue-gray" className="font-semibold">
            Set Custom Time
          </Typography>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={manualTime}
              onChange={(e) => setManualTime(e.target.value)}
              placeholder="Enter minutes"
              className="w-32 text-center"
              labelProps={{ className: "hidden" }}
            />
            <Button
              onClick={setManualTimer}
              size="md"
              color="blue"
              className="flex items-center gap-2"
            >
              <i className="fas fa-clock" /> Set
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PomoDoro;
