// Import necessary components and hooks
//import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useAuth } from "../Data/ContextHandler/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
// Component for user registration
const RegisterPage = () => {
  // State to manage user registration data
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    role: "USER"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: ""
  });
  const navigate = useNavigate();
  // Access the register function from the authentication context
  const { contextData } = useAuth();
  const { register } = contextData;

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validateUsername = (username) => {
    if (!username) {
      return "Username is required";
    }
    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }
    if (username.length > 20) {
      return "Username must not exceed 20 characters";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "Username can only contain letters, numbers, and underscores";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return "Password must contain at least one special character (@$!%*?&)";
    }
    return "";
  };

  // Handle data change for input fields with validation
  const handleDataChange = (e, name) => {
    const value = e.target.value;
    // Update the corresponding field in the data state
    setData({
      ...data,
      [name]: value,
    });
    
    // Validate the field
    let error = "";
    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "username") {
      error = validateUsername(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }
    
    setErrors({
      ...errors,
      [name]: error
    });
    setMessage("");
  };

  // Handle user registration
  const handleRegister = async () => await register(data);
  const registerClicked = async function (e) {
    // Validate all fields before submission
    const emailError = validateEmail(data.email);
    const usernameError = validateUsername(data.username);
    const passwordError = validatePassword(data.password);
    
    setErrors({
      email: emailError,
      username: usernameError,
      password: passwordError
    });
    
    // Check if there are any validation errors
    if (emailError || usernameError || passwordError) {
      setMessage("Please fix the validation errors before submitting");
      return;
    }
    
    if (!Object.values(data).some((val) => !val)) {
      setIsLoading(true);
      const result = await handleRegister();
      setIsLoading(false);
      console.log(result);
      if (result?.message) {
        setMessage(result?.message);
      }
      setData({
        email: "",
        username: "",
        password: "",
        role: "USER"
      });
      setErrors({
        email: "",
        username: "",
        password: ""
      });
    }
  }
  return (
    // Register form UI
    <div className="mainRegisterScreen">
      {/* <h1 className="text-3xl font-bold" style={{color:"white"}}>Ramesh React Application</h1> */}
      <div className="loginComponents">
        {/* <div style={{ height: "50px", width: "50px", color: "#4e4646" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div> */}
        <h1 style={{ color: "#4e4646" }}>Register
        </h1>

        {/* Input fields for firstname,lastname,username, password, and email */}
        {/* <input className="loginInput"
          placeholder="Enter the FirstName..."
          type="input"
          value={data.firstname}
          onChange={(e) => { handleDataChange(e, "firstname") }}
        />
        <input className="loginInput"
          placeholder="Enter the Last Name"
          type="input"
          value={data.lastname}
          onChange={(e) => { handleDataChange(e, "lastname") }}
        /> */}

        <input className="loginInput"
          placeholder="Enter the email..."
          type="email"
          value={data.email}
          onChange={(e) => { handleDataChange(e, "email") }}
        />
        {errors.email && <small style={{ color: "red", marginTop: "-10px", marginBottom: "5px" }}>{errors.email}</small>}
        
        <input className="loginInput"
          placeholder="Enter the username..."
          value={data.username}
          onChange={(e) => { handleDataChange(e, "username") }}
        />
        {errors.username && <small style={{ color: "red", marginTop: "-10px", marginBottom: "5px" }}>{errors.username}</small>}

        <input className="loginInput"
          placeholder="Enter the password..."
          type="password"
          value={data.password}
          onChange={(e) => { handleDataChange(e, "password") }}
        />
        {errors.password && <small style={{ color: "red", marginTop: "-10px", marginBottom: "5px" }}>{errors.password}</small>}
        {/* <select className="loginInput" name="cars" id="role" placeholder="Role" value={data.role}
        onChange={(e) => { handleDataChange(e, "role") }}>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
          
        </select> */}
        {/* Register button */}
        <button className="loginButton"
          disabled={Object.values(data).some((val) => !val)}
          onClick={registerClicked}
        >
          Register
        </button>
        {isLoading && <Loader />}
        {message.length > 0 && <small>{message}</small>}
        {/* Login link */}
        <small style={{ color: "#4e4646" }}>
          Already have an account?{" "}
          <span className="loginLink" onClick={() => { navigate("/login"); }}>
            Login
          </span>

        </small>
      </div>
    </div>
  );
};

export default RegisterPage;
