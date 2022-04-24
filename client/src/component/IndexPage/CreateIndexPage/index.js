import React, { useEffect, useState } from "react";
import Layout from "../../../container/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../helper/axios";
import { Button, NavItem } from "react-bootstrap";
import "./style.css";
import { useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
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
        try {
          let response = await axios.post("/data", form);
          console.log(response)
          if (response.status === 200) {
            navigate('/indexs');
          }
        } catch (err) {
          console.log(err);
        }
      }
      createIndex();
    }
  };
  return (
    <Layout>
      <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
        <div style={{ height: "100%" }}>
          <div style={{ padding: "20px 5%", height: "calc(100% - 64px)", overflowY: "scroll" }}>
            <div className="container_index">
              <CDBBreadcrumb>
                <a className="breadcrumb-item" href="/">Home</a>
                <a className="breadcrumb-item" href="/indexs" >Index List</a>
                <li className="breadcrumb-item active">Edit Index</li>
              </CDBBreadcrumb>
              <h4 className="header_indexs">Create Index</h4>
              <Form.Control
                type="text"
                placeholder="Name"
                required
                onChange={(e) => {
                  setIndexName(e.target.value);
                }}
              />
              <br />
              <Form.Control
                size="sm"
                type="file"
                placeholder="Small text"
                onChange={handleUploadFile}
              />
              <br />
              <Button onClick={handleCreateIndex}>Tao index</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
