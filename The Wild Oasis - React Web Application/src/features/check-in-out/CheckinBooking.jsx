/* eslint-disable no-unused-vars */
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useEffect, useState } from "react";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBookingId } from "../bookings/useGetBookingId";
import { useCheckin } from "./useCheckin";
import { useGetSettings } from "../settings/useGetSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [addBreakFast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useGetBookingId();
  const { isChecking, checkIn } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useGetSettings();

  useEffect(() => setConfirmedPaid(booking?.isPaid ?? false), [booking]);

  const moveBack = useMoveBack();

  if (isLoading || isLoadingSettings) return <Spinner></Spinner>;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const addOptionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmedPaid) return;

    if (addBreakFast) {
      checkIn({
        id: bookingId,
        newCheckin: {
          isPaid: true,
          status: "checked-in",
          hasBreakfast: true,
          extrasPrice: addOptionalBreakfastPrice,
          totalPrice: addOptionalBreakfastPrice + totalPrice,
        },
      });
    } else {
      checkIn({
        id: bookingId,
        newCheckin: { isPaid: true, status: "checked-in" },
      });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={() => {
              setAddBreakfast((add) => !add), setConfirmedPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for{" "}
            {formatCurrency(addOptionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmedPaid}
          onChange={() => setConfirmedPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmedPaid || isChecking}
        >
          I confirm that {guests.fullName} has paid the toal amount of{" "}
          {addBreakFast
            ? formatCurrency(totalPrice + addOptionalBreakfastPrice)
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmedPaid || isChecking}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
