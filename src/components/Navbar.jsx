import React, { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);

  // Handle resizing for mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="flex flex-col lg:flex-row lg:items-center gap-4">
      <li>
        <a href="#" className="text-blue-gray-700 hover:text-blue-500">
          About
        </a>
      </li>
      <li>
        <a href="#" className="text-blue-gray-700 hover:text-blue-500">
          Blocks
        </a>
      </li>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 w-full bg-white shadow-lg py-2 px-4 lg:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          className="text-xl font-semibold text-blue-gray-900"
        >
          Stodo - Student Todo
        </Typography>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-6">
          {navList}
          <Button variant="text" className="text-blue-gray-700">
            Home
          </Button>
          <Button variant="gradient">Your Task</Button>
        </div>
        
        {/* Mobile Menu Icon */}
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>

      {/* Mobile Navigation */}
      <MobileNav open={openNav}>
        <div className="flex flex-col items-center gap-4 mt-4">
          {navList}
          <Button variant="text" fullWidth>
            Home
          </Button>
          <Button variant="gradient" fullWidth>
            Your Task
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}

export default StickyNavbar;
