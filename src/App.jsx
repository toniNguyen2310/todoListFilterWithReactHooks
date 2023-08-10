import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "antd";
import ApiWithReact from "./Components/ApiWithReact/ApiWithReact";
import SignupUsers from "./Components/ControlUsers/SignupUsers";
import Login from "./Components/ControlUsers/Login";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  return (
    <>
      {isLoginSuccess ? (
        <>
          <ApiWithReact />
        </>
      ) : (
        <>
          <>
            <Button
              key="LoginOrSignup"
              type="primary"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Đăng ký thôi nào!!" : "Quay lại đăng nhập"}
            </Button>
          </>
          <br />
          <br />
          <>
            {isLogin ? (
              <Login
                isLoginSuccess={isLoginSuccess}
                setIsLoginSuccess={setIsLoginSuccess}
              />
            ) : (
              <SignupUsers />
            )}
          </>
        </>
      )}
    </>
  );
}
export default App;
