"use client";

import { PetInfo } from "@/types/PetInfo";
import { Button, Form, Input } from "antd";

export default function PetInfoForm({
  onSubmit,
}: {
  onSubmit: (pet: PetInfo) => void;
}) {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={(pet) => {
        onSubmit(pet);
        console.log("pet", pet);
      }}
      autoComplete="off"
    >
      <Form.Item<PetInfo>
        label="이름"
        name="name"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          제출 하기
        </Button>
      </Form.Item>
    </Form>
  );
}
