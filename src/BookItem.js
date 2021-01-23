import React, { Component } from 'react'
import * as Utils from './Utils'
import PropTypes from 'prop-types'

class BookItem extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    defaultShelf: PropTypes.string,
    onUpdateBook: PropTypes.func.isRequired,
  }

  handleChange = (book, event) => {
    const shelf = event.target.value;

    if (this.props.onUpdateBook) {
      this.props.onUpdateBook(book, shelf);
    }
  }

  render() {
    const {book, defaultShelf} = this.props;
    const shelves = Utils.shelves;

    return (
      <div className="book">
        <div className="book-top">
          <div 
            className="book-cover" 
            style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
          </div>
          <div className="book-shelf-changer">
            <select value={defaultShelf} onChange={(e) => this.handleChange(book, e)}>
              {/* For the option you want to be the default, React uses a value attribute on the root select tag */}
              <option value="move" disabled>Move to...</option>
              {shelves.map((shelf) => (
                <option value={shelf.name} key={shelf.name}>{shelf.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors.map((author, index) => (
          <div className="book-authors" key={index}>{author}</div>
        ))}
      </div>
    )
  }
}

export default BookItem