import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookItem from './BookItem'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

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

  /**
   * To keep the state on both pages (search --> home), we are going to pass 
   * a prop called onChangeShelf.
   * When we do that, this function is going to expect to receive book and 
   * shelf. onChangeShelf is eventually going to decide what we'll get to 
   * actually do on the book shelf change.
   * 
   * @param {object} book - book object we are updating
   * @param {string} shelf - name of the new shelf 
   */
  updateBook = (book, shelf) => {
    if (this.props.onChangeShelf) {
      this.props.onChangeShelf(book, shelf);
      this.updatefilteredBooks(book, shelf);
    }
  }

  /**
   * Update state for search results, once the user changes the shelf for one 
   * of them.
   * 
   * @param {object} book - book object we are updating
   * @param {string} shelf - name of the new shelf 
   */
  updatefilteredBooks = (book, shelf) => {
    this.setState(prevState => ({
      books: this.state.filteredBooks.map((item) => {
        return item.id === book.id ? {...prevState, shelf: shelf} : item
      })
    }));
  }

  /**
   * Each book has a control that lets you select the shelf for that book. 
   * When you select a different shelf, the book moves there. 
   * 
   * 1 )  Note that the default value for the control should always be the current 
   *      shelf the book is in.
   * 2 )  When a book is on a bookshelf, it should have the same state on both the 
   *      main application page and the search page.
   *      (this function is for home --> search)
   * 
   * Book objects returned by the search API won't have a shelf attribute, but 
   * we can overcome this by computing the current (= default) shelf of the 
   * book based on the books property - containing shelf data.
   * 
   * @param {object} book - book object we're updating
   * @param {array} books - list of books prop, passed by the App component
   * @returns {string} shelf - name of the shelf
   */
  getDefaultShelf = (book, books) => {
    let shelf = 'none';

    if (book.shelf != null) {
      shelf = book.shelf;
    } else {
    books.forEach(b => {
      if (b.id === book.id) {
        shelf = b.shelf;
      }
    })

    return shelf;
  }}


  /**
   * NOTES: The search from BooksAPI is limited to a particular set of search terms.
   * You can find these search terms here:
   * https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
   * 
   * However, remember that the BooksAPI.search method DOES search by title or 
   * author. So, don't worry if you don't find a specific author or title. 
   * Every search is limited by search terms.
   */
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