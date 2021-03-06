// RUNS EVENT LISTENERS
eventListeners()

function eventListeners(){
  // EVENT LISTENERS
  document.querySelector('#addUserButton').addEventListener('click', runApp)
  document.querySelector('#tableGen').addEventListener('click',genTable)
  document.querySelector('#removeUserButton').addEventListener('click',removeUser)
  document.querySelector('#clearButton').addEventListener('click', clearDB)
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

function verifyRadioButtonSelection(elementID){
  // RETURNS TRUE IF RADIO BUTTON IS CHECKED, FALSE OTHERWISE
  return document.querySelector(`#${elementID}`).checked
}

function createUserFromFormData(){
  // COLLECTS FORMDATA AND RETURNS USEROBJECT
  let userNameOne = retrieveFromDOM("firstName")
  let userNameTwo = retrieveFromDOM("secondName")
  let eventDate = retrieveFromDOM("eventDate")
  let packagePrice = retrieveFromDOM("packagePrice")
  let eshoot = verifyRadioButtonSelection('eshootTrue')
  return new createUser(userNameOne, userNameTwo, eventDate, packagePrice, eshoot)
}

function clearInputFields(){
  // CLEARS ALL INPUT FIELDS
  document.querySelector("secondName").value = ''
  document.querySelector("firstName").value = ''
  document.querySelector("eventDate").value = ''
  document.querySelector("packagePrice").value = ''
  document.querySelector("removeUser").value = ''
}

function addUser(userObject){
  // CREATES USER FROM A NEW *createUser* OBJECT
  let currentDBState = fetchDB()
  let userID = Number(currentDBState.userCount)+1
  currentDBState.users[`${userID}`] = userObject
  setDB(incrementUserCount(currentDBState))
  // clearInputFields()
  genTable()
}

function removeUser(){
  // REMOVES USERS FROM LOCAL STORAGE
  let userID = retrieveFromDOM('removeUser')
  let currentDBState = fetchDB()
  currentDBState.users.splice(userID, 1)
  setDB(currentDBState)
  genTable()
  // clearInputFields()
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

function genTable(){
  clearTable()
  let currentDBState = fetchDB()
  let users = currentDBState.users
  for (i=1; i<users.length; i++){
    if (users[i]!=null){
    let newElement = document.createElement('tr')
    newElement.setAttribute('class', 'userTableRow')
    let tableRowContent = `
                            <td>${Number(i)}</td>
                            <td>${users[i].userNameOne}</td>
                            <td>${users[i].userNameTwo}</td>
                            <td>${users[i].eventDate}</td>
                            <td>${users[i].eshoot}</td>
                            <td>${users[i].packagePrice}</td>
                          `
    newElement.innerHTML = tableRowContent
    document.getElementById('table').appendChild(newElement)
    setTableToVisible()
    }
  }
}

function setTableToVisible(){
  let tableID = document.getElementById('tableData')
  tableID.style.display = 'flex'
}

function clearTable(){
  removeChildren('.userTableRow', document)
  // let rows = document.getElementsByClassName('userTableRow')
  // rows.forEach(e=> e.style.display = 'none')
}

function removeChildren(cssSelector, parentNode){
  var elements = parentNode.querySelectorAll(cssSelector)
  let fragment = document.createDocumentFragment()
  fragment.textContent=' '
  fragment.firstChild.replaceWith(...elements)
}

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
  initLocalDatabase()
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