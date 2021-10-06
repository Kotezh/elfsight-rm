import React from "react";
import "./Pagination.css";

export default function Pagination({
  pages,
  currentPage,
  onPreviousPage,
  onPageClick,
  onNextPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {pages <= 1 ? null : (
        <section className='pagination'>
          <ul className='pagination__list'>
            <li className='pagination__item'>
              <button
                className='pagination__btn pagination__btn_type_go'
                disabled={currentPage === 1 ? "disabled" : null}
                onClick={onPreviousPage}
              >
                Previous Page
              </button>
            </li>

            {pageNumbers.map((number) => (
              <li className='pagination__item' key={number}>
                <button
                  className={`pagination__btn ${
                    currentPage === number ? "pagination__btn_active" : ""
                  }`}
                  onClick={(evt) => onPageClick(evt, number)}
                >
                  {number}
                </button>
              </li>
            ))}

            <li className='pagination__item'>
              <button
                className='pagination__btn pagination__btn_type_go'
                disabled={currentPage === pages ? "disabled" : null}
                onClick={onNextPage}
              >
                Next Page
              </button>
            </li>
          </ul>
        </section>
      )}
    </>
  );
}
