import React  from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import {search} from '../BooksAPI';
import ListBooks from './BooksList';
import propTypes from 'prop-types';

/***
 * rendering search page 
 * @return component that render search page 
 * @searchKey state it.s key used to search on books 
 * @searchedBooks state that hold books returned from search result
 * @setSearch method used to change searchKey and searchedBooks values
 * @updateBook method 
 */
class Search extends React.Component
{
   static propTypes={
        updateBook:propTypes.func.isRequired
    }
    state={
        searchKey:'',
        searchedBooks:[]
    }
    setSearch=(value)=>
    {
        this.setState({
            searchKey:value
        });

      

         search(value).then(data=>{
            let searchedBooks;     
            if(!Array.isArray(data))
              searchedBooks=[];
            else
            {
                let resultedBooks=data.filter(book=>book.imageLinks!==undefined ||
                    ( book.imageLinks.thumbnails!==undefined && book.imageLinks.smallThumbnail!==undefined))   
                  searchedBooks=resultedBooks; 
            }  
            
   
        this.setState({searchedBooks:searchedBooks});
        })

    }

    render()
    {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                         NOTES: The search from BooksAPI is limited to a particular set of search terms.
                         You can find these search terms here:
                         https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
        
                         However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                         you don't find a specific author or title. Every search is limited by search terms.
                       */}
                          <input type="text" value={this.state.searchKey} onChange={(event)=>this.setSearch(event.target.value)} placeholder="Search by title or author"/>
        
                     </div>
                </div>
                <div className="search-books-results">
                    <ListBooks  books={this.state.searchedBooks} ifBookExist={this.props.ifBookExist} updateBook={this.props.updateBook}/>
               </div>
           </div>
        
            )
        
    }
    
}
export default Search;