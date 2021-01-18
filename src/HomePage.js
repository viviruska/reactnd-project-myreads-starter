import React, { Component } from 'react'
import BookItem from './BookItem'

class HomePage extends Component {

  render() {
    const { books } = this.props;
    console.log(books)

    return (

      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        {/* -- BookShelves ------------------------------------------------------ */}
        <div className="list-books-content">
          <div>
            <div className="bookshelf">

              <h2 className="bookshelf-title">Currently Reading</h2>

                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter((book) => (book.shelf === 'currentlyReading')).map((book) => (
                        <li>
                          <BookItem book={book}/>
                        </li>
                      ))}
                    </ol>
                  </div>

            </div>
          </div>
        </div>
        {/* --------------------------------------------------------------------- */}


        <div className="open-search">
          <button>Add a book</button>
        </div>
      </div>
    )
  }
}

export default HomePage