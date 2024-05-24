import axios from "axios";

import { Toaster, toast } from "sonner";
import {
  categoryAdminStart,
  categoryAdminSuccess,
  categoryAdminFailed,
} from "../productAdmin";
import { dataCategorys } from "./apiProduct";
const axiosJWT = axios.create();

export const createCategory = async (dispatch, navigate, token, data) => {
  dispatch(categoryAdminStart());
  try {
    const res = await axiosJWT.post(
      "http://localhost:3000/updatacategory",
      data,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(categoryAdminSuccess());
    await dataCategorys(dispatch);

    toast.success("Thêm thành công");
    navigate("/categoryadmin");
  } catch (error) {
    dispatch(categoryAdminFailed());
    toast.error(error.response.data.mes);
  }
};
export const deleteCategory = async (dispatch, id, navigate, token) => {
  dispatch(categoryAdminStart());
  try {
    const res = await axiosJWT.delete(
      `http://localhost:3000/deletecategory/${id}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(categoryAdminSuccess());
    await dataCategorys(dispatch);
    navigate("/categoryadmin");

    toast.success("Xóa thành công");
  } catch (error) {
    dispatch(categoryAdminFailed());
    toast.error(error.response.data.mes);
  }
};
export const editCategory = async (dispatch, id, token, data, navigate) => {
  dispatch(categoryAdminStart());
  try {
    const res = await axiosJWT.put(
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
