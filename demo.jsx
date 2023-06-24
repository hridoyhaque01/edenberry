<Form
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
  layout="horizontal"
  disabled={componentDisabled}
  style={{ maxWidth: 600 }}
>
  <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
    <Checkbox>Checkbox</Checkbox>
  </Form.Item>
  <Form.Item label="Radio">
    <Radio.Group>
      <Radio value="apple"> Apple </Radio>
      <Radio value="pear"> Pear </Radio>
    </Radio.Group>
  </Form.Item>
  <Form.Item label="Input">
    <Input />
  </Form.Item>
  <Form.Item label="Select">
    <Select>
      <Select.Option value="demo">Demo</Select.Option>
    </Select>
  </Form.Item>
  <Form.Item label="TreeSelect">
    <TreeSelect
      treeData={[
        {
          title: "Light",
          value: "light",
          children: [{ title: "Bamboo", value: "bamboo" }],
        },
      ]}
    />
  </Form.Item>
  <Form.Item label="Cascader">
    <Cascader
      options={[
        {
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou",
            },
          ],
        },
      ]}
    />
  </Form.Item>
  <Form.Item label="DatePicker">
    <DatePicker />
  </Form.Item>
  <Form.Item label="RangePicker">
    <RangePicker />
  </Form.Item>
  <Form.Item label="InputNumber">
    <InputNumber />
  </Form.Item>
  <Form.Item label="TextArea">
    <TextArea rows={4} />
  </Form.Item>
  <Form.Item label="Switch" valuePropName="checked">
    <Switch />
  </Form.Item>
  <Form.Item
    label="Upload"
    valuePropName="fileList"
    getValueFromEvent={normFile}
  >
    <Upload action="/upload.do" listType="picture-card">
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </Upload>
  </Form.Item>
  <Form.Item label="Button">
    <Button>Button</Button>
  </Form.Item>
</Form>;

import { Button, Checkbox, Form, Input } from "antd";
import React from "react";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const App: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default App;
