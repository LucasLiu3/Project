import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

function DashoboardChart({ role }) {
  const { allOrder } = useSelector((state) => state.dashboard);

  const monthlyOrders = Array(12).fill(0);

  allOrder.forEach((each) => {
    const [day, month, year] = each.data.split("/");
    const date = new Date(`${year}-${month}-${day}`);

    const monthIndex = date.getMonth();

    monthlyOrders[monthIndex] += 1;
  });

  const sales = Array(12).fill(0);

  allOrder.forEach((each) => {
    const [day, month, year] = each.data.split("/");
    const date = new Date(`${year}-${month}-${day}`);

    const monthIndex = date.getMonth();

    sales[monthIndex] += each.price;
  });

  const revenue = Array(12).fill(0);

  allOrder.forEach((each) => {
    const [day, month, year] = each.data.split("/");
    const date = new Date(`${year}-${month}-${day}`);

    const monthIndex = date.getMonth();

    if (each.delivery_status === "pending" && each.payment_status === "paid") {
      revenue[monthIndex] += each.price;
    }
  });

  console.log(monthlyOrders);
  const state = {
    series: [
      {
        name: "Orders",
        data: monthlyOrders,
      },
      {
        name: "Revenue",
        data: revenue,
      },
      {
        name: `${role === "admin" ? "Sellers" : "Sales"}`,
        data: sales,
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#000",
      },
      dataLabels: {
        enabled: false,
      },
      strock: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#000",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apl",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: { horizontal: true },
            },
            chart: { height: "550px" },
          },
        },
      ],
    },
  };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="bar"
      height={350}
    />
  );
}

export default DashoboardChart;
