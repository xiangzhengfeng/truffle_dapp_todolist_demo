import React, { Component, useState } from 'react';
import styled from 'styled-components'
import { themeColor } from '../config/const'
import { useAdd, useContract } from './hook';

const InputBox = styled.div`
  width: '100%';
`

const Label = styled.div`
  color: ${'red'};
  border: 1px solid red
`

export const Input = () => {
  const [value, setValue] = useState<string>()
  const { accounts, contract } = useContract()
  const add = useAdd({ accounts, contract });

  return (
    <InputBox>
      <Label>
        事项
      </Label>
      <input
        placeholder="请输入待办事项"
        style={{ color: themeColor, padding: 0 }}
        value={value}
        maxLength={100}
        onChange={val => { setValue(val.target.value) }}
      />
      <Label onClick={() => {
        if (Number(value) > 0) {
          add(Number(value))
        }
      }}>
        添加
      </Label>
    </InputBox>
  )
}