import React from "react";
import Shelf from "./Shelf";
import { Route, Link } from "react-router-dom";
function Search({ search, searchResult, addBook }) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResult ? (
            searchResult.map((bk) => {
              return (
                <Shelf
                  key={bk.id}
                  onChange={(event, bk) => addBook(event, bk)}
                  bk={bk}
                />
              );
            })
          ) : (
            <p> There is no Books with these specs</p>
          )}
        </ol>
      </div>
    </div>
  );
}

export default Search;
