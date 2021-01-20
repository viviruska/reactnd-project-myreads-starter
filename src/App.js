import React from 'react'
import './App.css'
import SearchBooks from './SearchBooks'
import HomePage from './HomePage'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  render() {

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <HomePage books={this.state.books}/>
        )}
        />
        <Route path="/search" render={() => (
          <SearchBooks/>
        )}
        />
      </div>
    )
  }
}

export default BooksApp


// |-- HomePage
// |   |
// |   |-- BookItem
// |   |   |-- Controller
// |   |-- Link to SearchBooks
// |
// |-- SearchBooks
 