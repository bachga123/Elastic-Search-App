import { CDBBtn, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../container/Layout";
import axios from "../../helper/axios";
import "./style.css";

export const IndexPage = (props) => {
  const [indexs, setIndexs] = useState([]);
  useEffect(() => {
    async function getIndex() {
      let response = await axios.get("/indexs");
      setIndexs(response.data);
    }
    getIndex();
  }, []);
  return (
    <Layout>
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
                gridTemplateColumns: "repeat(1, minmax(200px, 700px))",
              }}
            >
              <div className="mt-5 w-100">
                <h4 className="font-weight-bold mb-3">Index List</h4>
                <Link to="/create-index">
                  <CDBBtn color="secondary" className="md-2" to="">
                    Add index
                  </CDBBtn>
                </Link>
              </div>
              <CDBTable responsive>
                <CDBTableHeader color="dark">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Uuid</th>
                    <th>Store size</th>
                  </tr>
                </CDBTableHeader>
              </CDBTable>
              <CDBTableBody>
                {/* {indexs.map(({ id, index, uuid, store_size }) => (
                    <tr>
                      <td>{id}</td>
                      <td>
                        <a href={`/index/${index}`}>{index}</a>
                      </td>
                      <td key={uuid}>{uuid}</td>
                      <td>{store_size}</td>
                    </tr>
                  ))} */}
              </CDBTableBody>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
