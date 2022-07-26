import React from 'react';
import '../App.css';
import Shelf from './shelf.js';
import Head from './head';
import {Link} from 'react-router-dom';

/***
 * MainPage()
 * @param books , updateBook
 * @return Component hold the content of  main page of the App { Head ,three shelfs ,and search page button} 
 * books state : it.s the main state in the App that controle of state of the most of App
 * 
 */

class MainPage extends React.Component{

    /***if you want to add new shelf  to main page you can add it.s name in this array */
    shelfs=this.props.shelfs;
    render()
    {
        return(
            <div className="list-books">
                <div className="list-books-content">
                    <div>
                        <Head head="myReads"/>
                        {
              /**looping on shelfes */              
                        this.shelfs.map((shelf)=>{
                            /**filtering books bases on shelf    */
                            let filteredBooks= this.props.books.filter(book=>book.shelf===shelf);/**books that have the same shelf */
                           /***mapping on filtedBooks and getting from each book
                            * only data that will be rendered inside Book componeent
                            */
                           /*
                            let result=filteredBooks.map((book)=>{
                                return {
                                       id:book.id,
                                       title:book.title,
                                       authors:book.authors,
                                       imageLinks:book.imageLinks,
                                       }});

                                       */
                            return  <Shelf key={shelf} shelfName={shelf} books={filteredBooks} updateBook={this.props.updateBook} />         

                           })
                         }


                     </div>               
                </div>
                {/**navigating to search page */}
                <div className="open-search">
                    <Link to="/search">
                        <button >Add a book</button>
                    </Link>
                    
                </div>
            </div>



             )
    }
}
export default MainPage;