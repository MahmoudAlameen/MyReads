import React, { useState } from 'react';
import '../App.css';
import propTypes from 'prop-types';

/**
 * 
 * @param {*} props => id :integer , title: string , authors : array, imageLink : string, 
 *                               currentShelf:string, updateBook:method
 * updateBook():
 *    -it.s called inside book component and run in MainPageComponent
 *    -it take id and new shelf inside Book Component and update  book in boooks state in MainPage and 
 *        Books in the API
 *  , currentShelf: string 
 * @returns  Book component {it composed of coverImage , title and authors of the book}
 * used by Shelf components to render list of books inside it 
 * on selecting (changing) shelf of the book setShelf will change shelfValue and then react engine will
 * value of select with shelfValue
 * userSelect--->setShelve(selectedValue)---->React Engine will set value of select with new shelfValue and so on..
 */

function Book(props){

    const[shelfValue , setShelf]=useState(props.ifBookExist(props.book)); // shelfValue hold current shelf of the book ,setShelf will modify on shelfValue
    let trackImagLink=(links)=>{
        return  links!==undefined?(links.smallThumbnail!==undefined?links.smallThumbnail : links.thumbnail):"https://m.media-amazon.com/images/I/41IiBTZOGCL._SL500_.jpg";
        }
    let trackingAuthors=(authors)=>
        {
          return authors!==undefined?authors:["this book does not has author ....."];
  
        }   
   
    return (
      <div className="book">
          <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${trackImagLink(props.book.imageLinks)})`}}></div>
              <div className="book-shelf-changer">
                  <select  value={shelfValue} onChange={(event)=>{setShelf(event.target.value);props.updateBook(props.book,event.target.value)}}>
                      <option value="move" disabled>Move to...</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="currentlyReading" >Currently Reading</option>
                      <option value="read">Read</option>
                      <option value="none" >None</option>
                  </select>
              </div>
          </div>
         <div className="book-title">{props.book.title}</div>
         <div className="book-authors">{trackingAuthors(props.book.authors)}</div>
      </div>

    )
}
Book.propTypes={
    book:propTypes.object.isRequired,
    ifBookExist:propTypes.func.isRequired,
    updateBook:propTypes.func.isRequired
}
export default Book;







