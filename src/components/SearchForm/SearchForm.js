import React, { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearchSubmit }) {
  const [searchValueByName, setSearchValueByName] = useState("");
  const [searchValueBySpecies, setSearchValueBySpecies] = useState("");
  const [searchValueByType, setSearchValueByType] = useState("");
  const [filteredValueByStatus, setFilteredValueByStatus] = useState("all");
  const [filteredValueByGender, setFilteredValueByGender] = useState("all");

  function handleSearchNameChange(evt) {
    setSearchValueByName(evt.target.value);
  }

  function handleSearchSpeciesChange(evt) {
    setSearchValueBySpecies(evt.target.value);
  }

  function handleSearchTypeChange(evt) {
    setSearchValueByType(evt.target.value);
  }

  function handleSearchStatusChange(evt) {
    setFilteredValueByStatus(evt.target.value);
  }

  function handleSearchGenderChange(evt) {
    setFilteredValueByGender(evt.target.value);
  }

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    onSearchSubmit(
      searchValueByName,
      searchValueBySpecies,
      searchValueByType,
      filteredValueByStatus,
      filteredValueByGender
    );
  }

  return (
    <div className='search'>
      <div className='search__wrapper'>
        <form className='search__form' onSubmit={handleSearchSubmit}>
          <fieldset className='search__fieldset search__fieldset_inputs'>
            <label htmlFor='search-name' className='search__input-label'>
              <span className='search__span'>name:</span>
              <input
                id='search-name'
                type='text'
                name='search-name'
                value={searchValueByName}
                onChange={handleSearchNameChange}
                minLength='0'
                maxLength='300'
                className='search__input'
                pattern='^.+$'
                placeholder='name'
              />
            </label>
            <label htmlFor='search-species' className='search__input-label'>
              <span className='search__span'>species:</span>
              <input
                id='search-species'
                type='text'
                name='search-species'
                value={searchValueBySpecies}
                onChange={handleSearchSpeciesChange}
                minLength='0'
                maxLength='300'
                className='search__input'
                pattern='^.+$'
                placeholder='species'
              />
            </label>
            <label htmlFor='search-type' className='search__input-label'>
              <span className='search__span'>type:</span>
              <input
                id='search-type'
                type='text'
                name='search-type'
                value={searchValueByType}
                onChange={handleSearchTypeChange}
                minLength='0'
                maxLength='300'
                className='search__input'
                pattern='^.+$'
                placeholder='type'
              />
            </label>
          </fieldset>
          <fieldset className='search__fieldset search__fieldset_selects'>
            <label className='search__fieldset-label'>
              <span className='search__span'>status:</span>
              <select
                className='search__select'
                value={filteredValueByStatus}
                onChange={handleSearchStatusChange}
              >
                <option value='all'>all</option>
                <option value='alive'>Alive</option>
                <option value='dead'>Dead</option>
                <option value='unknown'>Unknown</option>
              </select>
            </label>
            <label className='search__fieldset-label'>
              <span className='search__span'>gender:</span>
              <select
                className='search__select'
                value={filteredValueByGender}
                onChange={handleSearchGenderChange}
              >
                <option value='all'>all</option>
                <option value='female'>Female</option>
                <option value='male'>Male</option>
                <option value='genderless'>Genderless</option>
                <option value='unknown'>Unknown</option>
              </select>
            </label>
          </fieldset>
          <button className='search__button' type='submit'>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
