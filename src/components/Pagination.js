import React from 'react'
const Pagination = ({ currentPage, totalPages, onPageChange}) => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pageNumbers = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }
    return (
    
      <ul className="pagination d-flex justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" onClick={() => onPageChange(currentPage - 1)}>&laquo; Previous</a>
        </li>
        {pageNumbers.map((page, index) => (
          <li key={index} className={`page-item ${page === '...' ? 'disabled' : ''} ${currentPage === page ? 'active' : ''}`}>
            <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next &raquo;</a>
        </li>
      </ul>
    );
  };

export default Pagination