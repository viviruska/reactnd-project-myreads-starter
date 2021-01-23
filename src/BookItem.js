import React, { Component } from 'react'
import * as Utils from './Utils'
import PropTypes from 'prop-types'
import Controller from './Controller'

class BookItem extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    defaultShelf: PropTypes.string,
    onUpdateBook: PropTypes.func.isRequired,
  }

  render() {
    const {book, defaultShelf} = this.props;
    const shelves = Utils.shelves;

    return (
      <div className="book">
        <div className="book-top">
          <div 
            className="book-cover" 
            style={{ 
                width: 128, 
                height: 193, 
                backgroundImage: (book.imageLinks && book.imageLinks.thumbnail) ? `url(${book.imageLinks.thumbnail})` :'' }}>
          </div>
          <Controller
            book={book}
            defaultShelf={defaultShelf}
            shelves={shelves}
            onUpdateBook={(book, shelf) => {this.props.onUpdateBook(book, shelf)}}
          />
        </div>
        <div className="book-title">{book.title}</div>
        {(book && book.authors) 
          ? book.authors.map((author, index) => (
              <div className="book-authors" key={index}>{author}</div>
            )) 
          : ''}
      </div>
    )
  }
}

export default BookItem