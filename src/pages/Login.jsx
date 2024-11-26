

const Login = () => {
  // const { user, login, logout } = useAuth(); // Fixed useAuth context
console.log("user", user);
  return (
    <div className="login-container">
      <h1>Login</h1>
      <button className="login-button" onClick={login}>
        Login
      </button>
    </div>
  );
 
};

export default Login;
