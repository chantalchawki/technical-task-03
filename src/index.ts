import "reflect-metadata";
import express from "express";
import { Member } from "./member";
import {createConnection} from "typeorm";

const app = express();

app.listen(3000, () => {
  console.log("Hello from server");
});

app.use(express.json());

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "members",
  entities: [
      Member
  ],
  synchronize: true,
  logging: false
});

app.get("/members", async (req, res) => {
  const members = await Member.find();
  res.send(members);
});

app.post("/members", async (req, res) => {
  const member = new Member(req.body);
  await member.save();
  res.send(member);
});

app.get("/members/:id", async (req, res) => {
  const member = await Member.findOne({id: req.params.id});
  if (member === undefined) {
    res.status(404).send("Not found");
  } else {
    res.send(member);
  }
});

app.delete("/members/:id", async (req, res) => {
  let member = await Member.findOne({id: req.params.id});
  if(member === undefined) {
    res.status(404).send("Not Found");
  } else {
    await member.remove();
    res.send(member);
  }
});

app.put("/members/:id", async (req, res) => {

  let member = await Member.findOne({id: req.params.id});
  if(member === undefined) {
    res.status(404).send("Not Found");
  } else {
    member = {
      ...member,
      ...req.body
    };
    console.log(member);
    await Member.save(member);
    res.send(member);
  }
});

app.use((err, req, res, next) => {
  console.log("Error Occured");
  res.status(500).send("Internal server error");
});
