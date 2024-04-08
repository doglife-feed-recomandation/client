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
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Select,
  Switch,
} from 'antd';

import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

export default function PetInfoForm({
  onSubmit,
}: {
  onSubmit: (pet: PetInfo) => void;
}) {
  const [sex, setSex] = useState<Sex>();

  const onFinish = (
    pet: PetInfo & {
      birth: Dayjs;
    },
  ) => {
    pet.allergy = pet.allergySource?.length !== 0 || false;
    pet.protein = pet.proteinSource?.length !== 0 || false;
    const payload: PetInfo = {
      ...pet,
      birth: pet.birth.format('YYYY-MM'),
    };

    console.log(payload);

    onSubmit(payload);
  };

  useEffect(() => {
    console.log(sex);
  }, [sex]);

  return (
    <Flex justify="center" align="start">
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          remember: true,
          menstruation: false,
          pregnancy: false,
          allergy: false,
          allergySource: [],
          protein: false,
          proteinSource: [],
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
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
          <Radio.Group
            buttonStyle="solid"
            onChange={(e: RadioChangeEvent) => {
              setSex(e.target.value as Sex);
            }}
          >
            {Object.entries(Sex).map(([key, value]) => (
              <Radio.Button value={value}>{key}</Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        {sex === Sex.암컷 && (
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

        {sex === Sex.암컷 && (
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
          label="알러지가 있다면 알러지 원인을 선택해주세요"
          name="allergySource"
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="없음"
            options={Object.entries(AllergySource).map(([label, value]) => ({
              label,
              value,
            }))}
          ></Select>
        </Form.Item>

        <Form.Item<PetInfo>
          label="선호하시는 단백질 종류가 있다면 선택해주세요"
          name="proteinSource"
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="없음"
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
    </Flex>
  );
}
