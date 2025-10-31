import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { RiFileEditLine } from "react-icons/ri";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

  return (
    <nav className="relative flex items-center justify-between gap-4 p-4 border-b border-gray-100">
      <Link to="/" className="flex-none w-10 h-10">
        <img src={logo} className="object-contain" alt="Logo" />
        {/* Accessibility: Added alt text */}
      </Link>

      {/* CHANGED: This is the main fix.
        - Removed "md:show", "show", and "hide" classes.
        - Added a template literal `${...}` to conditionally apply classes.
        - On mobile: Toggles opacity and pointer-events based on `searchBoxVisibility`.
        - On desktop (md:): Always sets opacity to 100 and enables pointer-events.
        - Added `transition-all` for the animation.
      */}
      <div
        className={`
          absolute bg-white w-full left-0 top-full mt-0.5 border-b border-gray-200 
          md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto 
          transition-all duration-300
          ${
            searchBoxVisibility
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
          md:opacity-100 md:pointer-events-auto
        `}>
        {/* Added 'relative' to this parent div to correctly position the icon */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-gray-100 p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-gray-500 md:pl-12" // Changed placeholder color
          />
          <CiSearch className="absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-gray-500" />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button
          className="md:hidden bg-gray-200 h-12 w-12 rounded-full flex items-center justify-center" 
          onClick={() => {
            setSearchBoxVisibility((currentVal) => !currentVal);
          }}>
          <CiSearch className="text-xl" />
        </button>

        
        <Link
          to="/editor"
          className="hidden md:flex gap-2 items-center text-gray-600 hover:text-black">
          <RiFileEditLine />
          <p>Write</p>
        </Link>

 
        <Link
          className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
          to="/signin">
          Sign-In
        </Link>

       
        <Link
          className="bg-gray-200 text-black px-5 py-2 rounded-full hover:bg-gray-300 transition-colors hidden md:block"
          to="/signup">
          Sign-Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
