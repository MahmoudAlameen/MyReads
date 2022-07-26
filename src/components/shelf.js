import React from 'react';
import propTypes from 'prop-types';
import '../App.css';
import ListBooks from './BooksList';




/**
 * 
 * @param {*} props=> shlefName :string , books: array  , updatedBook: function
 * updateBook(id: integer , shelfName: string)
 *              - update book that it.s id passed to function with new shelf 
 * @returns  shelf component that is composed from shelfName and list of books components
 * every element in books array is composed of
 *   id,title,authors,imageLinks,updateBook
 */
function Shelf(props)
{
    /***this function will be put in ifBookExist  props as it  passed to ListBooks componenet to deliveer it to each Book component
     * as it just return  shelf of the book be set
     * ifExistBooks method build for search componenet and this function passed to ifExistBooks  untill 
     * not contain null or undefined value and throw an error 
     * so that i called it fake function 
     * as it does nothing any thin within shelf 
     * it just for preventing ifBookExist from holding undefinded value  in this situation 
     */
    let fakeFunction=(book)=>
    {
        return book.shelf
    }
    
    return (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.shelfName}</h2>
        <div className="bookshelf-books">
            <ListBooks  ifBookExist={fakeFunction}   shelfName={props.shelfName} books={props.books} updateBook={props.updateBook} />

        </div>
    </div>
    )
}
Shelf.propTypes={
    shelfName:propTypes.string.isRequired,
    books:propTypes.array.isRequired,
    updateBook:propTypes.func.isRequired
}
export default Shelf;







