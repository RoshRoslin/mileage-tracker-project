class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn
  }
}

class UI {
  addBookToList(book){
    const list = document.getElementById('book-list');

    //create element Tr element
    const row = document.createElement('tr');

    //insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href=""class="delete">X</a></td>
    `
    //append to list item
    list.appendChild(row);
  }

  showAlert(message, className){
    //create div
    const div = document.createElement('div');

    //add class
    div.className = `alert ${className}`;

    // add text
    div.appendChild(document.createTextNode(message));

    //get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

  //insert into dom (select what you want, where you want)
    container.insertBefore(div, form);

    //timeout after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000)
  }

  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//local storage class
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;
      //add book to ui
      ui.addBookToList(book)
    });
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1)
      }
    });
      localStorage.setItem('books', JSON.stringify(books));
  }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);



//event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  //get submit values from form
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // instantiating a book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  // validate inputs
  if(title === '' || author === '' || isbn === ''){
    // error alert add to UI

    ui.showAlert('Please Fill in All Fields', 'error');

  } else {

    //add book to list
    ui.addBookToList(book);

    // add to local storage
    Store.addBook(book);

    //show success
    ui.showAlert('Book Added!', 'success');

    //clear fields
    ui.clearFields();
  }

  e.preventDefault();
});


// event listener for delete use parent
document.getElementById('entry-table').addEventListener('click', function(e){
  console.log(e);
  // instatiate UI
  const ui = new UI();
  ui.deleteBook(e.target);

 //  // removefrom local storage
 // Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
 //
 //  //show alert
 //  ui.showAlert('Book Removed!', 'success')

  e.preventDefault();
})
