import { useContext, useState } from "react";
import HealthMrmContext from "./context/healthmrmContext";
import "./SignUp.css"; // Import the CSS file for SignUp styling

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [abha, setAbha] = useState("");
  const { addUser } = useContext(HealthMrmContext);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false); // Track whether to show the form

  async function sendData(e) {
    e.preventDefault();
    setMessage("Please wait for a moment...");
    const res = await addUser(abha, role, password, name);
    console.log(res);
    if (res) {
      setMessage("Signup successful");
    }
  }

  const handleSignUpClick = () => {
    // Show the form when the "Sign Up" button is clicked
    setShowForm(true);
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {showForm && ( // Only show the form when showForm is true
        <>
          {message && <div className="message">{message}</div>}
          <form onSubmit={sendData}>
            <div className="form-group">
              <label htmlFor="abha">Abha</label>
              <input
                type="text"
                id="abha"
                placeholder="Enter your Abha"
                onChange={(e) => setAbha(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                placeholder="Enter your Role"
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </>
      )}
      {!showForm && ( // Show the "Sign Up" button when showForm is false
        <button className="btn" onClick={handleSignUpClick}>
          Sign Up
        </button>
      )}
    </div>
  );
};

export default SignUp;
