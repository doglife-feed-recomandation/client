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
import { useEffect, useState } from 'react';

import { sendGAEvent } from '@next/third-parties/google';
import React from 'react';

type Brith = `${string}-${string}`;

interface PriceInputProps {
  id?: string;
  value?: Brith;
  onChange?: (value: Brith) => void;
}

const BirthInput: React.FC<PriceInputProps> = (props) => {
  const { id, value, onChange } = props;
  const [year, setYear] = useState('2024');
  const [month, setMonth] = useState('6');

  useEffect(() => {
    onChange?.(`${year}-${month}`);
  }, [year, month]);

  const [givenYear, givenMonth] = value
    ? value.split('-')
    : [undefined, undefined];

  return (
    <div id={id} className="flex flex-row gap-4">
      <Select
        value={givenYear || month}
        onChange={(v) => setYear(v)}
        options={Array.from({ length: 25 }, (_, i) => ({
          value: (2024 - i).toString(),
          label: (2024 - i).toString(),
        }))}
        size="small"
        style={{ width: 'fit-content', minWidth: 80 }}
      />
      <Select
        value={givenMonth || month}
        onChange={(v) => setMonth(v)}
        options={Array.from({ length: 12 }, (_, i) => ({
          value: (i + 1).toString(),
          label: (i + 1).toString(),
        }))}
        size="small"
        style={{ width: 'fit-content', minWidth: 80 }}
      />
    </div>
  );
};

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

    sendGAEvent('event', 'submit_form', pet);

    await onSubmit(pet);
  };

  return (
    <Flex justify="center" align="start" className="w-full">
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
          healthProblem: false,
          healthProblemSource: [],
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        className="w-full"
      >
        <img className="w-full" src="/banner.png" alt="logo" />
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
          <BirthInput />
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
            className="w-full"
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
