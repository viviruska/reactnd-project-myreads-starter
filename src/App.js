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
      }));
    });
  }

  /**
   * Says whether a book already belongs to a shelf. (category is not None)
   * 
   * @param {string} bookId - the ID of the book
   */
  bookIsOnShelf = (bookId) => {
    const filteredList = this.state.books.filter((book) => (bookId === book.id));
    return filteredList.length ? true : false;
  }

  updateBookShelfDB = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then((book) => {
      console.log(book);
    });
  }

  /**
   * If a book to be updated already is on a shelf, we want to remove it from 
   * the state and concatenate on an updated book object.
   * In case of a book is just about to make it to a shelf (from shelf None), 
   * there's no risk of duplication, simply add it to the state.
   * 
   * @param {object} book  - book object we are updating/adding
   * @param {string} shelf - name of the new shelf 
   */
  updateBookShelfState = (book, shelf) => {
    if (this.bookIsOnShelf(book.id)) {
      this.setState({
        books: this.state.books.filter((item) => (item.id !== book.id))
      });
    }

    book.shelf = shelf
    this.setState((currentState) => ({
        books: currentState.books.concat([book])
    }));
  }

  /**
   * We need to make sure that we change our book's shelf with the API and we 
   * also update our local state.
   * 
   * @param {object} book - book object we're updating
   * @param {string} shelf - name of the new shelf 
   */
  changeShelf = (book, shelf) => {
   this.updateBookShelfDB(book, shelf);
   this.updateBookShelfState(book, shelf);
  }

  /**
   * Route:
   * To keep track of which page we're on, we use the URL in the browser's 
   * address bar. This will ensure that users can use the browser's back and 
   * forward buttons to navigate between pages, as well as provide a good URL 
   * they can bookmark and share.
   * 
   * Props:
   * onChangeShelf prop is going to be a function, and when this function is 
   * invoked, we call this.changeShelf that we created above. 
   * We also want to pass it the book and shelf that we're getting when 
   * onChangeShelf is invoked.
   */
  render() {
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
 