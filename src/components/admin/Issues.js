import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { CommonContext } from "../../App";
import {useParams} from 'react-router-dom'
import {useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";

function Issues() {
  let commonContext = useContext(CommonContext);
  let params = useParams();
  let [data, setData] = useState(null);
  let [comment, setComment] = useState("");
  let navigate = useNavigate();

  let handleLoadTicket = async () => {
    let token = sessionStorage.getItem("token");
    console.log(token)
    console.log("before axios")
    let res = await axios.get(`${commonContext.apiurl}/issues/${params.id}`,
    console.log("after axios"),
    {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.statusCode === 200) 
    {
      setData(res.data.issue[0]);
      setComment(res.data.issue[0].comments)
      console.log(res.data.issue[0]);
      console.log("axios succecc")
    }
  }

  useEffect(()=>{
      handleLoadTicket();
      console.log("useEff working")
  },[])

  let nextStage = async (stage) => {
    let token = sessionStorage.getItem("token");
    let res = await axios.put(`${commonContext.apiurl}/change-status/${params.id}`,{
        comments: comment
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    });
    if(res.data.statusCode === 200){
        navigate('/dashboard')
    }
  }

  return (
    <>
      <AdminNav />
      <div>Welcome to Issues page</div>
      <div className="col-3 mx-auto mt-5">
        {data !== null ? (
          <>
            <div className="mt-5">
              <h2 className="text-center mb-4">ZenDesk Issues Tracker!</h2>
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
                      ? { "color": "red" }
                      : data.status === "In-Progress"
                      ? { "color": "#fcba03" }
                      : { "color": "green" }
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
                  data.status ==="closed" ? 
                  <div><strong>Closed Date : </strong>{data.closedDate}</div>: <></>
                }
                <div>
                    <strong>Comments :</strong> 
                    <input style={{"width":"300px"}} type={"textArea"} value={comment} onChange={(e)=>setComment(e.target.value)}/>
                </div>
                <Button className="mt-3" variant="primary" onClick={()=>{
                    navigate('/dashboard')
                    }}>Back to Dashboard</Button>
                    &nbsp;
                {
                    data.status === "Open"?<Button className="mt-3"  variant="warning" onClick={()=>{nextStage()}}>In-Progress</Button>
                    :data.status === "In-Progress"?<Button className="mt-3" variant="success" onClick={()=>{nextStage()}}>Closed</Button>: <></>
                }
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

export default Issues;
