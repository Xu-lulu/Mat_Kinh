import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../authSlice";

import { Toaster, toast } from "sonner";
export const loginUser = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3000/auth/Login", user, {});
    dispatch(loginSuccess(res.data));
    if (res.data.newUsers.role === "user") {
      navigate("/");
    } else {
      navigate("/admin");
    }
    toast.success("Đăng nhập thành công!");
  } catch (error) {
    dispatch(loginFailed());
    toast.error(error.response.data.mes);
  }
};
export const registerUser = async (dispatch, user, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "http://localhost:3000/auth/Register",
      user,
      {}
    );
    dispatch(registerSuccess());
    navigate("/Login");
    toast.success("Đăng ký thành công hãy đăng nhập để sử dụng web!");
  } catch (error) {
    dispatch(registerFailed());
    toast.error(error.response.data.mes);
  }
};
export const logoutUser = async (dispatch, id, navigate, token) => {
  dispatch(logoutStart());
  console.log("Function Logout");
  try {
    const res = await axios.post("http://localhost:3000/auth/Logout", id, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(loginSuccess());
    navigate("/Login");
    toast.success("Đăng xuất thành công!");
    console.log(token)
  } catch (error) {
    console.log(error);
    dispatch(logoutFailed());
    toast.error(error.response.data.mes);
  }
};
