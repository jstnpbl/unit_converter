// Conversion factors and units
const conversionData = {
  "km-mi": { factor: 0.621371, unit: "miles", inputUnit: "km" },
  "mi-km": { factor: 1 / 0.621371, unit: "kilometers", inputUnit: "mi" },
  "m-ft": { factor: 3.28084, unit: "feet", inputUnit: "m" },
  "ft-m": { factor: 1 / 3.28084, unit: "meters", inputUnit: "ft" },
  "kg-lb": { factor: 2.20462, unit: "pounds", inputUnit: "kg" },
  "lb-kg": { factor: 1 / 2.20462, unit: "kilograms", inputUnit: "lb" },
  "g-oz": { factor: 0.035274, unit: "ounces", inputUnit: "g" },
  "oz-g": { factor: 1 / 0.035274, unit: "grams", inputUnit: "oz" },
  "c-f": { formula: (value) => (value * 9) / 5 + 32, unit: "°F", inputUnit: "°C" },
  "f-c": { formula: (value) => (value - 32) * 5 / 9, unit: "°C", inputUnit: "°F" },
  "c-k": { formula: (value) => value + 273.15, unit: "K", inputUnit: "°C" },
  "k-c": { formula: (value) => value - 273.15, unit: "°C", inputUnit: "K" },
  "m2-ft2": { factor: 10.7639, unit: "ft²", inputUnit: "m²" },
  "ft2-m2": { factor: 1 / 10.7639, unit: "m²", inputUnit: "ft²" },
  "l-gal": { factor: 0.264172, unit: "gallons", inputUnit: "L" },
  "gal-l": { factor: 1 / 0.264172, unit: "liters", inputUnit: "gal" },
  "kph-mph": { factor: 0.621371, unit: "mph", inputUnit: "kph" },
  "mph-kph": { factor: 1 / 0.621371, unit: "kph", inputUnit: "mph" }
};

// DOM Elements
const conversionType = document.getElementById("conversion-type");
const inputValue = document.getElementById("input-value");
const convertButton = document.getElementById("convert-button");
const clearButton = document.getElementById("clear-button");
const resultElement = document.getElementById("result");
const copyButton = document.getElementById("copy-button");
const themeToggle = document.getElementById("theme-toggle");
const inputUnit = document.getElementById("input-unit");

// Theme handling
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

// Initialize theme
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

// Event Listeners
themeToggle.addEventListener("click", toggleTheme);
convertButton.addEventListener("click", convert);
clearButton.addEventListener("click", clear);
copyButton.addEventListener("click", copyResult);
inputValue.addEventListener("input", convert);
conversionType.addEventListener("change", updateInputUnit);

// Update input unit label when conversion type changes
function updateInputUnit() {
  const type = conversionType.value;
  inputUnit.textContent = conversionData[type].inputUnit;
}

// Clear function
function clear() {
  inputValue.value = "";
  resultElement.textContent = "";
}

// Copy result function
function copyResult() {
  const resultText = resultElement.textContent;
  if (resultText) {
    navigator.clipboard.writeText(resultText.replace("✅ Result: ", ""));
    copyButton.textContent = "✓";
    setTimeout(() => {
      copyButton.textContent = "📋";
    }, 2000);
  }
}

// Convert function
function convert() {
  const type = conversionType.value;
  const value = parseFloat(inputValue.value);
  const data = conversionData[type];

  // Validate input
  if (isNaN(value)) {
    resultElement.textContent = "❌ Please enter a valid number.";
    return;
  }

  // Special validation for temperature
  if (type.includes("k") && value < 0) {
    resultElement.textContent = "❌ Temperature cannot be below absolute zero (0K).";
    return;
  }

  // Special validation for weight
  if ((type.includes("kg") || type.includes("lb") || type.includes("g") || type.includes("oz")) && value < 0) {
    resultElement.textContent = "❌ Weight cannot be negative.";
    return;
  }

  let result;
  if (data.formula) {
    result = data.formula(value);
  } else {
    result = value * data.factor;
  }

  // Display result
  resultElement.textContent = `✅ Result: ${result.toFixed(2)} ${data.unit}`;
}

// Initialize input unit label
updateInputUnit();

// Add keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    convert();
  }
});