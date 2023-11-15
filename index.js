import express from "express";
import conn from "./database.js";
import { addUser } from "./route/regist.js";
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.post("/api/register",addUser)
app.listen(3000 , () =>{
    // notification
    console.log("The Server starts on port 3000");
});