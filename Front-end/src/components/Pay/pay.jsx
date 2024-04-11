import TextArea from "antd/es/input/TextArea";
import "./pay.scss";
import { Button, Form, Input, Select, Table } from "antd";
import { datauser, usedataCart } from "../../common/dataReux";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Radio } from "antd";
import { formatMoney } from "../../common/common";
import PayLayout from "./PayLayout";
const Pay = () => {
  const [totalPrice, settotalPrice] = useState(0);
  const [totalCount, settotalCount] = useState(0);
  const [value, setValue] = useState(1);
  const [paypal, setpayPal] = useState(false);
  const [vietQr, setvietQr] = useState(false);

  const [form] = Form.useForm();
  const user = datauser();
  const dataCart = usedataCart();

  useEffect(() => {
    if (user && dataCart) {
      const sumPrice = dataCart.reduce(
        (acc, currentItem) =>
          acc + Number(currentItem.Price) * currentItem.mount,
        0
      );
      const sumCount = dataCart.reduce(
        (acc, currentItem) => acc + Number(currentItem.mount),
        0
      );
      settotalPrice(sumPrice);
      settotalCount(sumCount);
    } else {
      settotalPrice(0);
      settotalCount(0);
    }
  }, [dataCart]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const columns = [
    {
      title: "",
      dataIndex: "Image",
      key: "Image",
      render: (text, item) => (
        <img
          src={`${apiUrl}/${item.Image}`}
          alt=""
          style={{ width: 50, height: 40, borderRadius: 10 }}
        />
      ),
    },
    {
      title: "Tên",
      dataIndex: "Name",
      key: "Name",
      class: "styleTable",
    },
    {
      title: "Số lượng",
      dataIndex: "mount",
      key: "mount",
      class: "styleTable",
    },
    {
      title: "Giá",
      dataIndex: "Price",
      key: "Price",
      render: (text, record) => formatMoney(record.Price) + " VNĐ",
      class: "styleTable",
    },
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("All form values:", values);
      // Thực hiện xử lý dữ liệu ở đây (ví dụ: gửi dữ liệu qua API)
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };
  const onChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === 1) {
      setpayPal(false);
      setvietQr(false);
    }
    if (e.target.value === 2) {
      setpayPal(true);
      setvietQr(false);
    }
    if (e.target.value === 3) {
      setvietQr(true);
      setpayPal(false);
    }
  };
  const handlesubmitPaypal = () => {};
  return (
    <>
      <div className="Pay">
        {/* Phần 1 của form */}
        <div className="Pay__Left">
          <Form
            form={form}
            name="userForm"
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            // style={{ maxWidth: 600 }}
          >
            <h2>Thanh Toán</h2>
            <p>Thông tin người nhận</p>
            <Form.Item
              label="Họ Tên"
              name="fullName"
              rules={[{ required: true, message: "Nhập đầy đủ họ tên!" }]}
            >
              <Input size="large" placeholder="Nhập họ tên" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Nhập đầy đủ số điện thoại!" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              label="Select"
              name="Select"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <div className="Pay__Left__Address">
                <Select
                  className="Pay__Left__Address__select"
                  placeholder="Tỉnh/Thành phố"
                />
                <Select
                  className="Pay__Left__Address__select__Right"
                  placeholder="Quận/Huyện"
                />
              </div>
              <TextArea placeholder="Nhập địa chỉ cụ thể" />
            </Form.Item>
            <Form.Item
              label="Ghi chú"
              name="note"
              rules={[{ required: false }]}
            >
              <TextArea />
            </Form.Item>
            {/* <PayPalButton
              amount="0.01"
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={(details, data) => {
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );

                // OPTIONAL: Call your server to save the transaction
                return fetch("/paypal-transaction-complete", {
                  method: "post",
                  body: JSON.stringify({
                    orderID: data.orderID,
                  }),
                });
              }}
            /> */}
            {/* <PayPalButtons /> */}
            {/* Thêm các trường dữ liệu khác của phần 1 của form ở đây */}
            <Form.Item
              label="Phương thức thanh toán"
              name="paypal"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức thanh toán",
                },
              ]}
            >
              <div>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={1}>Thanh toán tiền mặt</Radio>
                  <Radio value={2}>Thanh toán Paypal</Radio>
                  {/* <FontAwesomeIcon icon={faCcPaypal} /> */}
                  <Radio value={3}>Thanh toán VietQR</Radio>
                  {/* <Radio value={4}>D</Radio> */}
                </Radio.Group>
              </div>
            </Form.Item>
          </Form>
        </div>

        {/* Phần 2 của form */}
        <div className="Pay__Right">
          <h5>Thông tin đơn hàng</h5>
          <Form
            form={form}
            name="productForm"
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
          >
            <Table
              className="Pay__Right__Table"
              dataSource={dataCart.map((item, index) => ({
                ...item,
                key: index,
              }))}
              columns={columns}
              pagination={false}
            />
            <div className="pay">
              <div className="pay1">
                <p>Số sản phẩm: </p>
                <p>{totalCount}</p>
              </div>
              <div className="pay2">
                <p>Tổng tiền: </p>
                <p>{formatMoney(totalPrice)} VNĐ</p>
              </div>
              {/* {paypal ? (
                <div style={{ marginTop: "5%" }}>
                  <PayPalScriptProvider>
                    <PayPalButtons />
                  </PayPalScriptProvider>
                </div>
              ) : (
                <Button
                  className="Pay__Right__submitpay"
                  onClick={handleSubmit}
                >
                  Thanh toán
                </Button>
              )} */}
            </div>
            <div className="Pay__Right__paypal">
              {paypal && !vietQr ? (
                <div style={{ marginTop: "5%" }}>
                  <PayLayout total={totalPrice} />
                </div>
              ) : vietQr ? (
                <>
                  <img
                    className="Pay__Right__paypal__vietqr"
                    src={`https://img.vietqr.io/image/mb-113366668888-compact2.jpg?amount=${totalPrice}&addInfo=dong%20qop%20quy%20vac%20xin&accountName=Quy%20Vac%20Xin%20Covid`}
                  ></img>
                </>
              ) : (
                <Button
                  className="Pay__Right__paypal__submitpay"
                  onClick={handleSubmit}
                >
                  Thanh toán
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Pay;
