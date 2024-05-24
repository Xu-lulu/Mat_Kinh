import axios from "axios";

import { Toaster, toast } from "sonner";
import {
  updateProductAdminFailed,
  updateProductAdminStart,
  updateProductAdminSuccess,
  productsAdminFailed,
  productsAdminStart,
  productsAdminSuccess,
} from "../productAdmin";
import { dataProducts } from "./apiProduct";
const axiosJWT = axios.create();

export const dataProductsAdmin = async (dispatch, token) => {
  dispatch(productsAdminStart());
  try {
    const res = await axiosJWT.get("http://localhost:3000/productsadmin", {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    dispatch(productsAdminSuccess(res.data));
  } catch (error) {
    dispatch(productsAdminFailed());
    toast.error(error.response.data.mes);
  }
};
export const createProduct = async (dispatch, navigate, token, data) => {
  dispatch(productsAdminStart());
  try {
    const res = await axiosJWT.post(
      "http://localhost:3000/uploadProducts",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(productsAdminSuccess());
    dataProductsAdmin(dispatch, token);
    toast.success("Thêm thành công");
    navigate("/productadmin");
  } catch (error) {
    dispatch(productsAdminFailed());
    toast.error(error.response.data.mes);
  }
};
export const deleteProduct = async (dispatch, id, navigate, token) => {
  dispatch(productsAdminStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:3000/delete/${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    dispatch(productsAdminSuccess());
    await dataProducts(dispatch);
    navigate("/productadmin");
    toast.success("Xóa thành công");
  } catch (error) {
    dispatch(productsAdminFailed());
    toast.error(error.response.data.mes);
  }
};
export const UpdateProduct = async (dispatch, id, token, data, navigate) => {
  dispatch(updateProductAdminStart());
  try {
    const res = await axiosJWT.put(`http://localhost:3000/update/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `Bearer ${token}`,
      },
    });
    dispatch(updateProductAdminSuccess());
    toast.success("Sửa thành công");
    navigate("/productadmin");
  } catch (error) {
    dispatch(updateProductAdminFailed());
    toast.error(error.response.data.mes);
  }
};
// export const dataCategorys = async (dispatch) => {
//   dispatch(categoryStart());
//   try {
//     const res = await axiosJWT.get("http://localhost:3000/allCategory");
//     dispatch(categorySuccess(res.data));
//   } catch (error) {
//     dispatch(categoryFailed());
//   }
// };
// export const findCategorys = async (dispatch, id) => {
//   dispatch(findcategoryStart());
//   try {
//     const res = await axiosJWT.post(
//       "http://localhost:3000/products/category/" + `${id}`
//     );
//     dispatch(findcategorySuccess(res.data));
//   } catch (error) {
//     dispatch(findcategoryFailed());
//   }
// };
