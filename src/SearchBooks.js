import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookItem from './BookItem'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {

  state = {
    query: '',
    filteredBooks: [],
  }

  queryDatabase = (query) => {
    BooksAPI.search(query)
    .then((data) => {
      this.setState(() => ({
        filteredBooks: data
      }));
    });
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }));
    this.queryDatabase(query);
  }

  updateBook = (book, shelf) => {

    if (this.props.onChangeShelf) {
      this.props.onChangeShelf(book, shelf);
      this.updatefilteredBooks(book, shelf)
    }
  }

  updatefilteredBooks = (book, shelf) => {
    /**
    * @description  Update state for search results, once the user changes the 
    *               category (shelf) for one of them.
    *               Initially, book objects returned by search won't have a shelf
    *               attribute. Hence we need to keep a book's shelf consistent,
    *               we assign it as an attribute with the new value, passed as 
    *               a param.
    * @param {object} book - book object we are updating
    * @param {string} shelf - the name of the new shelf 
    */
    this.setState(prevState => ({
      books: this.state.filteredBooks.map((item) => {
        return item.id === book.id ? {...prevState, shelf: shelf} : item
      })
    }))
  }

  /**
  * @description Adds two numbers
  * @param {book} a
  * @param {book} b
  * @returns {shelf} Sum of a and b
  */
  getDefaultShelf = (book, books) => {
    let shelf = 'none'

    if (book.shelf != null) {
      shelf = book.shelf
    } else {
    books.forEach(b => {
      if (b.id === book.id) {
        shelf = b.shelf
      }
    })

    return shelf;
  }}

  render() {
    const { query, filteredBooks } = this.state;
    const { books } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link 
            className="close-search"
            to="/">
          </Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input 
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {filteredBooks.map((book) => (
              <li key={book.id}>
                <BookItem 
                  book={book}
                  defaultShelf={this.getDefaultShelf(book, books)}
                  onUpdateBook={(book, shelf) => {this.updateBook(book, shelf)}}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks