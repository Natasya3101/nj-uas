import conn from "../database.js";
import jwt  from "jsonwebtoken";
export async function addUser(req, res) {
   const rows= await conn.query(
      `INSERT INTO account VALUES (NULL,'${req.body.username}','${req.body.password}')`
    );
    res.send("User has been added");  
}
export async function login(req,res){
   const result = await conn.query(
      `SELECT *FROM account where username = '${req.body.username}' && password = '${req.body.password}'`
   )
   if(result.length>0){
      const token = jwt.sign({result},"kim");
      res.cookie("token",token)
      res.send({token});
   }else{
      res.send("login gagal");
   }
}