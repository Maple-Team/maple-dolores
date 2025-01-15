import { useCallback, useState } from 'react'
import './pagination.css'

interface PaginationProps {
  totalPages: number
  currentPage: number
  pageSize: number
  onPageChange: (page: number, pageSize: number) => void
}
export const Pagination = ({ totalPages, currentPage, onPageChange, pageSize }: PaginationProps) => {
  const [page, setPage] = useState(currentPage)
  console.log('totalPages', totalPages)
  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
      onPageChange(page - 1, pageSize)
    }
  }, [page, onPageChange])

  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1)
      onPageChange(page + 1, pageSize)
    }
  }, [page, totalPages, onPageChange])

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber)
    onPageChange(pageNumber, pageSize)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxButtons = 6

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={i === page ? 'active' : ''}
          >
            {i}
          </button>
        )
      }
    } else {
      const startPage = Math.max(1, page - Math.floor(maxButtons / 2))
      const endPage = Math.min(totalPages, startPage + maxButtons - 1)

      if (startPage > 1) {
        pageNumbers.push(
          <button
            key="first"
            onClick={() => handlePageClick(1)}
          >
            1
          </button>
        )
        if (startPage > 2) {
          pageNumbers.push(<span key="ellipsis1">...</span>)
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={i === page ? 'active' : ''}
          >
            {i}
          </button>
        )
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(<span key="ellipsis2">...</span>)
        }
        pageNumbers.push(
          <button
            key="last"
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </button>
        )
      }
    }

    return pageNumbers
  }

  return (
    <div className="pagination">
      <span className="mr-1">共{totalPages}条</span>
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
      >
        上一页
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNextPage}
        disabled={page === totalPages}
      >
        下一页
      </button>
      <select
        value={pageSize}
        onChange={(e) => onPageChange(page, parseInt(e.target.value))}
        className="page-size-select ml-1"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={200}>200</option>
      </select>
    </div>
  )
}
