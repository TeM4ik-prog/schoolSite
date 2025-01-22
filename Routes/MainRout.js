const { Router } = require("express")
let fs = require("fs")
let path = require("path")

let MainRout = Router()

MainRout.get("/", (req, res) => {
    let { code } = req.query

    if (code) {
        req.session.CodeToAdmin = code
    }
    res.render("MainPage.hbs")
})


MainRout.get("/login", (req, res) => {
    let { code } = req.query

    if (code) {
        req.session.CodeToAdmin = code
    }
    res.render("LoginPage.hbs")
})


MainRout.get("/exitError", (req, res) => {
    let { code } = req.query

    if (code) {
        req.session.CodeToAdmin = code
    }
    res.render("RedirectProductPage.hbs")
})

MainRout.get("/vk", (req, res) => {
    setTimeout(() => {
        res.send(`<h4>Internal Network Error code 505</h4>`)
    }, 3000)

})

MainRout.get("/google", (req, res) => {
    setTimeout(() => {
        res.send(`<h4>Internal Network Error code 505</h4>`)
    }, 3000)
})



module.exports = MainRout
