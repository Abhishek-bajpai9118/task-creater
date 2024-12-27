const express = require("express")
const cors = require("cors")
const {userController} = require("./routes/user.routes")
const {notesController} = require("./routes/notes.routes")
const { connectToDatabase } = require("./config/db");
const {authentication} = require("./middlewares/authentication")
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 7070

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Home page")
})

app.use(cors())

app.use("/user", userController)
app.use(authentication)
app.use("/notes", notesController)

app.listen(PORT, async () => {
    try{
        await connectToDatabase;
        console.log("Connected to database");
    }
    catch(err){
        console.log("Error connnecting to DB")
        console.log(err)
    }
    console.log(`listening on PORT ${PORT}`)
})