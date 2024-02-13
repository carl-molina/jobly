import userContext from "./userContext";
import { useState, useContext } from "react";
import "./ProfileForm.css";
import Alert from "./Alert";

/** SignUpForm: Registers user.
 *
 *  Props:
 *  - handleSignUp(): function to call in parent
 *
 *  State:
 *  - formData
 *  - errs: errors if problems updating profile.
 *
 *  RoutesList -> SignUpForm -> Alert
 */

// TODO: original fn header:
// function ProfileForm({ updateUserProfile }) {
function ProfileForm() {
  const [errs, setErrs] = useState([]);
  const { user } = useContext(userContext);

  const initialFormData = {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };

  const [formData, setFormData] = useState(initialFormData);

  const { username, firstName, lastName, email } = formData;

  /** Updates form values with user input */
  function handleChange(evt) {
    const field = evt.target;
    setFormData(fData => ({
      ...fData,
      [field.name]: field.value
    }));
  }

  /** Calls parent function */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      // await updateUserProfile(formData);
    } catch (err) {
      console.log(err);
      setErrs(err);
    }
  }

  return (
    <div className="ProfileForm-wrapper">
      <form className="ProfileForm" onSubmit={handleSubmit}>

        <div className="ProfileForm-username">
          <label htmlFor="ProfileForm-input-username">Username: </label>
          <input
            id="ProfileForm-input-username"
            name="username"
            value={username}
            aria-label="Username"
            disabled
          />
        </div>
        <div className="ProfileForm-firstName">
          <label htmlFor="ProfileForm-input-firstName">First Name: </label>
          <input
            id="ProfileForm-input-firstName"
            name="firstName"
            onChange={handleChange}
            value={firstName}
            aria-label="firstName"
          />
        </div>
        <div className="ProfileForm-lastName">
          <label htmlFor="ProfileForm-input-lastName">Last Name: </label>
          <input
            id="ProfileForm-input-lastName"
            name="lastName"
            onChange={handleChange}
            value={lastName}
            aria-label="lastName"
          />
        </div>
        <div className="ProfileForm-email">
          <label htmlFor="ProfileForm-input-email">Email: </label>
          <input
            id="ProfileForm-input-email"
            name="email"
            onChange={handleChange}
            value={email}
            aria-label="Email"
          />
        </div>

        <button className="ProfileForm-save-btn">Save Changes</button>

      </form>

      {errs.map((err, i) => <Alert key={i} message={err}/>)}

    </div>

  );
}


export default ProfileForm;