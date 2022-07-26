import React from 'react';
import Book from './book.js';
import propTypes from 'prop-types';


/**
 * 
 * @param {*} props  books:array , shelfName
 * 
 * @returns   ListBooks componenet that will render list books
 */


function ListBooks(props)
{
    /***
     * trackLink()
     *@param  link :string
     *@return if passed link is undefined it will return fak link 
               if not it will return passed link
     *goal of trackLink() method : is to make sure that link is not null value or undefined 
     fake link :"https://m.media-amazon.com/images/I/41IiBTZOGCL._SL500_.jpg"          

     */

    return(
        <ol className="books-grid">
           {
              props.books.map((book=>{
                return(  
                  <li key={book.id}>
                      <Book book={book} ifBookExist={props.ifBookExist} updateBook={props.updateBook}/>
                  </li>
                )

              }))
           }
        </ol>

    )


}
ListBooks.propTypes={
  books:propTypes.array.isRequired,
  updateBook:propTypes.func.isRequired,
  ifBookExist:propTypes.func.isRequired
}
export default ListBooks;