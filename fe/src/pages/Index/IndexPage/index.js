import React, { useEffect, useState } from "react";
import axios from "../../../helper/axios";
import "./style.css";
import { Button, Form, Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import {
  CDBBtn,
  CDBLink,
  CDBNavLink,
  CDBTable,
  CDBTableBody,
  CDBTableHeader,
} from "cdbreact";
import FileItem from './index_file'
import { Link, useNavigate } from "react-router-dom";
import { CDBBreadcrumb } from "cdbreact";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteIndex, getIndex } from "../../../action/user";
import FormFileInput from "react-bootstrap/esm/FormFileInput";

const IndexPage = (props) => {
  const navigate = useNavigate();
  const [indexs, setIndexs] = useState([]);
  const [show, setShow] = useState(false);
  const [fileData, setFileData] = useState("");
  const [indexName, setIndexName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nameDeleteIndex, setNameDeleteIndex] = useState("");
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
  /*   async function getIndex() {
    let response = await axios.get("/api/indexs");
    setIndexs(response.data);
  } */
  const handleDeleteIndex = (e) => {

      dispatch(deleteIndex(e.target.value));
    
  };

  //Insert data to exists index
  const handleUploadFile = (e) => {
    setFileData(e.target.files[0]);
  };
  const handleCreateIndex = (e) => {
    setIsLoading(true);
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
          setIsLoading(false);
        } catch (err) {
          console.log(2);
          console.log(form);
          console.log(err);
        }
      }
      createIndex();
    }
  };

  const handleShow=()=>{
    setShow(true)
  }
  const showModal=()=>{

  }
  const handleClose=()=>{
    setShow(false)
  }
  return (
    <>
      <CDBBreadcrumb>
        <a className="breadcrumb-item" href="/">
          Home
        </a>
        <a className="breadcrumb-item active" href="/indexs">
          Index List
        </a>
      </CDBBreadcrumb>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <div style={{ height: "100%" }}>
          <div
            style={{
              padding: "20px 5%",
              height: "calc(100% - 64px)",
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                display: "grid",
                //gridTemplateColumns: "repeat(1, minmax(200px, 700px))",
              }}
            >
              <div className="mt-5 w-100">
                <h1 className="font-weight-bold mb-3">Index List</h1>
                <a
                  color="secondary"
                  className=" btn-create-index"
                  href="/create-index"
                  style={{ height: "35px", boxSizing: "content-box" }}
                >
                  Add index
                </a>
              </div>
              <CDBTable
                responsive={true}
                striped={true}
                className="table-index"
              >
                <CDBTableHeader>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Docs count</th>
                    <th>Store size</th>
                    <th>Action</th>
                  </tr>
                </CDBTableHeader>
                <CDBTableBody>
                  {user.index.length !== 0 ? (
                    user.index.map(
                      ({ id, index, status, docs_count, store_size }) => (
                        <tr>
                          <td key={id}>{id}</td>
                          <td>
                            <Link to={`/index/${index}`}>{index}</Link>
                          </td>
                          <td>{status}</td>
                          <td>{docs_count}</td>
                          <td>{store_size}</td>
                          <td>
                            <Button
                              className="btn-primary"
                              onClick={handleShow}
                            >
                              Add Data
                            </Button>
                            <Button
                              className="btn-danger"
                              display={{ margin: "4px" }}
                              onClick={(e) => {
                                handleDeleteIndex(e);
                              }}
                              value={index}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <div>
                      <h8>Bạn chưa có index.</h8>
                      <a href="create-index">Tạo index</a>
                    </div>
                  )}
                </CDBTableBody>
              </CDBTable>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title onClick={()=>setShow(true)}>Add data to index</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {/* <div>
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


          <Button
            onClick={handleCreateIndex}
            className="bt-submit"
            disabled={isLoading}
          >
            Tạo
          </Button>
        </div> */}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-file-earmark-diff icon-file-plus"></i>
                <p>JSON File</p>
              </Form.Label>


              <FormFileInput
                id="file-upload"
                type="file"
                onChange={handleUploadFile}
                style={{ width: "80px" }}>

              </FormFileInput>
              <FileItem name={fileData.name}></FileItem>
            </Form.Group>



          </Form>
        </Modal.Body>


        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IndexPage;
