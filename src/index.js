import './styles.css';
import { calculateBillTotal, calculateTipTotal, getTipAmountInStorage, ready, setTipAmountInStorage } from "./utils";

let tipAmount =.10;
let billAmount = 0;
let totalTip = 0;
let totalBill = 0;
let tipAmountText = '20%';

let radioButtons;
let percentageLabels;

function init() {
    
    radioButtons = document.querySelectorAll("input[type='radio']");
    percentageLabels = document.querySelectorAll(".tip-percentage");

    tipAmountText = getTipAmountInStorage()

    initRadioButtons();

    initInput();

    setTotals();
}

function initRadioButtons(){

    radioButtons.forEach(function(tipButton){

        if(tipButton.nextSibling.textContent.trim() === tipAmountText)
        {
            tipButton.disabled = true;
            tipButton.parentElement.classList.add('active');

        }
        else
        {
            tipButton.disabled=false;
            tipButton.parentElement.classList.remove('active');
        }

        tipButton.addEventListener('click',handleTipButtonClick);
    });

}

function initInput() {
    let inputBillAmount = document.getElementById('inputBillAmount');
    inputBillAmount.addEventListener('keyup', validateBillInput)
    inputBillAmount.value = 0;
}

function handleTipButtonClick(evt) {
    
    let selectedButton = this;

    tipAmountText = selectedButton.nextSibling.textContent.trim();
    
    setTipAmountInStorage(tipAmountText);
    
    setTipAmount();

    this.disabled = true;
    this.parentElement.classList.add('active');

    resetUnusedButtons(this.id)

    calculateAmount();

    setTotals();
}

function resetUnusedButtons(currentButtonId)
{
    
    radioButtons.forEach(function (button) {
        if (button.id !== currentButtonId){

            button.disabled = false;
            button.parentElement.classList.remove('active');

        }
    });

}

function validateBillInput() {
    let inputBillAmount = document.getElementById('inputBillAmount');
    billAmount = parseFloat(inputBillAmount.value);

    if(isNaN(billAmount) || billAmount < 0)
    {
        billAmount = 0;
        totalTip = 0;
        totalBill = 0;
        inputBillAmount.classList.add('border-danger');
        setTotals();
    }
    else{
        inputBillAmount.classList.remove('border-danger');
        calculateAmount();
        setTotals();
    }

}

function calculateAmount(){

    totalTip = calculateTipTotal(tipAmount, billAmount);
    totalBill = calculateBillTotal(totalTip, billAmount);

}

function setTotals(){

    percentageLabels.forEach(function (tipLabel) {
        tipLabel.textContent =  tipAmountText;
    });

    let billAmountLabel = document.getElementById('billAmountLabel');
    billAmountLabel.textContent = 'Bill Amount: ' + billAmount.toFixed(2);
    let totalTipLabel = document.getElementById('totalTipLabel');
    totalTipLabel.textContent = 'Amount to Tip: ' + totalTip.toFixed(2);
    let totalBillLabel = document.getElementById('billTotalLabel');
    totalBillLabel.textContent = 'Total to be Paid: ' + totalBill.toFixed(2);
}

function setTipAmount() {
    switch (tipAmountText) {
        case '10%':
            tipAmount = .1;
            break;
        case '15%':
            tipAmount = .15;
            break;
        case '20%':
            tipAmount = .2;
            break;
        default:
            tipAmount = .1;
            break;
    }
}

ready(init)