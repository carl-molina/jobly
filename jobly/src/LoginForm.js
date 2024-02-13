import { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

// import Alert from "./Alert";

const DEFAULT_FORM_DATA = {
  username: "",
  password: ""
};

/** LoginForm: Logs in user.
 *
 *  Props:
 *  - login: function to call in parent
 *
 *  State:
 *  - formData
 *  - errs: error messages if problems logging in
 *
 *  RoutesList -> LoginForm -> Alert
 */

function LoginForm({ login }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  // const [errs, setErrs] = useState([]);

  const { username, password } = formData;

  /** Updates form values with user input */

  function handleChange(evt) {
    const field = evt.target;
    setFormData(fData => ({
      ...fData,
      [field.name]: field.value
    }));
  }

  const navigate = useNavigate();

  /** Calls parent function.
   *
   *  On success, redirects to homepage.
   *  On failure, updates the state with the error messages.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      // setErrs(err);
    }
  }

  return (
    <div className="LoginForm-wrapper">
      <form className="LoginForm" onSubmit={handleSubmit}>
        <div className="LoginForm-username">
          <label htmlFor="LoginForm-input-username">Username: </label>
          <input
            id="LoginForm-input-username"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={username}
            aria-label="Username"
            required
          />
        </div>
        <div className="LoginForm-password">
          <label htmlFor="LoginForm-input-password">Password: </label>
          <input
            type="password"
            id="LoginForm-input-password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
            aria-label="Password"
            required
          />
        </div>
        <button className="LoginForm-login-btn">SUBMIT</button> {/* test click */}
      </form>

      {/* {errs.map((err, i) => <Alert key={i} message={err} />)} */}

    </div>

  );
}


export default LoginForm;