import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Layout from "../../../container/Layout";
import axios from "../../../helper/axios";
import FileItem from "./component/FileItem";
import "./style.css";
import { CDBBreadcrumb } from "cdbreact";
export const CreateIndexPage = (props) => {
  const navigate = useNavigate();
  const [fileData, setFileData] = useState("");
  const [indexName, setIndexName] = useState("");
  /* useEffect(() => {
        async function getIndex() {
          let response = await axios.get('/indexs');
        }
        getIndex()
      }, []) */
  const handleUploadFile = (e) => {
    setFileData(e.target.files[0]);
  };
  const handleCreateIndex = (e) => {
    if (indexName === "" || fileData === "") {
      e.preventDefault();
    } else {
      async function createIndex() {
        const form = new FormData();
        form.append("indexname", indexName);
        form.append("dataindex", fileData);
        console.log(fileData);
        try {
          let response = await axios.post("/data", form);

          console.log(response);
          if (response.status === 200) {
            navigate("/indexs");
          }
        } catch (err) {
          console.log(2);
          console.log(form);
          console.log(err);
        }
      }
      createIndex();
    }
  };
  return (
    <Layout>
      <CDBBreadcrumb>
        <a className="breadcrumb-item" href="/">
          Home
        </a>
        <a className="breadcrumb-item" href="/indexs">
          Index List
        </a>
        <li className="breadcrumb-item active">Edit Index</li>
      </CDBBreadcrumb>
      <div className="container_index">
        <h4 className="header_indexs">Create Index</h4>

        <label for="file-upload" className="custom-file-upload">
          <i className="bi bi-file-earmark-diff icon-file-plus"></i>
          <p>JSON File</p>
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleUploadFile}
          style={{ width: "80px" }}
        />

        <Form.Control
          type="text"
          placeholder="Ten index"
          required
          onChange={(e) => {
            setIndexName(e.target.value);
          }}
          className="form-input"
        />

        <FileItem name={fileData.name} />

        <Button onClick={handleCreateIndex} className="bt-submit">
          Tạo
        </Button>
      </div>
    </Layout>
  );
};
