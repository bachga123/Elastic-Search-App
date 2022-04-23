import React, { useEffect, useState } from "react";
import Layout from "../../../container/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../helper/axios";
import { Button, NavItem } from "react-bootstrap";
import "./style.css";
import { useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";

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
      <div className="container_index">
        <h4 className="header_indexs">Tao Index</h4>
        <Form.Control
          type="text"
          placeholder="Ten index"
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
        <Button onClick={handleCreateIndex}>Tao index</Button>
      </div>
    </Layout>
  );
};
