let express = require("express")
let app = express()
let hbs = require("hbs")
let path = require("path")

const MainRout = require("./Routes/MainRout")
const privateRouter = require("./Routes/Auth/privateRout.js")
const AdminRout = require("./Routes/AdminRout.js")

let { Auth_session } = require("./All_middleware/auth_middleware.js")


app.use(express.static(path.join(__dirname, "./public")))
app.use(express.static(path.join(__dirname, "./dist")))


hbs.registerPartials(path.join(__dirname, "./views/particals"));
app.set("view engine", "hbs")


// app.use(Auth_session())
app.use(MainRout)
app.use(AdminRout)
app.use(privateRouter)


app.listen(8000, () => {
    console.log("Server is runnig on port 8000")
})
