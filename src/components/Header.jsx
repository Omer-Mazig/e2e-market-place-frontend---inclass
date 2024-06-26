import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Menu, Settings } from "lucide-react";

function TopNavLink({ to, children }) {
  return (
    <li className="ml-2 flex sm:ml-0">
      <NavLink
        to={to}
        className={({ isActive }) =>
          twMerge(
            clsx(
              "flex items-center px-2 py-2 sm:px-4",
              "text-zinc-600 hover:text-zinc-900",
              "transition-colors duration-200",
              "uppercase tracking-widest",
              isActive ? "font-bold text-orange-500 hover:text-orange-700" : "",
            ),
          )
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

export function Header() {
  const { loggedInUser, setLoggedInUser } = useUserContext();

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedInUser(null);
  }

  return (
    <header className="flex flex-col justify-between bg-white shadow-sm hover:shadow-lg sm:h-14 sm:flex-row">
      <div className="flex items-center justify-between bg-sky-900 px-4 py-2 text-xl font-bold uppercase tracking-widest text-white sm:py-0">
        <Link to="/">
          <span>
            Marketplace<span className="text-orange-500">.</span>
          </span>
        </Link>
        <div className="flex items-center justify-center sm:hidden">
          <button className="text-white focus:outline-none">
            <Menu />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <nav className="hidden flex-col sm:flex sm:h-full sm:flex-row sm:items-center">
          <ul className="flex h-full flex-col justify-between px-4 py-2 sm:flex-row sm:py-0">
            <TopNavLink to="/product">Products</TopNavLink>
            {loggedInUser ? (
              <button
                className="ml-2 uppercase tracking-widest text-zinc-600 transition-colors duration-200 hover:text-zinc-900 sm:ml-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <TopNavLink to="/auth/register">Register</TopNavLink>
                <TopNavLink to="/auth/login">Login</TopNavLink>
              </>
            )}
          </ul>
        </nav>
        <div className="mr-4 hidden items-center sm:flex">
          <button>
            <Settings />
          </button>
        </div>
      </div>
    </header>
  );
}
