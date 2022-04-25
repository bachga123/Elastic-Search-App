import React, { useEffect, useState } from "react";
import axios from "../../../helper/axios";
import { Button, NavItem } from "react-bootstrap";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import {
  CDBTableHeader,
  CDBTableBody,
  CDBTable,
  CDBBtn,
  CDBContainer,
  CDBCard,
  CDBCardBody,
  CDBDataTable,
} from "cdbreact";
import { CDBBreadcrumb } from "cdbreact";

export const EditIndexPage = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const { indexId } = params;
  const [textSearchRecord, setTextSearchRecord] = useState("");
  const [idDeleteRecord, setIdDeleteRecord] = useState("");
  const [searchby, setSearchBy] = useState("");
  async function getData() {
    let response = await axios.post(`/data/${indexId}`);
    setData(response.data);
  }
  async function getDataTable() {
    let response = await axios.post(`/data/${indexId}`);
    const data = response.data;
    const columnTable = [
      {
        label: "Id",
        field: "Id",
        width: 100,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
    ];
    data.hits[0] &&
      Object.keys(data.hits[0]._source).map((value) => {
        const temp = {
          label: value,
          field: value,
          width: 100,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": value,
          },
        };
        columnTable.push(temp);
      });

    const rowTable = [{ Id: "Tiger Nixon" }];
    {
      data.hits &&
        data.hits.map((value) => {
          const obj = Object.entries(value._source);
          const objtemp = Object.fromEntries(obj);
          rowTable.push(objtemp);
        });
    }
    const dataTable = {
      columns: columnTable,
      rows: rowTable,
    };
    setDataTable(dataTable);
  }
  useEffect(() => {
    getData();
    getDataTable();
  }, []);
  const handleOnChangeOption = (e) => {
    if (e.target.value) {
      setSearchBy(e.target.value);
    }
  };
  const handleSearchRecord = (e) => {
    if (textSearchRecord === "") {
      e.preventDefault();
    } else {
      async function SearchRecord() {
        let response = await axios.post(`/data/${indexId}`, {
          type: "multi-matching",
          operator: "or",
          [searchby]: textSearchRecord,
        });

        if (response.status === 200) {
          setData(response.data);
        }
      }
      SearchRecord();
    }
  };
  const handleDeleteRecord = (e) => {
    if (idDeleteRecord === "") {
      e.preventDefault();
    } else {
      async function DeleteRecord() {
        let response = await axios.delete(`/data/${indexId}/${idDeleteRecord}`);
        console.log(response);
        if (response.status === 200) {
          alert("xoá thành công");
          setIdDeleteRecord("");
          getData();
        }
      }
      DeleteRecord();
    }
  };
  return (
    <>
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
                gridTemplateColumns: "repeat(1, minmax(200px, 1000px))",
              }}
            >
              <div style={{ display: "auto" }}>
                <CDBBreadcrumb>
                  <a className="breadcrumb-item" href="/">
                    Home
                  </a>
                  <a className="breadcrumb-item" href="/indexs">
                    Index List
                  </a>
                  <li className="breadcrumb-item active">Edit Index</li>
                </CDBBreadcrumb>
                <div className="mt-5 w-100">
                  <h4 className="font-weight-bold mb-3">Edit Field In Index</h4>
                </div>
                <div style={{ display: "flex", margin: "10px" }}>
                  <Form.Control
                    type="text"
                    value={textSearchRecord}
                    onChange={(e) => setTextSearchRecord(e.target.value)}
                    required
                    style={{ width: "20%", height: "40px" }}
                  />
                  <Form.Select
                    aria-label="Default select example"
                    style={{
                      height: "40px",
                      marginLeft: "10px",
                      width: "170px",
                    }}
                    onChange={handleOnChangeOption}
                  >
                    <option>Tìm theo</option>
                    {data.hits
                      ? Object.keys(data.hits[0]._source).map((key) => (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        ))
                      : null}
                  </Form.Select>

                  <Button className="button_index" onClick={handleSearchRecord}>
                    Tìm bản ghi
                  </Button>
                </div>

                <div style={{ display: "flex", margin: "10px" }}>
                  <>
                    <Form.Control
                      type="text"
                      value={idDeleteRecord}
                      onChange={(e) => setIdDeleteRecord(e.target.value)}
                      placeholder="ID bản ghi"
                      required
                      style={{ width: "50%" }}
                    />
                    <br />
                  </>
                  <Button className="button_index" onClick={handleDeleteRecord}>
                    {" "}
                    Xoá bản ghi
                  </Button>
                </div>
              </div>
              {/* co length moi render */}
              {data.hits !== undefined ? (
                <h4>Tổng cộng có {data.hits.length} bản ghi</h4>
              ) : null}
              <div className="row">
                <div className="col-sm">
                  {/* <CDBTable responsive className={{ display: "80%" }}>
                    <CDBTableHeader color="dark">
                      {data.hits !== undefined ? (
                        <tr>
                          <th>Id</th>
                          {Object.keys(data.hits[0]._source).map((value) => (
                            <th>{value}</th>
                          ))}
                          <th>Action</th>
                        </tr>
                      ) : null}
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
                      </tr>
                      {data.hits !== undefined ? (
                        data.hits.map((value) =>
                          <tr>
                            <td>{value._id}</td>
                            {Object.values(value._source).map(dat =>
                              <td>{dat}</td>
                            )}
                            <td>
                              <button className="btn btn-outline-primary" >Edit</button>
                              <button className="btn btn-outline-danger" style={{ margin: "4px" }}>Remove</button>
                            </td>
                          </tr>
                        )
                      ) : null}
                    </CDBTableBody>
                  </CDBTable> */}
                  <CDBCard>
                    <CDBCardBody>
                      <CDBDataTable
                        striped
                        bordered
                        hover
                        entriesOptions={[5, 20, 25]}
                        entries={5}
                        pagesAmount={4}
                        data={dataTable}
                        materialSearch={true}
                      />
                    </CDBCardBody>
                  </CDBCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
