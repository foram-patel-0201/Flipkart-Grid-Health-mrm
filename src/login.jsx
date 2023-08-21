import { useContext, useState } from "react";
import HealthMrmContext from "./context/healthmrmContext";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from React Router
import "./Login.css"; // Import the CSS file for Login styling

const Login = () => {
  const [password, setPassword] = useState("");
  const [abha, setAbha] = useState("");
  const { verifyPassword, setAbhaID } = useContext(HealthMrmContext);
  const [message, setMessage] = useState("");
  const [showFields, setShowFields] = useState(false); // Track whether to show the login fields
  const navigate = useNavigate(); // Get the navigate function from the hook
  async function sendData(e) {
    e.preventDefault();
    setMessage("Please wait for a moment...");
    const res = await verifyPassword(abha, password);
    console.log(res.name);
    if (res.name !== "") {
      setAbhaID(abha);
      setMessage("Login successful");
      navigate("/Home"); // Navigate to the userHomePage page
    } else {
      setMessage("Credentials incorrect , Login failed");
    }
  }

  const handleLoginClick = () => {
    setShowFields(true);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {showFields && ( // Only show the login fields when showFields is true
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
      {!showFields && ( // Show the "Login" button when showFields is false
        <button className="btn" onClick={handleLoginClick}>
          Login
        </button>
      )}
    </div>
  );
};

export default Login;
