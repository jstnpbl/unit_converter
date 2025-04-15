// Conversion factors
const conversionFactors = {
  "km-mi": { factor: 0.621371, unit: "miles" },
  "mi-km": { factor: 1 / 0.621371, unit: "kilometers" },
  "kg-lb": { factor: 2.20462, unit: "pounds" },
  "lb-kg": { factor: 1 / 2.20462, unit: "kilograms" },
  "c-f": { formula: (value) => (value * 9) / 5 + 32, unit: "°F" },
  "f-c": { formula: (value) => (value - 32) * 5 / 9, unit: "°C" },
};

// Add event listener to the button
document.getElementById("convert-button").addEventListener("click", convert);

function convert() {
  const type = document.getElementById("conversion-type").value;
  const value = parseFloat(document.getElementById("input-value").value);
  const resultElement = document.getElementById("result");

  // Validate input
  if (isNaN(value)) {
    resultElement.innerText = "❌ Please enter a valid number.";
    return;
  }

  if (value < 0 && (type === "kg-lb" || type === "lb-kg")) {
    resultElement.innerText = "❌ Weight cannot be negative.";
    return;
  }

  let result;
  let unit;

  // Perform conversion
  if (conversionFactors[type].formula) {
    result = conversionFactors[type].formula(value);
    unit = conversionFactors[type].unit;
  } else {
    result = value * conversionFactors[type].factor;
    unit = conversionFactors[type].unit;
  }

  // Display result
  resultElement.innerText = `✅ Result: ${result.toFixed(2)} ${unit}`;
}