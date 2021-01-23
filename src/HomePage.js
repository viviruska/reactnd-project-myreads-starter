import React, { Component } from 'react'
import BookItem from './BookItem'
import { Link } from 'react-router-dom'
import * as Utils from './Utils'
import PropTypes from 'prop-types'

class HomePage extends Component {

  static PropTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  updateBook = (book, shelf) => {
    if (this.props.onChangeShelf) {
      this.props.onChangeShelf(book, shelf);
    }
  }

  render() {
    const { books } = this.props;
    const shelves = Utils.shelves;

    return (

      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">

          {shelves.filter((shelf) => (shelf.name !== 'none')).map((shelf) => (
            <div key={shelf.name}>
              <div className="bookshelf">
              
              <h2 className="bookshelf-title">{shelf.title}</h2>

                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.filter((book) => (book.shelf === shelf.name)).map((book) => (
                      <li key={book.id}>
                        <BookItem 
                          book={book}
                          defaultShelf={book.shelf}
                          onUpdateBook={(book, shelf) => {this.updateBook(book, shelf)}}
                        />
                      </li>
                    ))}
                  </ol>
                </div>

              </div>
            </div>
          ))}
        </div>

        <Link 
          className='open-search' 
          to='/search'
        >
          <button>Add a book</button>
        </Link>

      </div>
    )
  }
}

export default HomePage