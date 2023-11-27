import express from "express";
import jwt from "jsonwebtoken";
import conn from "./database.js";
import cookieParser from "cookie-parser";
import { addUser, login } from "./route/regist.js";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.post("/api/register", addUser);

app.use((req, res, next) => {
    if (req.path.startsWith("/api/login") || req.path.startsWith("/api/register")) {
        next();
    } else {
        let authorized = false;
        if (req.cookies.token) { // ada ga si token itu di situ
            try {
                req.me = jwt.verify(req.cookies.token, "kim"); //kuncinya
                authorized = true;
            } catch (error) {
                res.clearCookie("token"); // menghapus si cookienya
            }
        }
        if (authorized) {
            if (req.path.startsWith("/login")) {
                res.redirect("/home");
            }

        } else {
            if (req.path.startsWith("/login") || req.path.startsWith("/register")) {
                next();
            } else {
                if (req.path.startsWith("/api")) {
                    res.status(401);
                    res.send("Anda Harus Login dulu");
                } else {
                    res.redirect("/login");
                }
            }
        }
    }
});

app.use(express.static("public"));
app.post("/api/login", login);
app.get("/api/logout",(req,res)=>{
    res.clearCookie("token");
    res.send("logout berhasil");
})
app.listen(3000, () => {
    // notification
    console.log("The Server starts on port 3000");
});