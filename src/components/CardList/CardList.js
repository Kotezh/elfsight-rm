import React, { useEffect, useState } from "react";
import "./CardList.css";
import Card from "../Card/Card";
import {
  DESKTOP_ROW_AMOUNT,
  DESKTOP_CARDS_AMOUNT,
  TABLET_ROW_AMOUNT,
  MOBILE_ROW_AMOUNT,
  NOT_FOUND_ERROR_TEXT,
  ANY_ERROR_TEXT,
} from "../../utils/constants";

export default function CardList({
  searchedCards,
  isNoData,
  isMobile,
  isTablet,
  isError,
  onCardClick,
}) {
  const [cards, setCards] = useState(searchedCards);
  const cardsAmountRow = rowAmount();
  const [cardsAmount, setCardsAmount] = useState(DESKTOP_CARDS_AMOUNT);

  // resize
  function rowAmount() {
    if (isMobile) {
      return MOBILE_ROW_AMOUNT;
    } else if (isTablet) {
      return TABLET_ROW_AMOUNT;
    } else {
      return DESKTOP_ROW_AMOUNT;
    }
  }
  // ===============================================================

  useEffect(() => {
    const newCards = searchedCards.map((c) => {
      const card = { ...c };
      return card;
    });
    setCards(newCards);
  }, [searchedCards]);

  function handleClickMore() {
    const cardsCount = cardsAmount;
    setCardsAmount(cardsCount + cardsAmountRow);
  }

  return (
    <section className='cards-section'>
      <div className='cards-section__list'>
        {isError ? (
          <span className='cards-section__error'>{ANY_ERROR_TEXT}</span>
        ) : isNoData ? (
          <span className='cards-section__no-data'>{NOT_FOUND_ERROR_TEXT}</span>
        ) : (
          cards
            .filter((card, index) => index < cardsAmount)
            .map((card) => (
              <Card key={card.id} card={card} onCardClick={onCardClick} />
            ))
        )}
      </div>
      {cards?.length > cardsAmount && !isError && (
        <button onClick={handleClickMore} className='cards-section__btn-more'>
          Load more
        </button>
      )}
    </section>
  );
}
