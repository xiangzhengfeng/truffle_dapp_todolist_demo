import * as React from 'react'
import { SwipeAction, List, Modal } from 'antd-mobile';
import styled from 'styled-components'
import { listItemProps } from './List'
import { themeColor } from '../config/const'
const alert = Modal.alert;

interface ItemProps {
  item: listItemProps
  index: number
  handleClick: (key: string) => void
}

const Text = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
`

const TextNoDo = styled(Text)`
  color: ${ themeColor};
`

const TextDone = styled(Text)`
  color: 'gray';
`

export default function Item(props: ItemProps) {
  const { item, index, handleClick } = props

  return (
    <SwipeAction
      style={{ backgroundColor: 'gray' }}
      className="animated fadeInDown"
      autoClose
      right={[
        {
          text: item.isDone ? '删除' : '完成',
          onPress: () => {
            alert('提示', '确定进行此操作？', [
              { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
              { text: '确定', onPress: () => handleClick(item.key) },
            ]);
          },
          style: { backgroundColor: item.isDone ? 'red' : 'green', color: 'white' },
        },
      ]}
    >
      <List.Item
        style={{ borderBottomWidth: '1px', borderBottomColor: '#f1efe0', borderBottomStyle: 'solid', color: 'red' }}
        onClick={() => Modal.alert('事项', item.value)}
      >
        {item.isDone ? <TextDone>{index + 1 + '. ' + item.value}</TextDone> : <TextNoDo>{index + 1 + '. ' + item.value}</TextNoDo>}
      </List.Item>
    </SwipeAction>
  )
}