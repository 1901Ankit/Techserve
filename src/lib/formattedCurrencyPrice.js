
const extractNumericPrice = (price) => {
    if (typeof price === 'number') {
        // Directly use the number if price is already a number
        return price;
    } else if (typeof price === 'string') {
        // Extract numeric part from the string
        const match = price.match(/[\d,.]+/);
        return match ? parseFloat(match[0].replace(/,/g, '')) : null;
    }
    return null;
};

// Country currency symbols
const countryCurrencySymbols = {
    india: '₹',       // Indian Rupee
    uk: '£',          // British Pound
    australia: 'A$',  // Australian Dollar
    bangladesh: '৳',  // Bangladeshi Taka
    usa: '$',         // US Dollar
    canada: 'C$'      // Canadian Dollar
};

// Format the price according to the country
export function formatPrice(price, country) {
    const normalizedCountry = country.toLowerCase();
    const currencySymbol = countryCurrencySymbols[normalizedCountry] || '$';
    const numericPrice = extractNumericPrice(price);
    return { currencySymbol, price: numericPrice !== null ? numericPrice.toFixed(2) : "N/A" }
};

export function FormattedCurrencyPrice({ price, country }) {
    const { currencySymbol, price:formattedPrice} = formatPrice(price, country)
    return <span>{currencySymbol}{formattedPrice}</span>;
}

