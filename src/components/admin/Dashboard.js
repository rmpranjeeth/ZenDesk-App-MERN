import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import { CommonContext } from "../../App";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";

function Dashboard() {
  let [count, SetCount] = useState({ open: 0, inProgress: 0, closed: 0 });
  let commonContext = useContext(CommonContext);

  let [data, setData] = useState([]);
  let [stage, setStage] = useState("");

  let navigate = useNavigate();

  let loadCount = async () => {
    let token = sessionStorage.getItem("token");
    let res = await axios.get(`${commonContext.apiurl}/issues-count`,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.statusCode === 200) SetCount(res.data);
  };

  useEffect(() => {
    loadCount();
  }, []);

  let loadStorage = async (stage) => {
    let token = sessionStorage.getItem("token");
    let res = await axios.get(
      `${commonContext.apiurl}/issues-by-status/${stage}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.data.statusCode === 200) {
      setStage(stage);
      setData(res.data.issues);
      console.log("issue by status running")
    }
  };

  return (
    <>
      <AdminNav />
      <div className="dashboard-wrapper text-center mt-3">
        <h3>Welcome to ZenDesk Dashboard</h3>
        <div className="head-wrapper d-flex justify-content-center mt-3">
          <Card
            style={{ width: "18rem" }}
            className="card btn btn-outline-danger"
          >
            <Card.Body onClick={() => loadStorage("Open")}>
              <Card.Title>Open Issues {count.open}</Card.Title>
            </Card.Body>
          </Card>

          <Card
            style={{ width: "18rem" }}
            className="card btn btn-outline-warning"
          >
            <Card.Body onClick={() => loadStorage("In-Progress")}>
              <Card.Title>In-Progress Issues {count.inProgress}</Card.Title>
            </Card.Body>
          </Card>

          <Card
            style={{ width: "18rem" }}
            className="card btn btn-outline-success"
          >
            <Card.Body onClick={() => loadStorage("Closed")}>
              <Card.Title>Closed Issues {count.closed}</Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="dashboard-wrapper mt-3">
          {stage !== "" ? <h1>List of {stage} Issues</h1> : <></>}
          {data.length ? (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Issue Title</th>
                  <th>Issue Type</th>
                  <th>Created At</th>
                  <th>Name</th>
                  <th>Mobile</th>
                </tr>
              </thead>
              <tbody>
                {data.map((e, i) => {
                  return (
                    <tr
                      key={i}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/issue/${e._id}`);
                        console.log("button triggered")
                      }}
                    >
                      <td>{i + 1}</td>
                      <td>{e.issueTitle}</td>
                      <td>{e.issueType}</td>
                      <td>{e.createdAt}</td>
                      <td>{e.name}</td>
                      <td>{e.mobile}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
