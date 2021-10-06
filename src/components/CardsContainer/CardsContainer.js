import React from "react";
import "./CardsContainer.css";
import CardList from "../CardList/CardList";
import Preloader from "../Preloader/Preloader";
import Pagination from "../Pagination/Pagination";

export default function CardsContainer({
  isMobile,
  isTablet,
  searchedCards,
  isLoading,
  isNoData,
  isError,
  onCardClick,
  count,
  pages,
  currentPage,
  onPreviousPage,
  onPageClick,
  onNextPage,
}) {
  return (
    <div className='cards-container'>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <div className='cards-container__summary'>
            <p className='summary__item'>{count} results</p>
            <p className='summary__item'>{pages} pages</p>
          </div>
          <Pagination
            currentPage={currentPage}
            pages={pages}
            onPreviousPage={onPreviousPage}
            onPageClick={onPageClick}
            onNextPage={onNextPage}
          />
          <CardList
            searchedCards={searchedCards}
            onCardClick={onCardClick}
            isNoData={isNoData}
            isMobile={isMobile}
            isTablet={isTablet}
            isError={isError}
          />
        </>
      )}
    </div>
  );
}
