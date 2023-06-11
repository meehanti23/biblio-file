import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in" className="button sign-in-button">
      <Link to="/user-sessions/new" className="sign-in">Sign In</Link>
    </li>,
    <li key="sign-up" className="button sign-in-button">
      <Link to="/users/new" className="sign-in">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out" className="button sign-in-button">
      <SignOutButton />
    </li>,
  ];

  const authenticatedBookList = [
    <li key="books" className="menu-text book-shelf menu">
      <Link to="/bookshelf">{user?.username}'s Book Shelf</Link>
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="navbar-list">
          <li className="navbar-image">
            <Link to="/"><img src='https://personal-library-bucket.s3.amazonaws.com/bookcase-shelf-book-discussion-club-library-shelf-58a65dea5748faadc143a6f7a080bde7.png' alt='top-bar-image' className="top-bar-books"/></Link>
          </li>
          <li className="menu-text menu-name home">
            <Link to="/">BiblioFile</Link>
          </li>
          <li className="menu-text home">
            <Link to="/books">All Books</Link>
          </li>
          <li className="menu-text home">
            <Link to="/trending">Trending Books</Link>
          </li>
          <li className="menu-text home">
            <Link to="/trivia">Book Trivia</Link>
          </li>
          <li className="menu-text home">
            <Link to="/googleMaps">Book Stores</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="navbar-list">
          <li className="menu-text bookshelf-navbar">
            <ul className="menu">{user ? authenticatedBookList : null}</ul>
          </li>
          {user ? authenticatedListItems : unauthenticatedListItems}
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
