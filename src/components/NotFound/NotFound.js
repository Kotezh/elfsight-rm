import React from "react";
import { useHistory } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const history = useHistory();
  const goBack = () => history.goBack();

  return (
    <div className='not-found-page'>
      <h2 className='not-found-page__title'>404</h2>
      <p className='not-found-page__text'>Страница не найдена</p>
      <span className='not-found-page__link' onClick={goBack}>
        Назад
      </span>
    </div>
  );
}
