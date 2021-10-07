import React from "react";
import { Route, Link } from "react-router-dom";
import Search from "./components/Search";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import Shelf from "./components/Shelf";
class BooksApp extends React.Component {
  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      const currentlyReading = res.filter(
        (bk) => bk.shelf === "currentlyReading"
      );
      const wantToRead = res.filter((bk) => bk.shelf === "wantToRead");
      const read = res.filter((bk) => bk.shelf === "read");
      this.setState({
        ...this.state,
        books: res,
        currentlyReading,
        wantToRead,
        read,
      });
    });
  }

  onChange = (e, bk) => {
    const currentlyReading = [];
    const read = [];
    const wantToRead = [];
    BooksAPI.update(bk, e.target.value).then((res) => {
      this.state.books.forEach((bk) => {
        if (res.currentlyReading.includes(bk.id)) currentlyReading.push(bk);
        if (res.wantToRead.includes(bk.id)) wantToRead.push(bk);
        if (res.read.includes(bk.id)) read.push(bk);
      });
      this.setState({
        ...this.state,
        currentlyReading,
        wantToRead,
        read,
      });
    });
  };

  addBook = (event, bk) => {
    const exist = this.state.books.find((book) => book.id === bk.id);
    bk.shelf = event.target.value;
    if (!exist) {
      const newBooks = [...this.state.books, bk];
      this.setState({ ...this.state, books: newBooks });
    }
    this.onChange(event, bk);
  };
  search = (value) => {
    BooksAPI.search(value).then((res) => {
      if (Array.isArray(res)) {
        const filtered = res.filter((bk) => bk.imageLinks);
        filtered.forEach((bk) => {
          if (this.state.currentlyReading.map((bk) => bk.id).includes(bk.id)) {
            bk.shelf = "currentlyReading";
          } else if (this.state.wantToRead.map((bk) => bk.id).includes(bk.id)) {
            bk.shelf = "wantToRead";
          } else if (this.state.read.map((bk) => bk.id).includes(bk.id)) {
            bk.shelf = "read";
          } else bk.shelf = "none";
        });
        this.setState({ ...this.state, searchResult: filtered });
      } else
        this.setState({
          ...this.state,
          searchResult: null,
        });
    });
  };
  state = {
    searchResult: null,
    books: null,
    currentlyReading: null,
    wantToRead: null,
    read: null,
  };
  render() {
    return (
      <div className="app">
        <Route path="/search">
          <Search
            search={this.search}
            searchResult={this.state.searchResult}
            addBook={this.addBook}
          />
        </Route>
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.currentlyReading
                          ? this.state.currentlyReading.map((bk) => {
                              return (
                                <Shelf
                                  key={bk.id}
                                  onChange={this.onChange}
                                  bk={bk}
                                />
                              );
                            })
                          : null}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.wantToRead
                          ? this.state.wantToRead.map((bk) => {
                              return (
                                <Shelf
                                  key={bk.id}
                                  onChange={this.onChange}
                                  bk={bk}
                                />
                              );
                            })
                          : null}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.read
                          ? this.state.read.map((bk) => {
                              return (
                                <Shelf
                                  key={bk.id}
                                  bk={bk}
                                  onChange={this.onChange}
                                />
                              );
                            })
                          : null}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link className="link" to="/search">
                  Add a book
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
