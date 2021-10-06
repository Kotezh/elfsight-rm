import React from "react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className='footer'>
      <h2 className='footer__title'>Тестовое задание Котеговой Надежды</h2>
      <div className='footer__wrapper'>
        <p className='footer__copyright'>&copy; {year}</p>
        <a
          className='footer__link'
          href='https://github.com/Kotezh'
          target='_blank'
          rel='noreferrer noopener'
        >
          Github
        </a>
      </div>
    </div>
  );
}
