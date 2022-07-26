import React from 'react';
import '.././App.css'

/**
 * this function take props as a parameter and return component that view header of main page
 * props has only head 
 * this component will be used by App component  
 * @param {
 * } props 
 * @returns Head component to be rendered in the top of main page
 */
function Head(props){
    return (
        <div className="list-books-title">
           <h1>{props.head}</h1>
        </div>
        
    )
}
export default Head;
