let express = require("express")
let path = require("path")
let fs = require("fs")
let { checkAuth } = require("../../All_middleware/auth_middleware")
const { FindAdminByEmail, FindAdminByCode } = require("../../AllDataFns/admin")


let privateRouter = express.Router()

// privateRouter.use(checkAuth)
privateRouter.use(express.static(path.join(__dirname, "../private")))

privateRouter.get("/adminDataPage", (req, res) => {
    let All_usersData = JSON.parse(fs.readFileSync("./DataUsers.json"))
    let All_data = JSON.parse(fs.readFileSync("./DataMainAll.json"))
    // let emailSession = req.session.adminIn
    // let userAdmin = FindAdminByEmail(emailSession, All_usersData)
    // let valueVisibleElemnts = 5



    // if (userAdmin) { }
    // if (!userAdmin.active) {
    //     let massage = "Ваша сессия истекла!"
    //     return res.render("errorPage.hbs", { massage })
    // }
    let render = {
        // code: userAdmin.Admin_id,
        // pageName: emailSession,
        // render: (userAdmin.usersData).slice(-valueVisibleElemnts)
        render: All_data
    }
    return res.render("AdminPage.hbs", render)

    res.render("errorPage.hbs")
})


privateRouter.get("/AllAdminsPage", (req, res) => {
    if (req.session.adminIn || req.session.MainAdminIn) {
        let All_publicData = JSON.parse(fs.readFileSync("./DataMainAll.json"))

        let render = {
            pageName: "All",
            render: All_publicData
        }
        return res.render("AllUsersData.hbs", render)
    }
    res.render("errorPage.hbs")
})



privateRouter.get("/AdminMain", (req, res) => {
    if (req.session.MainAdminIn) {
        let All_usersData = JSON.parse(fs.readFileSync("./DataUsers.json"))

        let render = {
            pageName: "Big Admin",
            render: All_usersData,
        }

        return res.render("BigAdmin.hbs", render)
    }
    res.render("errorPage.hbs")
})



privateRouter.get("/ban_unbanAdmin", (req, res) => {

    if (req.session.MainAdminIn) {
        let All_usersData = JSON.parse(fs.readFileSync("./DataUsers.json"))
        let { adminCode, action } = req.query
        let { needAdmin, index } = FindAdminByCode(adminCode, All_usersData)

        switch (action) {
            case "ban":
                All_usersData[index].active = false
                break;

            case "unban":
                All_usersData[index].active = true
                break;
        }


        fs.writeFileSync("./DataUsers.json", JSON.stringify(All_usersData, null, 4))
        return res.end()
    }
    res.render("errorPage.hbs")
})

privateRouter.get("/logout", (req, res) => {
    req.session.adminIn = false
    req.session.MainAdminIn = false
    req.session.CodeToAdmin = false

    req.session.destroy()
    res.redirect("/")
})

module.exports = privateRouter