const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    // console.log(data);
    const user = data.results[0];
    // console.log(user);
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    // console.log(newUser);
    addData(newUser);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
////  toFixed(2): formats the number to have exactly 2 decimal places.
////  replace(/\d(?=(\d{3})+\.)/g, '$&,')): adds commas as thousand separators.
//// The regular expression \d(?=(\d{3})+\.)/g matches each digit that is followed by 3 or more digits and a decimal point.
////  The $& in the replacement string refers to the matched digit, 
////  and the comma is added after it.// 
//// So, if you call formatMoney(12345.6789), it will return the string '$12,345.68'.

// Double eveyones money
function doubleMoney() {
  data = data.map(user_item => {
    return { ...user_item, money: user_item.money * 2 };
  });

  updateDOM();
}
// Sort users by richest
function sortByRichest() {
//   console.log(123);
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}
// Filter only millionaires
function showMillionaires() {
  data = data.filter((user) => {
    return user.money > 1000000});

  updateDOM();
}
// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}
// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);