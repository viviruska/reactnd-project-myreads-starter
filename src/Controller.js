import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Controller extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    defaultShelf: PropTypes.string,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  }

  handleChange = (book, event) => {
    const shelf = event.target.value;
    
    if (this.props.onUpdateBook) {
      this.props.onUpdateBook(book, shelf);
    }
  }

  render() {
    const { book, defaultShelf, shelves } = this.props;

    return (
        <div className="book-shelf-changer">
        <select value={defaultShelf} onChange={(e) => this.handleChange(book, e)}>
          {/* For the option you want to be the default, React uses a value attribute on the root select tag */}
          <option value="move" disabled>Move to...</option>
          {shelves.map((shelf) => (
            <option value={shelf.name} key={shelf.name}>{shelf.title}</option>
          ))}
        </select>
      </div>
    )
  }
}

export default Controller