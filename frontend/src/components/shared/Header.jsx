import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutSuccess } from "@/redux/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // State to control dropdown

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    } else {
      setSearchTerm("");
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <header className="shadow-lg sticky">
      <div className="flex justify-between items-center max-w-6xl lg:max-w-7xl mx-auto p-4">
        <Link to={"/"}>
          <h1 className="font-bold text-xl sm:text-2xl flex flex-wrap">
            <span className="text-slate-500">Morning</span>
            <span className="text-slate-900">Dispatch</span>
          </h1>
        </Link>

        <form
          className="p-3 bg-slate-100 rounded-lg flex items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none bg-transparent w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="hidden lg:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden lg:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to={"/news"}>
            <li className="hidden lg:inline text-slate-700 hover:underline">
              News Articles
            </li>
          </Link>
        </ul>

        {currentUser ? (
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button onClick={() => setMenuOpen((prev) => !prev)}>
                <img
                  src={currentUser.profilePicture}
                  alt="user photo"
                  className="w-10 h-10 rounded-full"
                />
              </button>
            </DropdownMenuTrigger>

            {menuOpen && ( // Show menu only when open
              <DropdownMenuContent
                className="w-60"
                align="end"
                onClick={() => setMenuOpen(false)} // Auto close when clicking inside
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-400" />

                <DropdownMenuItem onClick={() => setMenuOpen(false)}>
                  <div className="flex flex-col gap-1">
                    <span>@{currentUser.username}</span>
                    <span>@{currentUser.email}</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setMenuOpen(false)}>
                  <Link to="/dashboard?tab=profile">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    handleSignout();
                    setMenuOpen(false);
                  }}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        ) : (
          <Link to={"/sign-in"}>
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;