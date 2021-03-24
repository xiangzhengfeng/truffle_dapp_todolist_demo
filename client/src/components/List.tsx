import React from 'react'
import { themeColor } from '../config/const'
import styled from 'styled-components'
import { Tabs } from 'antd-mobile';
import Item from './Item'

export interface listItemProps {
  value: string,
  isDone: boolean,
  key: string
}

interface ListProps {
  tabList: Array<listItemProps>,
  list: Array<listItemProps>,
  handleClick: (key: string) => void,
  handleTab: (i: number) => void
}

const ListBox = styled.div`
  max-height: '70%';
  margin-top: 20px;
  background-color: ${ themeColor};
`

const TipText = styled.div`
  color: ${ themeColor};
  background-color: white;
  text-align: center;
  padding: 5px;
  font-size: 12px;
`

const TipText2 = styled(TipText)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-color: #f1efe0;
  border-bottom-width: 1px;
`

const tabs = [
  { title: '全部事项', sub: '1' },
  { title: '未完成', sub: '2' },
  { title: '已完成', sub: '3' }
];

export default class Lists extends React.Component<ListProps> {
  render() {
    const { list, handleClick, handleTab, tabList } = this.props
    return (<ListBox>

      {/* 提示栏 */}
      {list.length === 0 ? <TipText className="animated fadeInLeft">暂无待办事项</TipText> : <TipText2 className="animated fadeInRight">向左滑动可进行操作待办事项，点击可查看详情</TipText2>}

      {/* 标签栏 */}
      {list.length !== 0 ? <Tabs tabs={tabs}
        initialPage={0}
        swipeable={false}
        tabBarActiveTextColor={themeColor}
        tabBarUnderlineStyle={{ color: themeColor }}
        onTabClick={(_, i) => { handleTab(i) }}
      >
        <div>{tabList.map((item, index) => <Item item={item} index={index} key={index} handleClick={key=>handleClick(key)}/>)}</div>
        <div>{tabList.map((item, index) => <Item item={item} index={index} key={index} handleClick={key=>handleClick(key)}/>)}</div>
        <div>{tabList.map((item, index) => <Item item={item} index={index} key={index} handleClick={key=>handleClick(key)}/>)}</div>
      </Tabs> : null}

      {tabList.length === 0 && list.length !== 0 && <TipText2 className="animated fadeInDown">{'暂无事项'}</TipText2>}
    </ListBox>
    )
  }
}