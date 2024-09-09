import { FormattedCurrencyPrice } from "@/lib/formattedCurrencyPrice";
const GrandTotal = ({ totalCost, country }) => (
  <div className="border border-blue-300 rounded-lg p-2 flex justify-between items-center">
    <p className="text-xs font-medium">Grand Total</p>
    <p className="text-xs font-medium pl-1">
      <FormattedCurrencyPrice price={totalCost} country={country} />
    </p>
  </div>
);

export default GrandTotal;
