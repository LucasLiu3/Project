import { PropagateLoader } from "react-spinners";

function NewButton({ loader, children }) {
  const overRideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <button
      disabled={loader}
      className="bg-blue-600 w-full hover:bg-blue-700 text-white rounded-md px-7 py-2 mb-4"
    >
      {loader ? (
        <PropagateLoader color="#ffffff" cssOverride={overRideStyle} />
      ) : (
        children
      )}
    </button>
  );
}

export default NewButton;
