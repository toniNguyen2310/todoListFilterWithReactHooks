import axios from "axios";
const apiLogin = async () => {
  let res = await axios.get(
    "https://64c9473cb2980cec85c21b70.mockapi.io/ApiLogin"
  );
  return res.data;
};
const apiSignup = (emailSignup, passwordSignup) => {
  let newUser = {
    email: emailSignup,
    password: passwordSignup,
    role: "user",
  };
  return axios.post(
    "https://64c9473cb2980cec85c21b70.mockapi.io/ApiLogin",
    newUser
  );
};
export { apiLogin, apiSignup };
