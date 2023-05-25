import React, { useState, useEffect } from "react";
import BookTile from "./BookTile";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faChartColumn } from '@fortawesome/free-solid-svg-icons';
import GenrePieChart from './dataVisualization/GenrePieChart';
import PageBarChart from './dataVisualization/PageBarChart';

const AllBooks = (props) => {
    const [books, setBooks] = useState([]);
    const [showGenreChart, setGenreShowChart] = useState(false);
    const [showPageChart, setPageShowChart] = useState(false);

    const getBooks = async () => {
        try {
        const response = await axios.get('/api/v1/books/library');
        if (response.status === 200) {
            setBooks(response.data.books);
        } else {
            console.error('Error in search:', response.data.error);
        }
        } catch (error) {
            console.error('Error in search:', error);
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    const mappedBooks = books.map((book) => {
        return <BookTile 
            key={book.id} 
            id={book.id} 
            title={book.title} 
            authors={book.authors}
            pageCount={book.pageCount}
            categories={book.categories}
            smallImage={book.smallImage}
            username={book.username}
            />;
    });

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

    return (
        <div className="primary all-books-box grid-x container">
            <h1 className="cell page-title">What is Everyone Reading?</h1>
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
            {mappedBooks}
        </div>
    )
}

export default AllBooks;