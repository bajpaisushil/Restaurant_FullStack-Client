import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cartSlice";
import axios from "axios";
import { setHeaders, url } from "../features/api";

const PayButton = ({ cartItems, total }) => {
  console.log("cartItems=", cartItems);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector((state) => state.auth);

  const handleCheckout = async () => {
    try {
      // Send request to create order
       axios.post(
        `${url}/orders`,
        { data: { customer: user._id, items: cartItems, amount_total: total } },
        setHeaders()
      );
      console.log('hihi');
      dispatch(clearCart());
      nav("/checkout-success");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div>
      <button onClick={() => handleCheckout()}>Check Out</button>
    </div>
  );
};

export default PayButton;
