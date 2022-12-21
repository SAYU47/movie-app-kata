import React from 'react'
import { Pagination } from 'antd'
import './MoviePagination.css'
export default class MoviePagination extends React.Component {
  render() {
    const { togglePage, currentPage, totalPages } = this.props
    return <Pagination onChange={(page) => togglePage(page)} current={currentPage} total={totalPages * 10} />
  }
}
