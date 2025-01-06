import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Input,
  Card,
} from "@material-tailwind/react";
import PomoDoro from './PomoDoro';

function MainPart() {
  // State for todo list
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem("todoList");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);

  // State for playlists
  const [soundcloudUrl, setSoundcloudUrl] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [savedSoundcloudUrl, setSavedSoundcloudUrl] = useState("");
  const [savedSpotifyUrl, setSavedSpotifyUrl] = useState("");

  // Load saved playlists from localStorage on component mount
  useEffect(() => {
    const savedSoundcloud = localStorage.getItem("soundcloudUrl");
    const savedSpotify = localStorage.getItem("spotifyUrl");
    if (savedSoundcloud) setSavedSoundcloudUrl(savedSoundcloud);
    if (savedSpotify) setSavedSpotifyUrl(savedSpotify);
  }, []);

  // Save todoList to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // Function to save playlists to localStorage
  const savePlaylists = () => {
    localStorage.setItem("soundcloudUrl", soundcloudUrl);
    localStorage.setItem("spotifyUrl", spotifyUrl);
    setSavedSoundcloudUrl(soundcloudUrl);
    setSavedSpotifyUrl(spotifyUrl);
    setSoundcloudUrl("");
    setSpotifyUrl("");
  };

  // Function to add or edit a todo
  const handleTodo = () => {
    const trimmedTodo = todo.trim();
    if (trimmedTodo) {
      if (isEditing) {
        const updatedTodos = todoList.map((item, index) =>
          index === currentTodoIndex ? trimmedTodo : item
        );
        setTodoList(updatedTodos);
        setIsEditing(false);
      } else {
        setTodoList([...todoList, trimmedTodo]);
      }
      setTodo("");
    }
  };

  // Function to delete a todo
  const deleteTodo = (index) => {
    const updatedTodos = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodos);
  };

  // Function to set a todo for editing
  const editTodo = (index) => {
    setTodo(todoList[index]);
    setIsEditing(true);
    setCurrentTodoIndex(index);
  };

  return (
    <div className="min-h-screen bg-white-100 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Playlist Section */}
        <div className="col-span-1">
          <Card className="p-4 shadow-lg">
            <Typography variant="h4" color="black" className="mb-4 mt-4 text-center">
              Add Your Playlist
            </Typography>

            {/* Input for SoundCloud Playlist */}
            <div className="mb-4">
              <Input
                type="text"
                color="black"
                label="SoundCloud Playlist URL"
                value={soundcloudUrl}
                onChange={(e) => setSoundcloudUrl(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Input for Spotify Playlist */}
            <div className="mb-4">
              <Input
                type="text"
                color="black"
                label="Spotify Playlist URL"
                value={spotifyUrl}
                onChange={(e) => setSpotifyUrl(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Save Button */}
            <Button
              color="black"
              onClick={savePlaylists}
              className="w-full"
            >
              Save Playlists
            </Button>

            {/* Display Saved SoundCloud Playlist */}
            {savedSoundcloudUrl && (
              <div className="mt-6">
                <Typography variant="h6" color="black" className="mb-2">
                  Your SoundCloud Playlist
                </Typography>
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(savedSoundcloudUrl)}&color=%23181c1c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
                  style={{ borderRadius: "12px" }}
                ></iframe>
              </div>
            )}

            {/* Display Saved Spotify Playlist */}
            {savedSpotifyUrl && (
              <div className="mt-6">
                <Typography variant="h6" color="black" className="mb-2">
                  Your Spotify Playlist
                </Typography>
                <iframe
                  style={{ borderRadius: "12px" }}
                  src={`https://open.spotify.com/embed/${savedSpotifyUrl.split('/').pop()}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </Card>
        </div>

        {/* Center: Todo List */}
        <div className="col-span-1">
          <Card className="p-6 shadow-lg">
            <Typography variant="h4" color="black" className="mb-4 mt-4 text-center">
              Add a Todo
            </Typography>
            <div className="relative flex w-full gap-2">
              <Input
                type="text"
                color="black"
                label="Type your todo here..."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className="pr-20 w-full"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleTodo();
                }}
              />
              <Button
                size="sm"
                color="black"
                onClick={handleTodo}
                className="!absolute right-1 top-1 rounded"
              >
                {isEditing ? "Update" : "Add"}
              </Button>
            </div>
            <div className="mt-6 w-full">
              {todoList.length > 0 && (
                <ul className="list-disc pl-5">
                  {todoList.map((item, index) => (
                    <li key={index} className="flex justify-between items-center mb-2">
                      <span className="text-black">{item}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          color="black"
                          onClick={() => editTodo(index)}
                          className="rounded"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="black"
                          onClick={() => deleteTodo(index)}
                          className="rounded"
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>
        </div>

        {/* Right Side: Pomodoro Timer */}
        <div className="col-span-1">
          <PomoDoro />
        </div>
      </div>
    </div>
  );
}

export default MainPart;
