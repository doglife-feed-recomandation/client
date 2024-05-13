'use client';

import {
  AllergySource,
  Breed,
  HealthProblem,
  PetInfo,
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
  TreeSelect,
} from 'antd';

import { Dayjs } from 'dayjs';
import { useState } from 'react';

export default function PetInfoForm({
  onSubmit,
}: {
  onSubmit: (pet: PetInfo) => Promise<void>;
}) {
  const [sex, setSex] = useState<Sex>();

  const onFinish = async (
    pet: PetInfo & {
      birth: Dayjs;
    },
  ) => {
    pet.allergy = pet.allergySource?.length !== 0 || false;
    pet.healthProblem = pet.healthProblemSource?.length !== 0 || false;
    const payload: PetInfo = {
      ...pet,
      birth: pet.birth.format('YYYY-MM'),
    };

    console.log(payload);
    await onSubmit(payload);
  };

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
        <img
          className="max-w-[600px] max-w-[100%]"
          src="/banner.png"
          alt="logo"
        />
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
          <InputNumber min={0} addonAfter="Kg" />
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
              <Radio.Button value={value} key={key}>
                {key}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        {sex === Sex.암컷 && (
          <Form.Item<PetInfo>
            label="반려견이 생리중인가요?"
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
            label="반려견이 임신중인가요?"
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
          label="반려견이 알러지가 있다면 알러지 원인을 선택해주세요"
          name="allergySource"
        >
          <TreeSelect
            showSearch
            placeholder="없음"
            treeCheckable={true}
            allowClear
            treeData={Object.entries(AllergySource).map(([key, value]) => ({
              value: key,
              title: key,
              children: value.map((v) => ({ value: v, title: v })),
            }))}
            treeLine={true}
          />
        </Form.Item>

        <Form.Item<PetInfo>
          label="반려견이 건강 문제가 있다면 선택해주세요"
          name="healthProblemSource"
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="없음"
            options={Object.entries(HealthProblem).map(([label, value]) => ({
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
