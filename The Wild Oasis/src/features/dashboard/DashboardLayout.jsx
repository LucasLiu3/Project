/* eslint-disable no-unused-vars */
import styled from "styled-components";

import { useRecentBookings } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useGetCabin } from "../cabins/useGetCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { cabins, isLoading: isCabinLoading } = useGetCabin();

  const { bookings, isLoading: isBookingLoading } = useRecentBookings();

  const {
    stays,
    confirmedStays,
    isLoading: isStayLoading,
    numDays,
  } = useRecentStays();

  if (isBookingLoading || isStayLoading || isCabinLoading)
    return <Spinner></Spinner>;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numNights={numDays}
        cabinCount={cabins.length}
      />

      <TodayActivity></TodayActivity>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
