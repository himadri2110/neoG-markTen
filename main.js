let bill, cash, diff=0, i, j;

let cashInputDiv = document.querySelector(".cashDiv");
let nextBtn = document.querySelector("#next");
let calculateBtn = document.querySelector("#calculate");

let errorDiv = document.querySelector(".error");
let table = document.querySelector("table");
let amountDiv = document.querySelector('div.hidden');
let amount = document.querySelector(".amount");

let notesArray = [2000, 500, 100, 20, 10, 5, 1,];
let countArray = [0, 0, 0, 0, 0, 0, 0];

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let billInput = document.querySelector("#bill");

    if( billInput.value === '' || billInput.value <= 0 ) {
        errorDiv.innerText = 'Error: Please enter the value appropriately.';

        amountDiv.classList.add('hidden');

        countArray = countArray.map(num => 0);
        showOutput();
    } else {
        bill = parseInt(billInput.value);

        errorDiv.innerText = '';

        cashInputDiv.style.display = 'block';
        calculateBtn.style.display = 'block';
    }
});

calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let cashInput = document.querySelector("#cash");
    let billInput = document.querySelector("#bill");

    countArray = countArray.map(num => 0);
    showOutput();

    if( cashInput.value === ''  || cashInput.value <= 0  || billInput.value === '' || billInput.value <= 0 ) {
        errorDiv.innerText = 'Error: Please enter the value appropriately.';

        amountDiv.classList.add('hidden');
        
    } else {
        bill = parseInt(billInput.value);
        cash = parseInt(cashInput.value);
    
        errorDiv.innerText = '';

        amountDiv.classList.add('hidden');

        if( cash === bill ) {
            errorDiv.innerText = 'No amount to be returned';
        } else if ( cash < bill ) {
            errorDiv.innerText = 'Error: Cash given cannot be less than bill amount';
        } else {
            calculateChange();
        }    
    }
});

function calculateChange() {

    diff = parseInt(cash) - parseInt(bill);

    amount.innerText = `Rs. ${diff}`;

    for( i = 0; i < notesArray.length; i++ ) {

        if( diff >= notesArray[i] ) {
            countArray[i] = Math.floor( diff / notesArray[i] );
            diff -= countArray[i] * notesArray[i];
        } else {
            countArray[i] = 0;
        }
    }

    showOutput();
    amountDiv.classList.remove('hidden');
}

function showOutput() {
    let tbody = table.tBodies[0];
    
    for( j=0; j<countArray.length; j++ ) {
        tbody.rows[j+1].cells[1].innerHTML = countArray[j];
    }
    
}