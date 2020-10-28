class Entry {
  constructor(date, start, destination, mileage){
    this.date = date;
    this.start = start;
    this.destination = destination;
    this.mileage = mileage;
  }
}

class UI {
  addEntryToList(entry){


    const list = document.getElementById('entry-table');

    //create element Tr element
    const row = document.createElement('tr');

    //insert cols
    row.innerHTML = `
    <td>${entry.date}</td>
    <td>${entry.start}</td>
    <td>${entry.destination}</td>
    <td>${entry.mileage}</td>
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
    const form = document.querySelector('#mileage-form');

  //insert into dom (select what you want, where you want)
    container.insertBefore(div, form);

    //timeout after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000)
  }

  deleteEntry(target){
    if(target.className === 'delete'){

  target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('start').value = '';
    document.getElementById('destination').value = '';
    document.getElementById('mileage').value = '';

  }
}



document.getElementById('mileage-form').addEventListener('submit', function(e){


  //assign entry variables to value
  const start = document.getElementById('start').value;
  const destination = document.getElementById('destination').value;
  const mileage = document.getElementById('mileage').value;
  parseInt(mileage);
  const date = document.getElementById('date-input').value;

  console.log(date);

  //create new entry, send variables to constructor
  const entry = new Entry(date, start, destination, mileage)

  //instantiate new ui
  const ui = new UI();

  if(start === '' ||
    destination === '' ||
    mileage === '' ||
    mileage <= 0 ||
    date === ''

){


  //show alert
  ui.showAlert('Please fill out all fields', 'error');

} else {

  //add entry
  ui.addEntryToList(entry);

  //show alert
  ui.showAlert('Entry Added', 'success');

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
  ui.deleteEntry(e.target);
  ui.showAlert('Entry Deleted', 'warning');


  e.preventDefault();
})
