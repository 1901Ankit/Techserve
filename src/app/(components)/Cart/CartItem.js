import { FormattedCurrencyPrice } from "@/lib/formattedCurrencyPrice";
const CartItem = ({ item, price, country }) => (
  <li className="flex justify-between items-center">
    <span className="text-sm">{item}</span>
    <FormattedCurrencyPrice price={price} country={country} />
  </li>
);

export default CartItem;
