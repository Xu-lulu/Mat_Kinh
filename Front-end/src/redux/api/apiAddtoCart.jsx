import axios from "axios";

import { Toaster, toast } from "sonner";
import {
  categoryAdminStart,
  categoryAdminSuccess,
  categoryAdminFailed,
} from "../productAdmin";
import { dataCategorys } from "./apiProduct";
import {
  CartFailed,
  CartStart,
  CartSuccess,
  upmountCartFailed,
  upmountCartStart,
  upmountCartSuccess,
} from "../Cart";
export const dataCart = async (dispatch, token) => {
  dispatch(CartStart());
  try {
    const res = await axios.get(`http://localhost:3000/auth/allCartOneUser`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    dispatch(CartSuccess(res.data));
  } catch (error) {
    dispatch(CartFailed());
    toast.error(error.response.data.mes);
  }
};

export const addtoCart = async (dispatch, id, token, data) => {
  dispatch(CartStart());
  try {
    const res = await axios.post(
      `http://localhost:3000/addtoCart/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(CartSuccess(res.data.cart));
    dataCart(dispatch, token);
    toast.success("Thêm vào giỏ hàng thành công");
  } catch (error) {
    dispatch(CartFailed());
    toast.error(error.response.data.mes);
  }
};
export const upmountCart = async (dispatch, id, token, data) => {
  dispatch(upmountCartStart());
  try {
    const res = await axios.put(
      `http://localhost:3000/upmountCart/${id}`,
      data,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(upmountCartSuccess(res.data.cart));
    dataCart(dispatch, token);
  } catch (error) {
    dispatch(upmountCartFailed());
    console.log(error);
  }
};
export const deleteOneCartItem = async (dispatch, id, token) => {
  dispatch(upmountCartStart());
  try {
    const res = await axios.delete(
      `http://localhost:3000/deleteOneItem/${id}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(upmountCartSuccess(res.data));
    dataCart(dispatch, token);
    toast.success("xóa thành công");
  } catch (error) {
    dispatch(upmountCartFailed());
    toast.error(error.response.data.mes);
  }
};