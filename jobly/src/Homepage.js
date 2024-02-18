import "./Homepage.css";

import { useContext } from "react";
import userContext from "./userContext";

/** Homepage: component for landing page on Jobly app.
 *
 *  Props: None
 *
 *  Status: None
 *
 *  App -> Homepage
 */

function Homepage() {

  const { user } = useContext(userContext);

  const { firstName } = user;


  return (
    <div className="Homepage">
      <h1>Jobly</h1>
      <h2>All the jobs in one convenient place.</h2>
      {firstName && <h3>Welcome, {firstName}! GET THOSE JOBS!!</h3>}
      <p>Background Image from Vecteezy.</p>
    </div>
  );
}

export default Homepage;
