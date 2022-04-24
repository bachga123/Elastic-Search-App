import React from "react";
import Sidebar from "../../assets/sidebar";
import Header from "../Header";
import "./style.css";
export default function Layout(props) {
  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   legend: { display: false },
  //   scales: {
  //     xAxes: [
  //       {
  //         ticks: {
  //           display: false,
  //         },
  //       },
  //     ],
  //     yAxes: [
  //       {
  //         gridLines: {
  //           display: false,
  //         },
  //         ticks: {
  //           display: false,
  //         },
  //       },
  //     ],
  //   },
  // };
  return (
    <div className="dashboard d-flex">
      <div>
        <Sidebar />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <Header />
        <div style={{ height: "100%" }}>{props.children}</div>
      </div>
    </div>
  );
}
