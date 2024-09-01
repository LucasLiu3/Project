import Header from "../../components/customers/Header";

function Home() {
  // const { role } = useSelector((state) => state.auth);
  // if (role === "seller") return <Navigate to="/seller/dashboard" replace />;
  // else if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  // else return <Navigate to="/login" replace />;

  return (
    <div className="w-full">
      <Header></Header>
    </div>
  );
}

export default Home;
