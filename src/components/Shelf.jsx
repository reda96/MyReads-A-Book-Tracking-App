import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faCheck);
function Shelf({ bk, onChange }) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${bk.imageLinks.smallThumbnail})`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              defaultValue={bk.shelf}
              onChange={(event) => onChange(event, bk)}
            >
              <option value="move" disabled>
                Move to...
              </option>

              <option
                style={
                  bk.shelf === "currentlyReading" ? { color: "red" } : null
                }
                value="currentlyReading"
              >
                Currently Reading
              </option>
              <option
                style={bk.shelf === "wantToRead" ? { color: "red" } : null}
                value="wantToRead"
              >
                Want to Read
              </option>
              <option
                style={bk.shelf === "read" ? { color: "red" } : null}
                value="read"
              >
                Read
              </option>
              <option style={!bk.shelf ? { color: "red" } : null} value="none">
                None
              </option>
            </select>
          </div>
        </div>
        <div className="book-title"> {bk.title}</div>
        <div className="book-authors">{bk.authors}</div>
      </div>
    </li>
  );
}

export default Shelf;
