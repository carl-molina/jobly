import { NavLink } from "react-router-dom";
import "./Navbar.css";

import { useContext } from "react";
import userContext from "./userContext";

/** Navbar: component for Jobly app
 *
 *  Props: logout
 *
 *  State: none
 *
 *  App -> Navbar
 */

function Navbar({ logout }) {

  const { user } = useContext(userContext);
  const { username } = user;

  return (
    <div className="Navbar">
      <nav>
        <NavLink to="/" className="Navbar-title">Jobly</NavLink>
        <ul>

          {/* if user logged in, show this in navbar */}
          {username &&
            <>
              <li><NavLink to="/companies">Companies</NavLink></li>
              <li><NavLink to="/jobs">Jobs</NavLink></li>
              <li><NavLink to="/profile">{username}'s Profile</NavLink></li>
              <li><a onClick={logout}>LOGOUT</a></li>
            </>
          }

          {/* if user not logged in, show this in navbar */}
          {!username &&
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/signup">Signup</NavLink></li>
            </>
          }
        </ul>
      </nav>
    </div>
  );
}


export default Navbar;