import React, { useState, useEffect } from 'react';
import PersonalBookTile from './PersonalBookTile';
import axios from 'axios';
import translateServerErrors from '../services/translateServerErrors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faChartPie, faChartColumn } from '@fortawesome/free-solid-svg-icons';
import GenrePieChart from './dataVisualization/GenrePieChart';
import PageBarChart from './dataVisualization/PageBarChart';
import handleBookSearch from './staticFunctions/handleBookSearch';
import getBooks from './staticFunctions/getBooks';
import AddBookModal from './reactModals/AddBookModal';

const PersonalBookList = (props) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showGenreChart, setGenreShowChart] = useState(false);
  const [showPageChart, setPageShowChart] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSortingOption, setSelectedSortingOption] = useState('A-Z');

  const handleSearch = async () => {
    let book
    handleBookSearch(searchTerm, books, book, setShowModal, setSearchError)
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  useEffect(() => {
    getBooks(selectedSortingOption).then((fetchBooks) => setBooks(fetchBooks));
  }, [selectedSortingOption]);

  const filteredBooks = books.filter((book) => {
    if (selectedOption === 'All' && selectedCategory === 'All') {
      return true;
    } else if (selectedOption === 'All') {
      return book.categories.includes(selectedCategory);
    } else if (selectedCategory === 'All') {
      return book.bookStatus === selectedOption;
    } else {
      return (
        book.bookStatus === selectedOption && book.categories.includes(selectedCategory)
      );
    }
  });

  const mappedBooks = filteredBooks.map((book) => {
    return (
      <PersonalBookTile
        key={book.id}
        id={book.id}
        title={book.title}
        authors={book.authors}
        categories={book.categories}
        smallImage={book.smallImage}
        pageCount={book.pageCount}
        bookStatus={book.bookStatus}
      />
    );
  });
  
  const handleSearchAndClose = (event) => {
    handleSearch()
    setShowModal(false)
  }

  let genreChart = null;
  
  if (showGenreChart) {
    genreChart = (
      <div className="cell my-pretty-chart-container">
        <GenrePieChart mappedBooks={mappedBooks}/>    
      </div>
    )
  }

  const toggleGenreChart = () => { 
    setGenreShowChart(!showGenreChart)
  }

  let pageChart = null;

  if (showPageChart) {
    pageChart = (
      <div className="cell my-pretty-chart-container">
        <PageBarChart mappedBooks={mappedBooks}/>
      </div>
    )
  }

  const togglePageChart = () => {
    setPageShowChart(!showPageChart)
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const categories = Array.from(new Set(books.flatMap((book) => book.categories)));

  const categoryOptions = categories
    .filter((category) => category !== '')
    .map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
  ));

  const resetFilters = () => {
    setSelectedOption('All');
    setSelectedCategory('All');
    setSelectedSortingOption('A-Z');
  }

  const sortingOptions = [
    { value: 'A-Z', label: 'A-Z' },
    { value: 'Z-A', label: 'Z-A' },
    { value: 'Shortest', label: 'Length(Shortest)' },
    { value: 'Longest', label: 'Length(Longest)' },
    { value: 'Newest', label: 'Newest' },
    { value: 'Oldest', label: 'Oldest' },
  ];  

  const sortingOptionsList = sortingOptions.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  const handleSortingChange = (event) => {
    const option = event.target.value;
    setSelectedSortingOption(option);
    getBooks(option).then((fetchBooks) => setBooks(fetchBooks));
  };

  let modalError = null;
  if (searchError) {
    modalError = 
      <div className="callout alert modal-error">
        <h5 className="error-text">
        {searchError}
        </h5>
      </div>
  }

  return (
    <div className="primary home-box grid-x">
      <h1 className="cell page-title">
        <FontAwesomeIcon className="book-icon" icon={faBookOpen} />
        Book Shelf
        <FontAwesomeIcon className="book-icon" icon={faBookOpen} />
        </h1>
      <div className='genre-button-wrapper'>
        <button className="genre-button" onClick={toggleGenreChart}>
          <FontAwesomeIcon className="pie-icon" icon={faChartPie} />
          Genre Breakdown
          <FontAwesomeIcon className="pie-icon" icon={faChartPie} />
        </button>
      </div>
      {genreChart}
      <div className='genre-button-wrapper'>
        <button className="genre-button" onClick={togglePageChart}>
          <FontAwesomeIcon className="pie-icon" icon={faChartColumn} />
          Page Count Breakdown
          <FontAwesomeIcon className="pie-icon" icon={faChartColumn} />
        </button>
      </div>
      {pageChart}
      <AddBookModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleInputChange={handleInputChange}
        modalError={modalError}
        handleSearchAndClose={handleSearchAndClose}
        searchTerm={searchTerm}
      />
      <div className="add-book-wrapper cell">
        <button className="add-book-button" onClick={() => setShowModal(true)}>
          Add a Book
        </button>
      </div>
      <div className='cell grid-x filter-section'>
        <div className='status-filter small-3'>
        <label htmlFor="dropdown" className='dropdown'>Filter by Status:</label>
          <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
            <option value="All">All</option>
            <option value="Reading Now">Reading Now</option>
            <option value="Have Read">Have Read</option>
            <option value="Going to Read">Going to Read</option>
            <option value="Not Sure Yet">Not Sure Yet</option>
          </select>
        </div>
        <div className='status-filter small-3'>
        <label htmlFor="dropdown" className='dropdown'>Filter by Category:</label>
          <select id="dropdown" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All</option>
            {categoryOptions}
          </select>
        </div>
        <div className='status-filter small-3'>
        <label htmlFor="sortingDropdown" className='dropdown'>Sort by:</label>
          <select
            id="sortingDropdown"
            value={selectedSortingOption}
            onChange={handleSortingChange}
          >
          {sortingOptionsList}
          </select>
        </div>
        <div className='filter-buttton small-2'>
          <button className='filter-button' onClick={resetFilters}>Clear Filters</button>
        </div>
      </div>
      {mappedBooks}
    </div>
  );
};

export default PersonalBookList;