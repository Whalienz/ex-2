const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

let exchangeRates = {};

function setLoading(isLoading) {
    convertBtn.disabled = isLoading;
    convertBtn.textContent = isLoading ? "Loading..." : "Convert";
    if (isLoading) {
        convertBtn.style.opacity = "0.7";
        convertBtn.style.cursor = "wait";
    } else {
        convertBtn.style.opacity = "1";
        convertBtn.style.cursor = "pointer";
    }
}

function showResult(text, isError = false) {
    result.textContent = text;
    result.classList.remove('show');
    result.style.color = isError ? "#e53e3e" : "#2d3748";
    void result.offsetWidth;
    result.classList.add('show');
}

async function initializeCurrencies() {
    try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();

        exchangeRates = data.rates;
        const currencies = Object.keys(exchangeRates);

        fromCurrency.innerHTML = '';
        toCurrency.innerHTML = '';

        populateDropdown(fromCurrency, currencies);
        populateDropdown(toCurrency, currencies);

        fromCurrency.value = "USD";
        toCurrency.value = "THB";

        setLoading(false);
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        showResult("Failed to load currency data. Please try again later.", true);
        setLoading(false);
    }
}

function populateDropdown(dropdown, currencies) {
    currencies.forEach((currency) => {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        dropdown.appendChild(option);
    });
}

function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = parseFloat(amount.value);

    if (!from || !to || isNaN(amountValue)) {
        showResult("Please fill in all fields correctly.", true);
        return;
    }

    if (!exchangeRates[from] || !exchangeRates[to]) {
        showResult("Invalid currency selection.", true);
        return;
    }

    try {
        const rate = exchangeRates[to] / exchangeRates[from];
        const convertedAmount = (amountValue * rate).toFixed(2);
        const formattedAmount = new Intl.NumberFormat().format(convertedAmount);
        showResult(`${amountValue} ${from} = ${formattedAmount} ${to}`);
    } catch (error) {
        console.error("Error converting currency:", error);
        showResult("Failed to convert currency. Please try again.", true);
    }
}

convertBtn.addEventListener("click", convertCurrency);
amount.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        convertCurrency();
    }
});

initializeCurrencies();