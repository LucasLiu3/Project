import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import BookingIndividual from "./pages/BookingIndividual";
import Checkin from "./pages/Checkin";

import ProtectRoute from "./ui/ProtectRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, //设定这个时间，fetch的data会自动根据设定时间长度进行refetch(如果后台数据有跟新的话)
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                //这个是对整个登录方式进行的保护，意思是只有登录以后才能看到下面路由的内容
                <ProtectRoute>
                  <AppLayout />
                </ProtectRoute>
              }
            >
              <Route
                index
                element={<Navigate replace to="dashboard" />}
              ></Route>
              <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
              <Route path="bookings" element={<Bookings></Bookings>}></Route>
              <Route
                path="bookings/:bookingId"
                element={<BookingIndividual></BookingIndividual>}
              ></Route>
              <Route
                path="checkin/:bookingId"
                element={<Checkin></Checkin>}
              ></Route>
              <Route path="cabins" element={<Cabins></Cabins>}></Route>
              <Route path="settings" element={<Settings></Settings>}></Route>
              <Route path="account" element={<Account></Account>}></Route>
              <Route path="users" element={<Users></Users>}></Route>
            </Route>

            <Route path="login" element={<Login></Login>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: { duration: 4000 },
            style: {
              font: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        ></Toaster>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
