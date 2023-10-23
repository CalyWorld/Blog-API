import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <header className="flex p-10 justify-between">
      <h1>Member</h1>
      <ul className="flex gap-5 items-center">
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
        <li>
          <Link to="/getstarted">
            <button>Get Started</button>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Nav;
