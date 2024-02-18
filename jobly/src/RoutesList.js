import { Navigate, Routes, Route } from "react-router-dom";

import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";

import Homepage from "./Homepage";
import JobList from "./JobList";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";

import { useContext } from "react";
import userContext from "./userContext";


/** RoutesList: list of routes for Jobly app.
 *
 *  Props: signUp, login
 *
 *  State: none
 *
 *  App -> RoutesList -> { Homepage, CompanyList, JobList, CompanyDetail }
*/

function RoutesList({ signUp, login, updateProfile }) {
  const { user } = useContext(userContext);
  const { username } = user;

  return (
    <div className="RoutesList">
      <Routes>
        <Route path="/" element={<Homepage />} />

        {/* if user signed in, these routes available */}
        {username &&
          <>
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/jobs" element={<JobList />} />
            <Route
              path="/profile"
              element={<ProfileForm updateProfile={updateProfile} />}
            />
          </>
        }

        {/* if no user signed in, these routes available */}
        {!username &&
          <>
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route
              path="/signup"
              element={<SignUpForm
                signUp={signUp} />}
            />
          </>
        }

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  );
}


export default RoutesList;