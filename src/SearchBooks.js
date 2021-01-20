import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookItem from './BookItem'

class SearchBooks extends Component {

  state = {
    query: '',
    filteredBooks: []
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

  render() {
    const { query, filteredBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
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
            {/* expand this to show result
            TODO: make reused code from HomePage.js DRY */}
            {filteredBooks.map((book) => (
              <li key={book.id}>
                <BookItem 
                  book={book}
                  // shelves={utils.shelves}
                  defaultShelf={book.shelf}
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