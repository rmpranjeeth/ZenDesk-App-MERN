import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TopBar from "./TopBar";

function Success() {
  let params = useParams();

  let [toggle, setToggle] = useState(false);

  let handleCopy = () => {
    setToggle(true);
    navigator.clipboard.writeText(params.id);
    setTimeout(() => {
      setToggle(false);
    }, 2000);
  };

  return (
    <>
      <TopBar />
      <div className="success-wrapper rounded">
        <CheckCircleOutlineIcon sx={{ fontSize: 100 }} />
        <h1>Success</h1>
        <p>Your Ticket is</p>
        <p className="d-flex justify-content-center">
          <span className="pe-2"><h4>{params.id}</h4></span>
          <span onClick={() => handleCopy()} className="copy">
            <ContentCopyIcon />
            {toggle ? <span style={{ color: "black" }}>Copied!</span> : <></>}
          </span>
        </p>
        <p>
          Please visit{" "}
          <Link to="/track-issue">
            <b>here</b>
          </Link>{" "}
          to find the status of the ticket.
        </p>
      </div>
    </>
  );
}

export default Success;
