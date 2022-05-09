import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
const token = localStorage.getItem("token");

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
          {
            name: "unique",
            in: "formData",
            description: "Cột dữ liệu unique",
            required: true,
            type: "string",
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
    "/datas/{index}": {
      get: {
        tags: ["Index"],
        summary: "Danh sách record trong Index",
        description: "",
        operationId: "getRecords",
        consumes: ["multipart/form-data"],
        produces: ["application/json"],
        parameters: [
          {
            name: "indexname",
            in: "path",
            description: "Tên index",
            required: true,
            type: "string",
          },
        ],
        responses: {},
        security: [{}],
      },
    },

    "/{index}/{id}": {
      delete: {
        tags: ["Index"],
        summary: "Xóa record trong index",
        description: "",
        operationId: "deleteRecord",
        consumes: ["multipart/form-data"],
        produces: ["application/json"],
        parameters: [
          {
            name: "indexname",
            in: "path",
            description: "Tên index",
            required: true,
            type: "string",
          },
          {
            name: "recordID",
            in: "path",
            description: "Tên index",
            required: true,
            type: "string",
          },
        ],
        responses: {},
        security: [{}],
      },
    },
    "/{index}": {
      delete: {
        tags: ["Index"],
        summary: "Xóa index",
        description: "",
        operationId: "deleteIndex",
        consumes: ["multipart/form-data"],
        produces: ["application/json"],
        parameters: [
          {
            name: "indexname",
            in: "path",
            description: "Tên index",
            required: true,
            type: "string",
          },
        ],
        responses: {},
        security: [{}],
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
