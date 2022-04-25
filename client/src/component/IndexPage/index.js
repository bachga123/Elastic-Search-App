import React, { useEffect, useState } from "react";

import axios from "../../helper/axios";
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
import { Link } from "react-router-dom";
import { CDBBreadcrumb } from "cdbreact";
import "./style.css";
export const IndexPage = (props) => {
  const [indexs, setIndexs] = useState([]);
  const [nameDeleteIndex, setNameDeleteIndex] = useState("");
  useEffect(() => {
    getIndex();
  }, []);
  async function getIndex() {
    let response = await axios.get("/indexs");
    setIndexs(response.data);
  }
  const handleDeleteIndex = (e) => {
    setNameDeleteIndex(e.target.value);
    if (nameDeleteIndex === "") {
      e.preventDefault();
    } else {
      async function DeleteIndex() {
        let response = await axios.delete(`/${nameDeleteIndex}`);
        console.log(response);
        if (response.status === 200) {
          alert("xoá thành công");
          setNameDeleteIndex("");
          getIndex();
        }
      }
      DeleteIndex();
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
                  <tr>
                    <td>00</td>
                    <td>
                      <a href={`/index/School`}>Example Index</a>
                    </td>
                    <td key="school">School</td>
                    <td>#</td>
                    <td>#</td>
                    <td>#</td>
                  </tr>
                  {indexs &&
                    indexs.map(
                      ({ id, index, status, docs_count, store_size }) => (
                        <tr>
                          <td key={id}>{id}</td>
                          <td>
                            <a href={`/index/${index}`}>{index}</a>
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
                    )}
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
