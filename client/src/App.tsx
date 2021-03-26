import React, { Component } from "react";
import styled from 'styled-components'
import { themeColor } from './config/const'
import Title from "./components/Title"
import { Input } from "./components/Input"
import { List } from "./components/List"
import { ContrctProvider, useContract } from "./components/hook";

export interface listItemProps {
  value: string,
  isDone: boolean,
  key: string
}

const TodoList = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${themeColor};
`

const Main = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;
`

const MainBox = () => {
  const { accounts } = useContract()
  if (!accounts) return null

  return (
    <Main>
      <Title text='TO DO LIST' />
      <Input />
      <List />
    </Main>
  )
}

export const App = () => {

  return (
    <ContrctProvider>
      <TodoList>
        <MainBox />
      </TodoList>
    </ContrctProvider>
  )
}

export default App;
