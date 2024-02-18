import { BrowserRouter } from "react-router-dom";
import './App.css';
import { useState, useEffect } from "react";

import userContext from "./userContext";

import Navbar from "./Navbar";
import RoutesList from "./RoutesList";

import JoblyApi from "./api";

const DEFAULT_USER_DATA = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
};

/** Jobly App.
 *
 * Props: none
 *
 * State:
 *  - userData: current logged in user, if any. Defaults to landing page with
 *  unauthorized if no logged in user.
 *  - applicationIds: set of application IDs for applied jobs.
 *
 * App -> { Navbar, RoutesList }
 */
function App() {
  const [userData, setUserData] = useState({ DEFAULT_USER_DATA });
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  console.log("App userData state: ", userData);
  console.log("App applicationIds: ", applicationIds);

  useEffect(function getLoginFromLocalStorageOnMount() {
    console.log("App useEffect for local storage");
    async function getStoredLogin() {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      console.log("localStorage username + token: ", username, token);

     JoblyApi.token = token;
     try {
      const user = await JoblyApi.getUser(username);
      setUserData(user);
      console.log("This is user: ", user);
      console.log("This is user.applications: ", user.applications);
      setApplicationIds(new Set(user.applications));
     } catch (err) {
      console.log(err);
     }
    }
    getStoredLogin();
  }, []);

  /** signUp: Registers the user with the SignUpForm data.
   * Stores user's username, first name, last name, and email in userData.
   */
  async function signUp({ username, password, firstName, lastName, email }) {
    const token = await JoblyApi
      .registerUser(username, password, firstName, lastName, email);

    const userData = await JoblyApi.getUser(username);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);

    setUserData({
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    });
  }

  /** login: Logins the user with the LoginForm data.
   *  Stores user's username, first name, last name, and email in userData.
   *
  */
  async function login({ username, password }) {
    const token = await JoblyApi.loginUser(username, password);

      const userData = await JoblyApi.getUser(username);
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);

    setUserData({
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    });

    setApplicationIds(new Set(userData.applications));
  }

  /** logout: Resets userData to default. */

  function logout() {
    localStorage.clear();
    setUserData(DEFAULT_USER_DATA);
  }

  /** updateUserProfile: updates user's profile from ProfileForm component. */
  async function updateUserProfile({ username, firstName, lastName, email }) {
    const updatedUserData = await JoblyApi.updateUser(
      username,
      {
        firstName,
        lastName,
        email
      }
    )

    setUserData(prevUserData => ({
      ...prevUserData,
      firstName: firstName,
      lastName: lastName,
      email: email
    }));
  }

  /** hasAppliedToJob: checks if job has been applied to. */
  function hasAppliedToJob(jobId) {
    return applicationIds.has(jobId);
  }

  /** applyToJob: updates user's set of applied jobs. */
  function applyToJob(jobId) {
    const username = userData.username;
    if (hasAppliedToJob(jobId)) return;
    JoblyApi.applyToJob(username, jobId);
    setApplicationIds(new Set([...applicationIds, jobId]));
  }

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider
          value={{
            user: userData,
            hasAppliedToJob: hasAppliedToJob,
            applyToJob: applyToJob,
            }}
          >
          <Navbar logout={logout} />
          <RoutesList
            signUp={signUp}
            login={login}
            updateProfile={updateUserProfile}
          />
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
