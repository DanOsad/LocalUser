function eventListeners(){
  // EVENT LISTENERS
  document.querySelector('#addUserButton').addEventListener('click', runApp)
  document.querySelector('#clearButton').addEventListener('click', clearDB)
  document.querySelector('#tableGen').addEventListener('click', generate_table)
}

let initialDBState = {
  // LOCAL DB INITIAL STATE
  "userCount": 0,
  "users": []
}

class createUser{
  // NEW USER CLASS CONSTRUCTOR
  constructor(nameOne, nameTwo, date, price, eshoot){
    this.userNameOne = nameOne
    this.userNameTwo = nameTwo
    this.eventDate = date
    this.packagePrice = price
    this.eshoot = eshoot
  }
  // functions go here
  markCompleted(){
    this.completed = true
  }
  markUnCompleted(){
    this.completed = false
  }
}

function initLocalDatabase(){
  // INITIAL SETUP OF LOCAL DB
  if (!localStorage.getItem('userBase')) {
    localStorage.setItem('userBase', JSON.stringify(initialDBState))
  }
}

function fetchDB(){
  // RETURNS DB FROM LOCAL STORAGE
  return JSON.parse(localStorage.getItem('userBase'))
}

function setDB(currentState){
  // SENDS DB TO LOCAL STORAGE
  localStorage.setItem('userBase', JSON.stringify(currentState))
}

function incrementUserCount(currentState){
  // INCREMENTS USERCOUNT BY 1, RETURNS NEW USERCOUNT
  currentState.userCount += 1
  return currentState
}

function retrieveFromDOM(elementID){
  // RETURNS FORMDATA
  return document.querySelector(`#${elementID}`).value
}

function createUserFromFormData(){
  // COLLECTS FORMDATA AND RETURNS USEROBJECT
  // let userNameOne = document.querySelector("#firstName").value
  let userNameOne = retrieveFromDOM("firstName")
  let userNameTwo = retrieveFromDOM("secondName")
  let eventDate = retrieveFromDOM("eventDate")
  let packagePrice = retrieveFromDOM("packagePrice")
  // let eshoot = retrieveFromDOM('eshoot')
  let eshoot = function(){
    return retrieveFromDOM("true").checked ? retrieveFromDOM("true").value
         : retrieveFromDOM("true").checked ? retrieveFromDOM("false").value
         : retrieveFromDOM("false").value
  }
  return new createUser(userNameOne, userNameTwo, eventDate, packagePrice, eshoot)
}

function addUser(userObject){
  // CREATES USER FROM A NEW *createUser* OBJECT
  let currentDBState = fetchDB()
  let userID = Number(currentDBState.userCount)+1
  currentDBState.users[`${userID}`] = userObject
  setDB(incrementUserCount(currentDBState))
}

function averagePackagePrice(){
  // RETURNS AVERAGE PACKAGE PRICE FROM ALL USERS IN LOCAL STORAGE
  let currentDBState = fetchDB()
  let averagePrice = []
  for (i=1; i<currentDBState.users.length; i++){
    averagePrice.push(currentDBState.users[i].packagePrice)
  }
  return averagePrice.reduce((a,c) => a+c) / averagePrice.length
}

function clearDB(){
  // CLEARS AND REINITIALIZES LOCAL DB
  localStorage.clear()
  initLocalDatabase()
}

function runApp(){
  // CREATES A NEW LOCAL DB IF ONE DOESN'T EXIST
  // ADDS NEW USER FROM FORM DATA
  initLocalDatabase()
  addUser(createUserFromFormData())
}

// function displayUser(){
//   let node = '$4300'
//   let para = document.createElement('td').innerHTML = `${node}`
//   document.getElementById('#value').append(para)
// }

function generate_table() {
  // get the reference for the body
  var body = document.getElementById("userListCol")

  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // creating all cells
  for (var i = 0; i < 2; i++) {
    // creates a table row
    var row = document.createElement("tr");

    for (var j = 0; j < 2; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
      var cellText = document.createTextNode("cell in row "+i+", column "+j);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
}

// RUNS EVENT LISTENERS
eventListeners()

/* TESTS */

const testUserData = [
  ['Drusie','Nicol','25/12/2021','1676.76','false'],
  ['Bria','Burty','25/02/2022','1561.99','true'],
  ['Blake','Mylo','15/10/2021','2461.42','false'],
  ['Kassey','Kennedy','24/01/2022','1190.05','false'],
  ['Melva','Justis','27/09/2021','2172.86','true'],
  ['Selestina','Philbert','19/12/2021','3931.48','true'],
  ['Genna','Aldus','06/02/2022','4818.14','false'],
  ['Jacinda','Stevie','10/02/2022','1104.61','true'],
  ['Sallie','Cam','14/12/2021','1090.48','false'],
  ['Lilia','Federico','27/04/2021','1024.33','true'],
]

function testBuildDB(userData){
  for (i=0; i<userData.length; i++){
    let newUser = new createUser(
      userData[i][0],
      userData[i][1],
      userData[i][2],
      userData[i][3],
      userData[i][4]
      )
    addUser(newUser)
  }
}