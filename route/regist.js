import conn from "../database.js";

export async function addUser(req, res) {
   const rows= await conn.query(
      `INSERT INTO account VALUES (NULL,'${req.body.username}','${req.body.password}')`
    );
    res.send("User has been added");

  
}