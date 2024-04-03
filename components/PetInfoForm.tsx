"use client";

import { Breed, PetInfo, Sex } from "@/types/PetInfo";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import { Dayjs } from "dayjs";
import { useState } from "react";

export default function PetInfoForm({
  onSubmit,
}: {
  onSubmit: (pet: PetInfo) => void;
}) {
  const [sex, setSex] = useState<Sex>();

  const onFinish = (
    pet: PetInfo & {
      birth: Dayjs;
    }
  ) => {
    const payload: PetInfo = {
      ...pet,
      birth: pet.birth.format("YYYY-MM"),
    };
    console.log(payload);

    onSubmit(payload);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<PetInfo>
        label="강아지 이름"
        name="name"
        rules={[{ required: true, message: "강아지 이름을 선택해 주세요" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<PetInfo>
        label="견종"
        name="breed"
        rules={[{ required: true, message: "견종을 선택해주세요" }]}
      >
        <Select
          showSearch
          options={Object.entries(Breed).map(([label, value]) => ({
            label,
            value,
          }))}
        />
      </Form.Item>

      <Form.Item<PetInfo>
        label="생년월"
        name="birth"
        rules={[{ required: true, message: "생년월을 선택해주세요" }]}
      >
        <DatePicker picker="month" />
      </Form.Item>

      <Form.Item<PetInfo>
        label="성별"
        name="sex"
        rules={[{ required: true, message: "성별을 선택해주세요" }]}
      >
        <Select
          value={sex}
          onChange={setSex}
          options={Object.entries(Sex).map(([label, value]) => ({
            label,
            value,
          }))}
        />
      </Form.Item>

      {sex === Sex.암 && (
        <Form.Item<PetInfo>
          label="생리중"
          name="menstruation"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      )}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          제출 하기
        </Button>
      </Form.Item>
    </Form>
  );
}
