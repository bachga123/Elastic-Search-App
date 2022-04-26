import React, { useEffect, useState } from "react";
import axios from "../../../helper/axios";
import "./style.css";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import {
  CDBBtn,
  CDBLink,
  CDBNavLink,
  CDBTable,
  CDBTableBody,
  CDBTableHeader,
} from "cdbreact";
import { Link ,useNavigate} from "react-router-dom";
import { CDBBreadcrumb } from "cdbreact";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteIndex, getIndex } from "../../../action/user";
const IndexPage = (props) => {
  const [indexs, setIndexs] = useState([]);
  const [nameDeleteIndex, setNameDeleteIndex] = useState("");
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const token=localStorage.getItem('token')
  const dispatch = useDispatch()
  const navigate=useNavigate()
  useEffect(() => {
    dispatch(getIndex());
  }, [auth.authenticate]);
  useEffect(()=>{
    if(!token){
      navigate('/sign-in')
    }
  },[dispatch,auth.authenticate])
/*   async function getIndex() {
    let response = await axios.get("/api/indexs");
    setIndexs(response.data);
  } */
  const handleDeleteIndex = (e) => {
    setNameDeleteIndex(e.target.value);
    if (nameDeleteIndex === "") {
      e.preventDefault();
    } else {
      dispatch(deleteIndex())
    }
  };

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
                  style={{height:"50px",boxSizing:"content-box"}}
                >
                  <i class="bi bi-plus"></i>
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
                  
                  {user.index.length!==0 ?
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
                              className="btn-danger"
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
                    ):<div>
                      <h8>Bạn chưa có index.</h8><a href="create-index">Tạo index</a></div>}
                </CDBTableBody>
              </CDBTable>
            </div>
          </div>
        </div>
      </div>
      <form name="deleteIndexForm" class="mt-4" method="POST"></form>
    </>
  );
};

export default IndexPage;
