import React from 'react'
import { Tabs } from 'antd'
import '../TabsButton/TabsButton.css'
export default class TabsButton extends React.Component {
  render() {
    const { onChangeTabs } = this.props

    const items = [
      { label: 'Search', key: 'Search', destroyInactiveTabPane: 'false' },
      { label: 'Rated', key: 'Rated', destroyInactiveTabPane: 'false' },
    ]
    return <Tabs items={items} onChange={onChangeTabs} />
  }
}
