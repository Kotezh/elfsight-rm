import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CardsContainer from "../CardsContainer/CardsContainer";
import SearchForm from "../SearchForm/SearchForm";
import NotFound from "../NotFound/NotFound";
import Popup from "../Popup/Popup";
import api from "../../utils/api";
import { useMediaQuery } from "react-responsive";
import { ESC_KEYCODE } from "../../utils/constants";

export default function App() {
  const [cards, setCards] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchSpecies, setSearchSpecies] = useState("");
  const [searchType, setSearchType] = useState("");
  const [count, setCount] = useState("");
  const [pages, setPages] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredValueByStatus, setFilteredValueByStatus] = useState("all");
  const [filteredValueByGender, setFilteredValueByGender] = useState("all");
  const [isNoData, setIsNoData] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useMediaQuery({ maxWidth: 630 });
  const isTablet = useMediaQuery({ maxWidth: 930 });

  useEffect(() => {
    if (
      !!searchName ||
      !!searchSpecies ||
      !!searchType ||
      filteredValueByStatus ||
      filteredValueByGender
    ) {
      setIsLoading(true);
      const urlName =
        searchName !== "" ? `&name=${searchName.toLowerCase()}` : "";
      const urlSpecies =
        searchSpecies !== "" ? `&species=${searchSpecies.toLowerCase()}` : "";
      const urlType =
        searchType !== "" ? `&type=${searchType.toLowerCase()}` : "";
      const urlStatus =
        filteredValueByStatus && filteredValueByStatus !== "all"
          ? `&status=${filteredValueByStatus}`
          : "";
      const urlGender =
        filteredValueByGender && filteredValueByGender !== "all"
          ? `&gender=${filteredValueByGender}`
          : "";
      const filtersString = `${urlName}${urlStatus}${urlSpecies}${urlType}${urlGender}`;
      api
        .getAllCharacters(currentPage, filtersString)
        .then((filteredCards) => {
          if (filteredCards?.error !== "There is nothing here") {
            setCards(filteredCards.results);
            setCount(filteredCards.info.count);
            setPages(filteredCards.info.pages);
          } else {
            setCount(0);
            setPages(0);
            setIsNoData(true);
          }
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [
    searchName,
    searchSpecies,
    searchType,
    filteredValueByStatus,
    filteredValueByGender,
    currentPage,
  ]);

  useEffect(() => {
    if (!isError) {
      if (
        !cards.length &&
        (searchName ||
          searchSpecies ||
          searchType ||
          filteredValueByStatus ||
          filteredValueByGender)
      ) {
        setIsNoData(true);
      } else {
        setIsNoData(false);
      }
    }
  }, [
    cards,
    searchName,
    searchSpecies,
    searchType,
    filteredValueByStatus,
    filteredValueByGender,
    isError,
  ]);

  function handleSearchClick(
    searchName,
    searchSpecies,
    searchType,
    filteredValueByStatus,
    filteredValueByGender
  ) {
    setIsError(false);
    setSearchName(searchName);
    setSearchSpecies(searchSpecies);
    setSearchType(searchType);
    setFilteredValueByStatus(filteredValueByStatus);
    setFilteredValueByGender(filteredValueByGender);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    document.addEventListener("keydown", handleEscClose);
  }

  function closeAllPopups() {
    setSelectedCard(null);
    document.removeEventListener("keydown", handleEscClose);
  }

  function handleEscClose(evt) {
    const key = evt.keyCode;
    if (key === ESC_KEYCODE) {
      closeAllPopups();
    }
  }

  function goToPreviousPage(evt) {
    evt.preventDefault();
    currentPage - 1 > 1 && setCurrentPage(currentPage - 1);
  }

  function goToNextPage(evt) {
    evt.preventDefault();
    currentPage + 1 <= pages && setCurrentPage(currentPage + 1);
  }

  function handlePageClick(evt, number) {
    evt.preventDefault();
    number !== currentPage && setCurrentPage(number);
  }

  return (
    <div className='app'>
      <Header />
      <SearchForm onSearchSubmit={handleSearchClick} />
      <Switch>
        <Route exact path='/'>
          <CardsContainer
            searchedCards={cards}
            onCardClick={handleCardClick}
            isMobile={isMobile}
            isTablet={isTablet}
            isLoading={isLoading}
            isNoData={isNoData}
            isError={isError}
            pages={pages}
            count={count}
            currentPage={currentPage}
            onPreviousPage={goToPreviousPage}
            onPageClick={handlePageClick}
            onNextPage={goToNextPage}
          />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
      <Popup onClose={closeAllPopups} card={selectedCard} />
    </div>
  );
}
