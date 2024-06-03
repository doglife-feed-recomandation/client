'use client';

import { sendGAEvent } from '@/lib/ga';
import {
  AllergySource,
  Breed,
  HealthProblem,
  PetInfo,
  Sex,
  personalInfoCollectDescription,
} from '@/types/PetInfo';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  ConfigProvider,
  Flex,
  Form,
  Input,
  InputNumber,
  Popover,
  Radio,
  RadioChangeEvent,
  Select,
  Switch,
  TreeSelect,
} from 'antd';

import { useEffect, useState } from 'react';

import { getUser } from '@/actions/user';
import { useRouter } from 'next/navigation';
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

interface UserInfo {
  email: string;
  petName: string;
}

function UserInfoForm() {
  const router = useRouter();
  const onFinish = async (user: UserInfo) => {
    try {
      const foundUser = await getUser(user.email, user.petName);
      router.push(`/result/${foundUser.petId}`);
    } catch (e) {
      console.error('User not found', e);
      alert('입력하신 정보로 찾을 수 없습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Form name="basic" onFinish={onFinish} autoComplete="off" layout="vertical">
      <Form.Item<UserInfo>
        label="이메일 주소"
        name="email"
        rules={[{ required: true, message: '이메일 주소를 입력해 주세요' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<UserInfo>
        label="강아지 이름"
        name="petName"
        rules={[{ required: true, message: '강아지 이름을 입력해 주세요' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item className="flex justify-center">
        <Button type="primary" htmlType="submit">
          이전 상담 이어하기
        </Button>
      </Form.Item>
    </Form>
  );
}

export default function PetInfoForm({
  onSubmit,
}: {
  onSubmit: (pet: PetInfo) => Promise<void>;
}) {
  const [sex, setSex] = useState<Sex>();
  const [agree, setAgree] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const onFinish = async (pet: PetInfo) => {
    pet.allergy = pet.allergySource?.length !== 0 || false;
    pet.healthProblem = pet.healthProblemSource?.length !== 0 || false;

    sendGAEvent('submit_form', pet);

    await onSubmit(pet);
  };

  return (
    <Flex justify="center" align="start" className="w-full">
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#011B5A',
            borderRadius: 8,
          },
        }}
      >
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
            personalInfoCollectDescription: false,
          }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          className="w-full"
        >
          <div className="relative">
            <img className="w-full" src="/banner.png" alt="banner" />
            <div className="absolute z-10 left-[3%] bottom-[20%]">
              <Popover content={UserInfoForm} trigger="click">
                <Button type="primary" className="bg-primary">
                  반려견 정보를 입력한 적이 있으신가요?
                </Button>
              </Popover>
            </div>
          </div>
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

          <Form.Item<PetInfo> label="이메일 주소를 입력해주세요" name="email">
            <Input type="email" />
          </Form.Item>

          <Form.Item<PetInfo>
            name="personalInfoCollectAgree"
            valuePropName="checked"
          >
            <Checkbox
              value={agree}
              onChange={(e) => setAgree(e.target.checked)}
            >
              <span
                className="hover:underline cursor-pointer text-primary"
                onClick={(e) => {
                  setShowPolicy(!showPolicy);
                  e.stopPropagation();
                }}
              >
                개인정보 수집 및 이용에 동의합니다. (입력하신 개인정보는 상담
                기록 불러오기를 위해서만 사용됩니다)
              </span>
            </Checkbox>

            {showPolicy && (
              <div>
                <span className="mb-2">개인정보 수집 및 이용</span>
                <div className="border p-4 rounded-lg overflow-y-auto h-24">
                  {personalInfoCollectDescription.map((description, index) => (
                    <p key={index}>
                      {description.label}
                      <br />
                      {description.content}
                      {index !== personalInfoCollectDescription.length - 1 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              제출 하기
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </Flex>
  );
}
