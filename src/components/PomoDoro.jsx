import React, { useEffect, useState } from "react";
import { Button, Typography, Card } from "@material-tailwind/react";

function PomoDoro() {
  const defaultTime = 25 * 60; // Default time is 25 minutes in seconds
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const savedTime = localStorage.getItem("secondsLeft");
    return savedTime ? JSON.parse(savedTime) : defaultTime;
  });
  const [timer, setTimer] = useState(null); // Timer reference
  const alarmSound = new Audio("/alarm.mp3"); // Path to the alarm sound

  // Preload alarm sound
  useEffect(() => {
    alarmSound.load();
  }, [alarmSound]);

  // Start the timer
  const start = () => {
    if (!timer && secondsLeft > 0) { // Only start if no timer is running and time is left
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
    <Card className="p-6 shadow-lg">
      <Typography variant="h2" color="black" className="mb-4 text-center">
        Pomodoro Timer
      </Typography>

      <Typography variant="h3" color="black" className="font-mono text-4xl text-center">
        {formatTime()} {/* Display the formatted time */}
      </Typography>

      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={start} size="lg" color="black">
          Start
        </Button>
        <Button onClick={reset} size="lg" color="black">
          Reset
        </Button>
      </div>
    </Card>
  );
}

export default PomoDoro;
