import React from 'react'
import { Tabs } from 'antd'
import './TabsButton.css'
export default class TabsButton extends React.Component {
  render() {
    const { onChangeTabs } = this.props

    const items = [
      { label: 'Search', key: 'Search', destroyInactiveTabPane: 'false', title: 'Search' },
      { label: 'Rated', key: 'Rated', destroyInactiveTabPane: 'false', title: 'Rated' },
    ]
    return <Tabs items={items} onChange={onChangeTabs} />
  }
}
