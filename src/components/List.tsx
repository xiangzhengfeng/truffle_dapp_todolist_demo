import React from 'react'
import { themeColor } from '../config/const'
import styled from 'styled-components'
import { useContract, useRemove, useDone } from './hook';

const ListBox = styled.div`
  max-height: '70%';
  margin-top: 20px;
  background-color: white;
  padding: .5rem;
  border-radius: .3rem;
  overflow: scroll;
`

const Content = styled.div`
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: .5rem 0 .2rem 0;
  border-bottom: 1px solid rgba(225, 225, 225, .5);
`

const HandleBox = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-size: 14px;
`

const Item = ({ item, done, remove, i }: { item: any, done: (id: number) => void, remove: (id: number) => void, i: number }) => {
  return (
    <ItemBox>
      <Content style={{ color: item.isDone ? "gray" : themeColor }}>
        {`${i+1}. `+ (item.content || "当前事项已被删除") }
      </Content>
      { item.content && <HandleBox
        style={{ color: item.isDone ? "red"  : themeColor }}
        onClick={() => { !item.isDone ? done(i) : remove(i) }}
      >{!item.isDone ? "完成" : "删除"}</HandleBox> }
    </ItemBox>
  )
}

export const List = () => {
  const { accounts, contract, list } = useContract();
  const done = useDone({ accounts, contract });
  const remove = useRemove({ accounts, contract });

  return (
    <ListBox>
      {
        list.length >= 1 ? list!.map((item: any, i: number) => {
          return <Item key={i} item={item} done={done} remove={remove} i={i} />
        }) : <div style={{ textAlign: "center" }}>暂无事项</div>
      }
    </ListBox>
  )
}