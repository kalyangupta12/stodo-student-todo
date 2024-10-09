import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Input,
  Card,
} from "@material-tailwind/react";
import PomoDoro from './PomoDoro';

function MainPart() {
  // Initialize todoList from localStorage if available
  const [todo, setTodo] = useState("");   // State for the todo input
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem("todoList");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });  // State for the list of todos
  const [isEditing, setIsEditing] = useState(false);  // State to track if editing a todo
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);  // State to track which todo is being edited

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
        setTodoList([...todoList, trimmedTodo]);  // Add new todo to the list
      }
      setTodo("");  // Clear the input
    }
  };

  // Function to delete a todo
  const deleteTodo = (index) => {
    const updatedTodos = todoList.filter((_, i) => i !== index);  // Remove the todo
    setTodoList(updatedTodos);
  };

  // Function to set a todo for editing
  const editTodo = (index) => {
    setTodo(todoList[index]);  // Set the selected todo text into the input
    setIsEditing(true);  // Set editing state to true
    setCurrentTodoIndex(index);  // Set the index of the todo being edited
  };

  // Save todoList to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="min-h-screen bg-white-100 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Spotify Playlist */}
        <div className="col-span-1">
          <Card className="p-4 shadow-lg">
            <div className="w-full h-full">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/0ofsIXBCxkqYtt30YoJm1c?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </Card>
        </div>

        {/* Center: Todo List */}
        <div className="col-span-1">
          <Card className="p-6 shadow-lg">
            {/* Add a todo heading */}
            <Typography variant="h4" color="black" className="mb-4 mt-4 text-center">
              Add a Todo
            </Typography>

            {/* Todo input with extended width */}
            <div className="relative flex w-full gap-2">
              <Input
                type="text"
                color="black"
                label="Type your todo here..."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}  // Update todo state
                className="pr-20 w-full"  // Extend the width
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

            {/* Display list of todos */}
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
                          onClick={() => editTodo(index)}  // Trigger edit mode for the selected todo
                          className="rounded"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="black"
                          onClick={() => deleteTodo(index)}  // Delete the selected todo
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
