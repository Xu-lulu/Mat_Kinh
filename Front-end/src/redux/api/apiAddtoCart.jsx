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
    dispatch(CartSuccess());
    toast.success("Thêm vào giỏ hàng thành công");
  } catch (error) {
    dispatch(CartFailed());
    toast.error(error.response.data.mes);
  }
};
export const upmountCart = async (dispatch, id, navigate, token) => {
  dispatch(upmountCartStart());
  try {
    const res = await axios.put(
      `http://localhtost:3000/upmountCart/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(upmountCartSuccess());
  } catch (error) {
    dispatch(upmountCartFailed());
    toast.error(error.response.data.mes);
  }
};
export const editCategory = async (dispatch, id, token, data, navigate) => {
  dispatch(categoryAdminStart());
  try {
    const res = await axios.put(
      `http://localhost:3000/editcategory/${id}`,
      data,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(categoryAdminSuccess());
    await dataCategorys(dispatch);
    toast.success("Sửa thành công");
    navigate("/categoryadmin");
  } catch (error) {
    dispatch(categoryAdminFailed());
    toast.error(error.response.data.mes);
  }
};
