var express = require("express");
var router = express.Router();
const { mongodb, dbName, dbUrl } = require("../config/dbConfig");
const { mongoose, issueModel, issueTypeModel } = require("../config/dbSchema");
const {hashPassword,hashCompare,createToken,decodeToken,validateToken,adminGaurd} = require('../config/auth')
require("dotenv").config();

mongoose.connect(process.env.dbUrl);

router.get("/issue-types", validateToken, async (req, res) => {
  try {
    let issues_types = await issueTypeModel.find({},{'issue_type':1,'_id':0});
    let issueTypes = [];

    issues_types.map((e)=>{
      issueTypes.push(e.issue_type)
    })
    res.send({
      statusCode: 200,
      issueTypes,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

router.post("/issue-types", validateToken, adminGaurd, async (req, res) => {
  try {
    let issueType = await issueTypeModel.create(req.body);
    res.send({
      statusCode: 200,
      message: "Issue Type was created successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

router.put("/issue-types/:id", validateToken, adminGaurd,async (req, res) => {
  try {
    let issueType = await issueTypeModel.findOne({
      _id: mongodb.ObjectId(req.params.id),
    });
    if (issueType) {
      issueType.issue_type = req.body.issue_type;
      await issueType.save();
      res.send({
        statusCode: 200,
        message: "Issue Type Edited successfully",
      });
    } else {
      res.send({
        statusCode: 400,
        message: "Invalid Issue",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

router.delete("/issue-types/:id", validateToken, adminGaurd, async (req, res) => {
  try {
    let issueType = await issueTypeModel.deleteOne({
      _id: mongodb.ObjectId(req.params.id),
    });
    res.send({
      statusCode: 200,
      message: "Issue Type Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

//display in user

router.post("/issues", validateToken, async (req, res) => {
  try {
    let issue = await issueModel.create(req.body);
    res.send({
      statusCode: 200,
      issue_id: issue._id,
      message: "Issue Submitted successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

//display in admin

router.get("/issues-count", validateToken, adminGaurd, async (req, res) => {
  try {
    let open = await issueModel.find({ status: "Open" }).count();
    let inProgress = await issueModel.find({ status: "In-Progress" }).count();
    let closed = await issueModel.find({ status: "Closed" }).count();

    res.send({
      statusCode: 200,
      open,
      inProgress,
      closed,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

router.get("/issues-by-status/:status", validateToken, adminGaurd, async (req, res) => {
  try {
    let issues = await issueModel.find({ status: `${req.params.status}` });
    res.send({
      statusCode: 200,
      issues,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

router.get("/issues/:id", validateToken, async (req, res) => {
  try {
    let issue = await issueModel.find({ _id: mongodb.ObjectId(req.params.id) });
    res.send({
      statusCode: 200,
      issue,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

router.put("/change-status/:id", validateToken, adminGaurd, async (req, res) => {
  try {
    let issue = await issueModel.findOne({
      _id: mongodb.ObjectId(req.params.id),
    });
    switch (issue.status) {
      case "Open":
        issue.status = "In-Progress";
        issue.comments = req.body.comments;
        issue.inProgressDate = new Date();
        break;
      case "In-Progress":
        issue.status = "Closed";
        issue.comments = req.body.comments;
        issue.closedDate = new Date();
        break;
      default:
        res.send({
          statusCode: 400,
          message: "Invalid Current Status",
        });
    }
    let result = await issue.save();
    res.send({
      statusCode: 200,
      message: "Status Changed Successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

module.exports = router;
