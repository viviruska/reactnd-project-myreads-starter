import React, { Component } from 'react'
import BookItem from './BookItem'
import { Link } from 'react-router-dom'

class HomePage extends Component {

  render() {
    const { books } = this.props;

    const shelves = [
      {
        'title': 'Currently Reading',
        'name': 'currentlyReading'
      },
      {
        'title': 'Want to Read', 
        'name': 'wantToRead'
      },
      {
        'title': 'Read', 
        'name': 'read'
      }
    ]

    return (

      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">

          {shelves.map((shelf) => (
            <div key={shelf.name}>
              <div className="bookshelf">
              
              <h2 className="bookshelf-title">{shelf.title}</h2>

                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.filter((book) => (book.shelf === shelf.name)).map((book) => (
                      <li key={book.id}>
                        <BookItem 
                          book={book}
                          shelves={shelves}
                          defaultShelf={book.shelf}
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