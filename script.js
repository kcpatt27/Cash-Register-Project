let totalPrice = document.getElementById('total-price');
let price = Number(totalPrice.value);

let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const displayChangeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cashInDrawer = document.getElementById("cash-in-drawer");
const cashAddedToRegister = document.getElementById('register-addition');
const penny = document.getElementById('penny');
const nickel = document.getElementById('nickel');
const dime = document.getElementById('dime');
const quarter = document.getElementById('quarter');
const one = document.getElementById('one');
const five = document.getElementById('five');
const ten = document.getElementById('ten');
const twenty = document.getElementById('twenty');
const hundred = document.getElementById('hundred');

const formatResults = (status, change) => {
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
  change.map(
    money => (displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
  );
  return;
};

const checkCashRegister = () => {
  if(Number(cash.value) < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  if(Number(cash.value) === price){
    displayChangeDue.innerHTML = 
      `<p>No change due - customer paid with exact cash</p>`;
  cash.value = '';
  return;
  }

  let changeDue = Number(cash.value) - price;
  let reversedCid = [...cid].reverse();
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = { status: 'OPEN', change: [] };
  let totalCID = parseFloat(
    cid
      .map(total => total[1])
      .reduce((prev, curr) => prev + curr)
      .toFixed(2)
  );

  if (totalCID < changeDue){
    return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  }

  if (totalCID === changeDue){
    result.status = 'CLOSED';
  }

  for(let i=0; i <= reversedCid.length; i++){
    if(changeDue >= denominations[i] && changeDue > 0){
      let count = 0;
      let total = reversedCid[i][1];
      while(total > 0 && changeDue >= denominations[i]){
        total -= denominations[i];
        changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));
        count++;
      }
      if(count > 0){
        result.change.push([reversedCid[i][0], count * denominations[i]]);
      }
    }
  }
  if (changeDue > 0) {
    return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  }
  formatResults(result.status, result.change);
  updateUI(result.change);
}

const checkResults = () => {
  if(!cash.value) {
    return;
  }
  checkCashRegister();
};

const updateUI = change => {
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };

  if(change) { 
    change.forEach(changeArr => {
      const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
    });
  }

  cash.value = ''; 
  cashInDrawer.innerHTML = `<p><strong>Change in drawer:</strong></p>
  ${cid
    .map((money, index) => { // Determine the formatting based on the index
      const formattedAmount = index < 4 ? money[1].toFixed(2) : money[1].toFixed(0);
      return `<p>${currencyNameMap[money[0]]}: $${formattedAmount}</p>`;
    })
    .join('')}
  `;
};

//
const denominationMultiplier = (denomination) => {
  let cashForRegister = Number(cashAddedToRegister.value);
  let newMoney = cashForRegister * Number(denomination);
  return newMoney;
};

// eventListeners for each of the 9 denomination buttons (theres likely a better way but lets implement this first) [WORKS]
penny.addEventListener('click', () => {
  let result = denominationMultiplier(0.01);
  cid[0][1] += result;
  updateUI();
});
nickel.addEventListener('click', () => {
  let result = denominationMultiplier(0.05);
  cid[1][1] += result;
  updateUI();
});
dime.addEventListener('click', () => {
  let result = denominationMultiplier(0.10);
  cid[2][1] += result;
  updateUI();
});
quarter.addEventListener('click', () => {
  let result = denominationMultiplier(0.25);
  cid[3][1] += result;
  updateUI();
});
one.addEventListener('click', () => {
  let result = denominationMultiplier(1.00);
  cid[4][1] += result;
  updateUI();
});
five.addEventListener('click', () => {
  let result = denominationMultiplier(5.00);
  cid[5][1] += result;
  updateUI();
});
ten.addEventListener('click', () => {
  let result = denominationMultiplier(10.00);
  cid[6][1] += result;
  updateUI();
});
twenty.addEventListener('click', () => {
  let result = denominationMultiplier(20.00);
  cid[7][1] += result;
  updateUI();
});
hundred.addEventListener('click', () => {
  let result = denominationMultiplier(100.00);
  cid[8][1] += result;
  updateUI();
});
//


purchaseBtn.addEventListener("click", checkResults);

updateUI();


// Light/Dark Mode Toggle
const toggleMode = () => {
    var body = document.body;
    body.classList.toggle('dark');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
      const themeToggle = document.getElementById('theme-toggle');
      const body = document.body;
  
  // Check for saved user preference, if any, on initial load
      if (localStorage.getItem('theme') === 'dark') {
          body.classList.add('dark-mode');
          themeToggle.textContent = '🌜';
      } else {
          body.classList.add('light-mode');
          themeToggle.textContent = '🌞';
      }
  
  // Add event listener to the toggle button
      themeToggle.addEventListener('click', () => {
          if (body.classList.contains('light-mode')) {
              body.classList.remove('light-mode');
              body.classList.add('dark-mode');
              themeToggle.textContent = '🌜';
              localStorage.setItem('theme', 'dark');
          } else {
              body.classList.remove('dark-mode');
              body.classList.add('light-mode');
              themeToggle.textContent = '🌞';
              localStorage.setItem('theme', 'light');
          }
      });
  });
  
  
  // Set the initial mode based on user preference
  window.onload = function() {
    var body = document.body;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.add('dark-mode');
    } else {
      body.classList.add('light-mode');
    }
  }
// End Light/Dark Mode Toggle
