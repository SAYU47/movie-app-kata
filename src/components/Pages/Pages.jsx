import React from 'react'
import { Pagination } from 'antd'

import '../Pages/Pages.css'
export default class Pages extends React.Component {
  render() {
    const { togglePage, currentPage, totalPages } = this.props
    return <Pagination onChange={(page) => togglePage(page)} current={currentPage} total={totalPages * 10} />
  }
}
