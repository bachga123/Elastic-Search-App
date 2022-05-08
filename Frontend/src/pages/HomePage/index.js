import React from "react";
import AlertCT from "../../components/AlertCT";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swaggerJson from "../../swagger.json";
const token = localStorage.getItem("token");

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Số lượng index tạo trong tháng",
    },
  },
};

const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Kích thước index",
    },
  },
};

const labels = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const labels2 = [
  "event 1",
  "event 2",
  "event 3",
  "event 4",
  "event 5",
  "event 6",
  "event 7",
  "event 8",
  "event 9",
  "event 10",
  "event 11",
  "event 12",
];
const data = {
  labels,
  datasets: [
    {
      label: "Số lượng index đã tạo",
      data: [10, 21, 33, 14, 45, 26, 17, 58, 29, 11, 21, 52],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const data2 = {
  labels,
  datasets: [
    {
      label: "Kích thước index",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      backgroundColor: "rgba(44, 121, 11, 0.5)",
    },
  ],
};

const swaggerConfig = {
  swagger: "2.0",
  host: "localhost:3000/",
  basePath: "api",
  schemes: ["https", "http"],
  paths: {
    "/index": {
      post: {
        tags: ["Index"],
        summary: "Tạo mới index",
        description: "",
        operationId: "createIndex",
        consumes: ["multipart/form-data"],
        produces: ["application/json"],
        parameters: [
          {
            name: "indexname",
            in: "formData",
            description: "Tên index",
            required: true,
            type: "string",
          },
          {
            name: "dataindex",
            in: "formData",
            description: "file to upload",
            required: true,
            type: "file",
          },
        ],
        responses: {},
      },
    },
    "/indexs": {
      get: {
        tags: ["Index"],
        summary: "Lấy danh sách index",
        description: "",
        operationId: "getIndexs",
        consumes: ["multipart/form-data"],
        produces: ["application/json"],
        parameters: [],
        responses: {},
        security: [{}],
      },
    },
  },

  definitions: {
    User: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        email: {
          type: "string",
        },
        fullname: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    Index: {
      type: "object",
      properties: {
        userId: {
          type: "string",
        },
        nameIndex: {
          type: "string",
        },
      },
      xml: {
        name: "User",
      },
    },
  },
};

function HomePage(props) {
  console.log(token);
  return (
    <>
      <h1>Danh sách API</h1>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          paddingBottom: "300px",
        }}
      >
        {/* <Line options={options} data={data} />

        <Bar options={options2} data={data2} /> */}

        <SwaggerUI
          spec={swaggerConfig}
          requestInterceptor={(req) => {
            req.headers.Authorization = `Bearer ${token}`;
            return req;
          }}
        />
      </div>
    </>
  );
}

export default HomePage;
