//component/Cart/Cart.js

import CartItem from "./CartItem";
import GrandTotal from "./GrandTotal";
import DownloadButton from "./DownloadButton";
import ServicesNotSelected from "./ServicesNotSelected";

const Cart = ({
  selectedServices,
  selectedItemAndCost,
  calculateTotalCost,
  country,
  quotationDownloadHandler,
}) => {
  return (
    <div className="sticky top-0 z-10 bg-white rounded-lg p-3">
      <h2 className="text-xl font-semibold mb-6 text-center mt-5">
        Your Cart
      </h2>
      {selectedServices === "Web Development" ||
      selectedServices === "App Development" ? (
        <>
          <p className="text-base text-center font-semibold mb-3">Cost Breakdown</p>
          <ul
            className="space-y-2"
            style={{
              fontSize: "12px",
            }}
          >
            {selectedItemAndCost.map(({ item, price }) => (
              <CartItem
                key={item}  
                item={item}
                price={price}
                country={country}
              />
            ))}
          </ul>
          <div className="mt-2">
            <GrandTotal totalCost={calculateTotalCost()} country={country} />
            <div className="mt-5">
              <DownloadButton onClick={quotationDownloadHandler} />
            </div>
          </div>
        </>
      ) : (
        <ServicesNotSelected />
      )}
    </div>
  );
};

export default Cart;
