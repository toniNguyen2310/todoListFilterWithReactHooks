import React, { useState, useRef, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { apiLogin } from "../services/ApiServices";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs-react";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";
function Login() {
  const refInput = useRef(null);
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  //Validate Email
  const validateEmail = (value) => {
    const regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = regexEmail.test(value);
    return isValid;
  };

  //Validate Password
  // const validatePassword = (value) => {
  //   const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  //   let isValid = regexPassword.test(value);
  //   return isValid;
  // };

  //Handle Submit Login
  const handleLogin = async () => {
    setIsloading(true);
    const dataAllUser = await apiLogin();
    try {
      setIsloading(false);
      if (!emailLogin && !passwordLogin) {
        toast.warning("Vui lòng nhập thông tin");
        return;
      }
      if (!passwordLogin) {
        toast.warning("Vui lòng nhập mật khẩu");
        return;
      }
      if (!validateEmail(emailLogin)) {
        toast.error("Email không đúng định dạng");
        return;
      }
      // if (!validatePassword(passwordLogin)) {
      //   toast.error("mật khẩu không đúng định dạng");
      //   return;
      // }
      let isLoginSuccess = false;
      //Kiểm tra trong danh sách (trường hợp có trùng thông tin đăng nhập)
      dataAllUser.map((dataUser) => {
        if (
          emailLogin === dataUser.email &&
          // passwordLogin === dataUser.password
          bcrypt.compareSync(passwordLogin, dataUser.password)
        ) {
          isLoginSuccess = true;
          setTimeout(() => {
            toast.success("Đăng nhập thành công");
            setEmailLogin("");
            setPasswordLogin("");
          }, 600);
        }
      });
      //Trường hợp không trùng thông tin đăng nhaajp
      if (isLoginSuccess === false) {
        toast.error("Email hoặc mật khẩu không đúng");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      handleLogin();
    }
  };
  useEffect(() => {
    refInput.current.focus();
  }, []);
  return (
    <div>
      <>
        <div className="form-login">
          <h2>ĐĂNG NHẬP</h2>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            ref={refInput}
            placeholder="Nhập Email...."
            onKeyUp={(e) => handleKeyPress(e)}
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
          />
          <br />
          <div className="input-password">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="passwordLogin"
              type={isShowPass ? "text" : "password"}
              placeholder="Nhập password..."
              onKeyUp={(e) => handleKeyPress(e)}
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
            {isShowPass ? (
              <AiFillEye onClick={() => setIsShowPass(!isShowPass)} />
            ) : (
              <AiFillEyeInvisible onClick={() => setIsShowPass(!isShowPass)} />
            )}
          </div>
          <a href="">Quên mật khẩu</a>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <button className="btnLogin" onClick={handleLogin}>
              ĐĂNG NHẬP
            </button>
          )}

          <a href=""> Quay lại trang chủ</a>
        </div>
      </>
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </div>
  );
}

export default Login;
