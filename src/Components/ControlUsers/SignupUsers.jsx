import React, { useState, useRef, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import bcrypt from "bcryptjs-react";
import { apiLogin, apiSignup } from "../services/ApiServices";
import "./Login.css";
function SignupUsers(props) {
  const refInput = useRef(null);
  const [dataAllUser, setDataAllUser] = useState();
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [rePasswordSignup, setRePasswordSignup] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const saltRounds = 10;
  // Fecth All User
  const fetchAllUser = async () => {
    const resData = await apiLogin();
    setDataAllUser(resData);
  };

  //Validate Email
  const validateEmail = (value) => {
    const regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = regexEmail.test(value);
    return isValid;
  };
  //Validate Password
  const validatePassword = (value) => {
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let isValid = regexPassword.test(value);
    return isValid;
  };
  //Handle Submit Signup

  const handleLogin = async () => {
    setIsloading(true);
    let isDuplicate = false;
    if (!emailSignup && isDuplicate === false) {
      toast.warning("Vui lòng nhập thông tin");
      return;
    }
    if (!passwordSignup && isDuplicate === false) {
      toast.warning("Bạn chưa nhập mật khẩu");
      return;
    }
    if (!validateEmail(emailSignup) && isDuplicate === false) {
      toast.error("Email không đúng định dạng");
      return;
    }
    dataAllUser.map((dataUser) => {
      if (emailSignup === dataUser.email) {
        isDuplicate = true;
        toast.error("Tài khoản đã tồn tại");
      }
    });
    if (!validatePassword(passwordSignup) && isDuplicate === false) {
      toast.error("Mật khẩu không đúng định dạng");
      return;
    }
    if (!rePasswordSignup && isDuplicate === false) {
      toast.warning("Vui lòng nhập lại mật khẩu");
      return;
    }
    if (passwordSignup != rePasswordSignup && isDuplicate === false) {
      toast.error("Mật khẩu không trùng khớp");
      return;
    }
    if (isDuplicate === false) {
      const hashedPassword = await bcrypt.hash(passwordSignup, saltRounds);
      const resSingup = await apiSignup(emailSignup, hashedPassword);
      if (resSingup) {
        toast.success("Đăng nhập thành công");
        setDataAllUser([...dataAllUser, resSingup.data]);
        setEmailSignup("");
        setPasswordSignup("");
        setRePasswordSignup("");
        refInput.current.focus();
        return;
      }
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
    fetchAllUser();
  }, []);
  return (
    <div>
      <>
        <div className="form-login">
          <h2>ĐĂNG KÝ</h2>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            ref={refInput}
            placeholder="Nhập Email...."
            onKeyUp={handleKeyPress}
            value={emailSignup}
            onChange={(e) => setEmailSignup(e.target.value)}
          />
          <br />
          <div className="input-password">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type={isShowPass ? "text" : "password"}
              placeholder="Nhập mật khẩu..."
              onKeyUp={handleKeyPress}
              value={passwordSignup}
              onChange={(e) => setPasswordSignup(e.target.value)}
            />
            {isShowPass ? (
              <AiFillEye onClick={() => setIsShowPass(!isShowPass)} />
            ) : (
              <AiFillEyeInvisible onClick={() => setIsShowPass(!isShowPass)} />
            )}
            <label htmlFor="passwordAgain">Nhập lại mật khẩu</label>
            <input
              id="passwordAgain"
              type={isShowPass ? "text" : "password"}
              placeholder="Nhập lại mật khẩu..."
              onKeyUp={handleKeyPress}
              value={rePasswordSignup}
              onChange={(e) => setRePasswordSignup(e.target.value)}
            />
          </div>

          <button className="btnLogin" onClick={handleLogin}>
            ĐĂNG KÝ
          </button>
          <a href=""> Quay lại đăng nhập</a>
        </div>
      </>
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </div>
  );
}

export default SignupUsers;
