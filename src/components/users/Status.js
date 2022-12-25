import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { CommonContext } from "../../App";
import TopBar from "./TopBar";

function Status() {
  let commonContext = useContext(CommonContext);
  let [data, setData] = useState(null);
  let [ticket, setTicket] = useState("");

  let handleLoadTicket = async () => {
    let token = sessionStorage.getItem('token')
    let res = await axios.get(`${commonContext.apiurl}/issues/${ticket}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
    );
    if (res.data.statusCode === 200) {
      setData(res.data.issue[0]);
    }
  };

  return (
    <>
      <TopBar />
      <div className="col-3 mx-auto mt-5">
        <Form>
          <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
            <Form.Label className="fw-bold fs-3">
              Ticket Number<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Ticket Number"
              onChange={(e) => setTicket(e.target.value)}
            />
          </Form.Group>
          <div className="text-center">
            <Button
              className="mt-3"
              variant="primary"
              onClick={() => handleLoadTicket()}
            >
              Submit
            </Button>
          </div>
        </Form>
        {data !== null ? (
          <>
            <div className="mt-5">
              <h2 className="text-center mb-4">Welcome to Zen Desk!</h2>
              <h5>
                <strong>Issue Title :</strong> {data.issueTitle}
              </h5>
              <div>
                <strong>Issue Type :</strong> {data.issueType}
              </div>
              <div>
                <strong>Issue Description :</strong> {data.description}
              </div>
              <div>
                <strong>Status : </strong>
                <span
                  style={
                    data.status === "Open"
                      ? { color: "red" }
                      : data.status === "In-Progress"
                      ? { color: "#fcba03" }
                      : { color: "green" }
                  }
                >
                  {data.status}
                </span>
                <div>
                  <strong>Created Date : </strong>
                  {data.createdAt}
                </div>
                {data.status === "In-Progress" || data.status === "Closed" ? (
                  <div>
                    <strong>Opened Date : </strong>
                    {data.inProgressDate}
                  </div>
                ) : (
                  <></>
                )}
                {
                  data.status ==="Closed" ? 
                  <div><strong>Closed Date : </strong>{data.closedDate}</div>: <></>
                }
                <div>
                <strong>Comments :</strong> {data.comments}
              </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Status;
