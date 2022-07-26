import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './components/mainPage';
import Search from './components/search';

import {Route,Routes} from 'react-router-dom'

class BooksApp extends React.Component {
  state=
  {
      books:[]

  }
  shelfs=["currentlyReading","wantToRead","read"];
      /*** for updating specefied book to be transfered from shelf to another or for adding new books 
     * to shelfs from search 
     * @param    id: number , id of the book in the API
     * @param shelf : new shelf of the book           
     *        
     */
    shelfExist=(shelfs,shelf)=>
    {
      for(let s of shelfs)
        {
          if(s===shelf)
            return true;
        }
        return false;
    }
     update=(mybook,shelf)=>
       {
        if(!this.shelfExist(this.shelfs,shelf))
         {
           this.remove(mybook);
           return;
         }

         let books=this.state.books;
         for(let book of books)
          {
            if(book.id===mybook.id)
             {
               book.shelf=shelf;
               this.setState({books:books});
               BooksAPI.update(book,shelf);
               return;
             }

          }
          mybook.shelf=shelf;
          books.push(mybook);
          this.setState({books:books});
          BooksAPI.update(mybook,shelf).then();
          return;

         
       };
       /**
        * 
        * @param {*} book 
        * @returns shelf of passed book
        * it built for search component to deliver value of shelf as search return books without it.s shelf 
        * if book does not exist in any shelf it will return none 
        * if it exist in any of the shelfs it will return shlef name 
        * used by books rendered by Search component
        *
        */
       ifBookExist=(book)=>
       {
         for(let b of this.state.books)
           {
             if(book.id===b.id)
              return b.shelf;
           }
           return "none";
       }
       
       remove=(book)=>
       {
         let books=this.state.books;
         for(let index in this.state.books)
          {
            if(books[index].id===book.id)
            {
              let temp=books[books.length-1];
              books.pop();
              books[index]=temp;
              this.setState({books:books});
              BooksAPI.update(book,"none").then((book));//<---- for testing API

              return true;
            }
          }
          return true;

       }
       



       /**fetching books from ApI  */
       componentDidMount()
       {
         BooksAPI.getAll().then(data=>{
           if(data!==undefined);
             this.setState({books:data})
          });
       }
       

  render() {
    return (
      <div className="app">
        <Routes>
           <Route path='/' element={<MainPage shelfs={this.shelfs} books={this.state.books} updateBook={this.update}/>}/>
           <Route   path="/search" element={<Search ifBookExist={this.ifBookExist} updateBook={this.update}/>}/>
        </Routes>      
      </div>
    )
  }
}

export default BooksApp;

//BooksAPI.getAll().then((data)=>console.log(data));   <--- for testing API
//BooksAPI.get("6z7kDAAAQBAJ").then((book)=>console.log(book));//<---- for testing API
