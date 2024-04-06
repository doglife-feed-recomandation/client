'use client';

import {
  AllergySource,
  Breed,
  PetInfo,
  ProteinSource,
  Sex,
} from '@/types/PetInfo';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from 'antd';

import { Dayjs } from 'dayjs';
import { useState } from 'react';

export default function PetInfoForm({
  onSubmit,
}: {
  onSubmit: (pet: PetInfo) => void;
}) {
  const [sex, setSex] = useState<Sex>();
  const [allergy, setAllergy] = useState<boolean>();

  const onFinish = (
    pet: PetInfo & {
      birth: Dayjs;
    },
  ) => {
    pet.protein = pet.proteinSource?.length !== 0 || false;
    const payload: PetInfo = {
      ...pet,
      birth: pet.birth.format('YYYY-MM'),
    };

    console.log(payload);

    onSubmit(payload);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        remember: true,
        menstruation: false,
        pregnancy: false,
        allergy: false,
        AllergySource: [],
        protein: false,
        proteinSource: [],
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<PetInfo>
        label="강아지 이름"
        name="name"
        rules={[{ required: true, message: '강아지 이름을 입력해 주세요' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<PetInfo>
        label="견종"
        name="breed"
        rules={[{ required: true, message: '견종을 선택해주세요' }]}
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
        label="몸무게"
        name="weight"
        rules={[
          {
            required: true,
            message: '몸무게를 입력해주세요',
          },
          {
            type: 'integer',
            min: 0,
            message: '0 이상의 숫자를 입력해주세요',
          },
        ]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item<PetInfo>
        label="생년월"
        name="birth"
        rules={[{ required: true, message: '생년월을 선택해주세요' }]}
      >
        <DatePicker picker="month" />
      </Form.Item>

      <Form.Item<PetInfo>
        label="성별"
        name="sex"
        rules={[{ required: true, message: '성별을 선택해주세요' }]}
      >
        <Select
          value={sex}
          onChange={setSex}
          placeholder="성별을 선택해주세요"
          options={Object.entries(Sex).map(([label, value]) => ({
            label,
            value,
          }))}
        />
      </Form.Item>

      {sex === Sex.암 && (
        <Form.Item<PetInfo>
          label="반려동물이 생리중인가요?"
          name="menstruation"
          valuePropName="checked"
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
          />
        </Form.Item>
      )}

      {sex === Sex.암 && (
        <Form.Item<PetInfo>
          label="반려동물이 임신중인가요?"
          name="pregnancy"
          valuePropName="checked"
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
          />
        </Form.Item>
      )}

      <Form.Item<PetInfo>
        label="알러지가 있나요?"
        name="allergy"
        valuePropName="checked"
      >
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={false}
          onChange={setAllergy}
        />
      </Form.Item>

      {allergy === true && (
        <Form.Item<PetInfo>
          label="알러지 원인"
          name="allergySource"
          rules={[{ required: true, message: '알러지 원인을 선택해주세요' }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="알러지 원인을 선택해주세요"
            options={Object.entries(AllergySource).map(([label, value]) => ({
              label,
              value,
            }))}
          ></Select>
        </Form.Item>
      )}

      <Form.Item<PetInfo>
        label="선호하시는 단백질 종류가 있다면 선택해주세요"
        name="proteinSource"
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="선호하는 단백질 종류를 선택해주세요"
          options={Object.entries(ProteinSource).map(([label, value]) => ({
            label,
            value,
          }))}
        ></Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          제출 하기
        </Button>
      </Form.Item>
    </Form>
  );
}
