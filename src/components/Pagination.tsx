import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers: (number | string)[] = [];

  // Calculate page numbers to display
  for (let i = 1; i <= totalPages; i++) {
    if (totalPages > 10 && i > 7 && i < totalPages) {
      if (i === 8) pageNumbers.push('...');
      continue;
    }
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
        Previous
      </button>

      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => typeof number === 'number' && onPageChange(number)}
          disabled={typeof number === 'string' || currentPage === number}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}

      <button onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
