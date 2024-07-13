/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkOut, isChecking } = useCheckout();

  console.log(bookingId);
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => {
        checkOut(bookingId);
      }}
      disabled={isChecking}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
