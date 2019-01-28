export function ready(cb) {
    document.onreadystatechange = function () {
        if(document.readyState === 'interactive'){
            cb();
        }
    }
}

export function calculateBillTotal(totalTip, billAmount)
{
    return totalTip + billAmount;
}

export function calculateTipTotal(tipPercentageAsDecimal, billAmount)
{
    return tipPercentageAsDecimal * billAmount;
}

export function setTipAmountInStorage(tipAmountText)
{
    return localStorage.setItem('tip', tipAmountText)
}

export function getTipAmountInStorage(tipAmountText)
{
    let storedTip = localStorage.getItem('tip', tipAmountText);
    return storedTip === null? '20%' : storedTip;
}