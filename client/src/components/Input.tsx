import React, { Component, useState } from 'react';
import styled from 'styled-components'
import { themeColor } from '../config/const'
import { useAdd, useContract } from './hook';

const InputBox = styled.div`
  width: '100%';
`

const Label = styled.span`
  color: white;
  height: 1.5rem;
  background: red;
`

export const Input = () => {
  const [value, setValue] = useState<string>()
  const { accounts, contract } = useContract()
  const add = useAdd({ accounts, contract });

  return (
    <InputBox>
      <input
        placeholder="请输入待办事项"
        style={{
          color: themeColor,
          padding: 0,
          height: "1.5rem",
          width: '80%',
          paddingLeft: ".3rem"
        }}
        value={value}
        maxLength={100}
        onChange={val => { setValue(val.target.value) }}
      />
      <Label onClick={() => {
        if (value) {
          add(value)
        }
      }}>
        添加
      </Label>
    </InputBox>
  )
}