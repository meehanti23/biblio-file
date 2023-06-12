import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import Homepage from "./Homepage";
import PersonalBookList from "./PersonalBookList";
import AllBooks from "./AllBooks";
import BookShowPage from "./BookShowPage";
import GoodreadsTrending from "./GoodreadsTrending";
import ReviewEditForm from "./ReviewEditForm";
import SecretPage from "./layout/SecretPage"
import BookTrivia from "./BookTrivia";
import AboutDeveloper from "./AboutDeveloper";
import GoogleMaps from "./reactGoogleMaps/GoogleMaps";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/books/:id" 
          render={(props) => <BookShowPage {...props} user={currentUser} />}
        />
        <Route exact path="/books/:bookId/reviews/:reviewId/edit"
          render={(props) => <ReviewEditForm {...props} user={currentUser} />}
        />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/bookshelf" component={PersonalBookList} />
        <Route exact path="/googleMaps" component={GoogleMaps} />
        <Route exact path="/truth" component={SecretPage} />
        <Route exact path="/books" component={AllBooks} />
        <Route exact path="/trending" component={GoodreadsTrending} />
        <Route exact path="/trivia" component={BookTrivia} />
        <Route exact path="/about" component={AboutDeveloper} />
      </Switch>
    </Router>
  );
};

export default hot(App);
