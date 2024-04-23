import { Button, Checkbox, Form, Input } from "antd";
const Seller = () => {
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 900,
          width: "100%",
          alignItems: "center",
          margin: "9%",
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 style={{ paddingBottom: "5%" }}>Đăng ký quyền bán hàng</h1>
        <Form.Item
          label="Tên chủ cửa hàng"
          name="username"
          rules={[
            {
              required: true,
              message: "Vui lòng điền đẩy thông tin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tên cửa hàng"
          name="namestore"
          rules={[
            {
              required: true,
              message: "Vui lòng điền đẩy thông tin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ cửa hàng"
          name="addressstore"
          rules={[
            {
              required: true,
              message: "Vui lòng điền đẩy thông tin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại cửa hàng"
          name="phonestore"
          rules={[
            {
              required: true,
              message: "Vui lòng điền đẩy thông tin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phương thức thanh toán"
          name="namestore"
          rules={[
            {
              required: true,
              message: "Vui lòng điền đẩy thông tin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>
            Tôi đồng ý rằng tôi đã trên 18 tuổi và đồng ý với các điều khoản và
            điều kiện của trang web.
          </Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Seller;
