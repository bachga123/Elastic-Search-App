import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../container/Layout";
import axios from "../../../helper/axios";
import "./style.css";
export const EditIndexPage = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const { indexId } = params;
  const [textSearchRecord, setTextSearchRecord] = useState("");
  const [idDeleteRecord, setIdDeleteRecord] = useState("");
  const [searchby, setSearchBy] = useState("");
  async function getData() {
    let response = await axios.post(`/data/${indexId}`);
    setData(response.data);
  }
  useEffect(() => {
    getData();
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
    <Layout>
      <div className="container_index">
        <h4 className="header_indexs">Quản lý index </h4>
        <div className="container_data">
          <div className="form_manager">
            <div className="search_index">
              <Form.Control
                type="text"
                value={textSearchRecord}
                onChange={(e) => setTextSearchRecord(e.target.value)}
                required
                style={{ width: "40%", height: "40px" }}
              />
              <Form.Select
                aria-label="Default select example"
                style={{ height: "40px", marginLeft: "10px", width: "170px" }}
                onChange={handleOnChangeOption}
              >
                <option>Tìm theo</option>
                {data[1]
                  ? Object.keys(data[1]._source).map((key) => (
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
            <div className="container_delete_record">
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
          <div className="container_data_index">
            <h4>Tổng cộng có {data.length} bản ghi</h4>
            <ul className="list_data">
              {data.map((value) => (
                <li key={value._id}>{JSON.stringify(value)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};
