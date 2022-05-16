import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteIndex, getIndex } from "../../action/user";
import { Link, useNavigate } from "react-router-dom";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
const token = localStorage.getItem("token");

const swaggerConfig = {
  swagger: "2.0",
  host: "localhost:3000/",
  basePath: "api",
  schemes: ["http"],
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
            name: "key",
            in: "formData",
            description: "Cột dữ liệu unique",
            required: true,
            type: "string",
          },
        ],
        responses: {},
      },
      put: {
        tags: ["Index"],
        summary: "Update data index",
        description: "",
        operationId: "updateindex",
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
    "/searchs/{index}": {
      post: {
        tags: ["Index"],
        summary: "Tìm kiếm record trong Index",
        description: "",
        operationId: "searchRecord",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            name: "index",
            in: "path",
            description: "Tên index",
            required: true,
            type: "string",
          },
          {
            name: "input",
            in: "body",
            description: "Từ khoá tìm kiếm",
            required: true,
            type: "string",
          },
        ],
        responses: {},
        security: [{}],
      },
    },
    "/searchadvanced/{index}": {
      post: {
        tags: ["Index"],
        summary: "Tìm kiếm record trong Index",
        description: "",
        operationId: "searchAdvancedRecord",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            name: "index",
            in: "path",
            description: "Tên index",
            required: true,
            type: "string",
          },
          {
            name: "query",
            in: "body",
            description: "Từ khoá tìm kiếm",
            required: true,
            type: "string",
          },
        ],
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
            name: "index",
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
            name: "index",
            in: "path",
            description: "Tên index",
            required: true,
            type: "string",
          },
          {
            name: "id",
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
            name: "index",
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
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIndex());
  }, [auth.authenticate]);

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [dispatch, auth.authenticate]);
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
