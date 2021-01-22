import React from 'react'
import './App.css'
import SearchBooks from './SearchBooks'
import HomePage from './HomePage'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
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

  bookIsOnShelf = (bookId) => {
    /**
    * @description Says whether a book already belongs to a shelf. (category is not None)
    * @constructor
    * @param {string} bookId - The ID of the book
    */
    const filteredList = this.state.books.filter((book) => (bookId === book.id))
    return filteredList.length ? true : false
  }

  changeShelf = (book, shelf) => {
    /**
    * @description  a shelf. (category is not None)
    * @param {book} bookId - The ID of the book
    * @param {shelf}
    */
    if (this.bookIsOnShelf(book.id)) {
      this.setState({books: this.state.books.filter((item) => (item.id !== book.id))})
    }
    book.shelf = shelf
    this.setState((currentState) => ({
        books: currentState.books.concat([book])
    }))
  }

  render() {
    /**
     * To keep track of which page we're on, use the URL in the browser's address 
     * bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <HomePage 
            books={this.state.books}
            onChangeShelf={(book, shelf) => {this.changeShelf(book, shelf)}}
          />
        )}
        />
        <Route path="/search" render={({ history }) => (
          <SearchBooks 
            books={this.state.books}
            onChangeShelf={(book, shelf) => {this.changeShelf(book, shelf)}}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp

// App
// |
// |-- HomePage
// |   |
// |   |-- BookItem
// |   |   |-- Controller
// |   |-- Link to SearchBooks
// |
// |-- SearchBooks
// |   |
// |   |-- BookItem
// |       |-- Controller
 