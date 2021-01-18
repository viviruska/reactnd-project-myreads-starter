import React, { Component } from 'react'

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
                      {books.map((book) => (
                        <li>
                          <p>{book.title}</p>

                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                              <div className="book-shelf-changer"></div>

                            </div>
                          </div>

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