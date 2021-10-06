import React from "react";
import "./Card.css";

export default function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className='card' onClick={handleClick}>
      <img
        className='card__image'
        src={card?.image || ""}
        alt={card?.name || ""}
      />
      <div className='card__caption-wrapper'>
        <h3 className='card__title'>{card?.name || ""}</h3>
      </div>
    </div>
  );
}
