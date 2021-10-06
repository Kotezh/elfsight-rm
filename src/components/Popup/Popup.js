import React, { useEffect, useState } from "react";
import "./Popup.css";

export default function Popup({ card, onClose }) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");

  const openedClass = card ? "popup_opened" : "";

  useEffect(() => {
    if (card) {
      setImage(card.image);
      setName(card.name);
      setSpecies(card.species);
      setType(card.type);
      setStatus(card.status);
      setGender(card.gender);
    }
  }, [card]);

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <section
      className={`popup popup_type_character ${openedClass}`}
      onClick={handleOverlayClick}
    >
      <div className='popup__character-wrapper'>
        <figure className='popup__figure'>
          <img className='popup__image' src={image} alt={name} />
          <figcaption className='popup__caption'>
            <h3 className='popup__title'>{name ? name : "None"}</h3>
            <p className='popup__text'>species: {species ? species : "None"}</p>
            <p className='popup__text'>type: {type ? type : "None"}</p>
            <p className='popup__text'>status: {status ? status : "None"}</p>
            <p className='popup__text'>gender: {gender ? gender : "None"}</p>
          </figcaption>
        </figure>
        <button
          type='reset'
          aria-label='Close'
          className='popup__close popup__close_type_full-image'
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}
