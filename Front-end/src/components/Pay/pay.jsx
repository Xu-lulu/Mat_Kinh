import TextArea from "antd/es/input/TextArea";
import "./pay.scss";
import { Button, Form, Input, Select, Table } from "antd";
import { datauser, usedataCart } from "../../middleware/dataReux";
import { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
const Pay = () => {
  const [totalPrice, settotalPrice] = useState(0);
  const [totalCount, settotalCount] = useState(0);
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
          style={{ width: 50, borderRadius: 10 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Mount",
      dataIndex: "mount",
      key: "mount",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
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
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <TextArea />
            </Form.Item>
            <PayPalButton
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
            />
            {/* Thêm các trường dữ liệu khác của phần 1 của form ở đây */}
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
                <p>{totalPrice} VNĐ</p>
              </div>
            </div>
            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Pay;
