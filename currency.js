const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
        const currencies = Object.keys(data.rates);
        populateDropdown(fromCurrency, currencies);
        populateDropdown(toCurrency, currencies);
    })
    .catch((error) => {
        console.error("Error fetching exchange rates:", error);
        result.textContent = "Failed to load currency data.";
    });

function populateDropdown(dropdown, currencies) {
    currencies.forEach((currency) => {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        dropdown.appendChild(option);
    });
}

convertBtn.addEventListener("click", () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = parseFloat(amount.value);

    if (!from || !to || isNaN(amountValue)) {
        result.textContent = "Please fill in all fields.";
        return;
    }

    fetch(`${API_URL}`)
        .then((response) => response.json())
        .then((data) => {
            const rate = data.rates[to] / data.rates[from];
            const convertedAmount = (amountValue * rate).toFixed(2);
            result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
        })
        .catch((error) => {
            console.error("Error converting currency:", error);
            result.textContent = "Failed to convert currency.";
        });
});
