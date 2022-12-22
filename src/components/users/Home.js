import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { CommonContext } from "../../App";
import { useNavigate,Link } from "react-router-dom";
import TopBar from "./TopBar";


function Home() {
  let commonContext = useContext(CommonContext);
  let [issueTypes, setIssueTypes] = useState([]);

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [mobile, setMobile] = useState("");
  let [issueType, setIssueType] = useState("");
  let [issueTitle, setIssueTitle] = useState("");
  let [description, setDescription] = useState("");

  let navigate = useNavigate();

  let loadIssueTypes = async () => {
    let token = sessionStorage.getItem('token')
    let res = await axios.get(`${commonContext.apiurl}/issue-types`,
    {
      headers:{"Authorization":`Bearer ${token}`}
    })
    if (res.data.statusCode === 200) {
      setIssueTypes(res.data.issueTypes);
    } else {
      console.log("Issue in loadIssueTypes");
    }
  };

  useEffect(() => {
    loadIssueTypes();
  }, []);

  let handleSubmit = async () => {
    let token = sessionStorage.getItem("token");
    let res = await axios.post(`${commonContext.apiurl}/issues`, {
      name,
      email,
      mobile,
      issueType,
      issueTitle,
      description,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
    );
    if (res.data.statusCode === 200) {
      navigate(`/success/${res.data.issue_id}`);
    } else {
      console.log("Issue in handleSubmit");
    }
  };

  return (
    <>
    <TopBar/>
    <div>
      <div className="mt-3 title-wrapper rounded">
        <h1>Register New Complaint</h1>
      </div>
      <div className="main-wrapper">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Name<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Email address<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Mobile<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Your mobile number"
              onChange={(e) => setMobile(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Issue Type<sup>*</sup>
            </Form.Label>
            <Form.Select
              onChange={(e) => {
                setIssueType(e.target.value);
              }}
            >
              {issueTypes.map((e, i) => {
                return (
                  <option value={e} key={i}>
                    {e}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Issue Title<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Issue Title"
              onChange={(e) => setIssueTitle(e.target.value)}
            />
          </Form.Group>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="Leave a comment here"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>
          <div className="text-center">
            <Button
              className="mt-3"
              variant="primary"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
      </div>
    </>
  );
}

export default Home;
