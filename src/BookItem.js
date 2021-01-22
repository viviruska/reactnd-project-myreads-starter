import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import * as Utils from './Utils'

class BookItem extends Component {

  updateBookShelfDB = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then((book) => {
      console.log(book)
    })
  }

  // don’t default to the first value, but to the shelf of the book.
  // For the option you want to be the default, React, instead of using the selected attribute, 
  // uses a value attribute on the root select tag
  handleChange = (book, event) => {
    const shelf = event.target.value;
    // update bookshelf in the DB
    this.updateBookShelfDB(book, shelf);

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
              <option value="move" disabled>Move to...</option>
              {shelves.map((shelf) => (
                <option value={shelf.name} key={shelf.name}>{shelf.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default BookItem