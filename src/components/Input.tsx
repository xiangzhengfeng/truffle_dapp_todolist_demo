import React, { useState } from 'react';
import styled from 'styled-components'
import { themeColor } from '../config/const'
import { useAdd, useContract } from './hook';

const InputBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;
  background: white;
`

const Button = styled.span`
  color: ${ themeColor};
  font-size: 24px;
  padding-right: .8rem;
`

export const Input = () => {
  const [value, setValue] = useState<string>("")
  const { accounts, contract } = useContract()
  const add = useAdd({ accounts, contract });

  return (
    <InputBox>
      <input
        placeholder="请输入待办事项"
        style={{
          color: themeColor,
          padding: 0,
          outline: 'none',
          border: 0,
          borderRadius: '1rem',
          height: "2rem",
          width: '85%',
          paddingLeft: ".8rem",
        }}
        value={value}
        maxLength={20}
        onChange={val => { setValue(val.target.value) }}
      />
      <Button onClick={() => {
        if (value) {
          add(value).then(() => { setValue("") })
        } else {
          alert("请输入待办事项！")
        }
      }}>
        +
      </Button>
    </InputBox>
  )
}