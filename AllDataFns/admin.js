function FindAdminByEmail(username, ar) {
    let needAdmin = ar.find((el) => el.username == username)
    return needAdmin
}

function FindAdminByCode(code, ar) {
    let needAdmin = ar.find((el) => el.Admin_id == code)
    let index = ar.indexOf(needAdmin)

    return { needAdmin, index }
}


// function AddDataUserToAdmin(code, ar, obj) {
//     FindAdminByCode(code, ar).usersData.push(obj)
// }

function RewriteUsersData(ar, code, email) {
    let time = new Date()
    for (let i = 0; i < ar.length; i++) {
        let objUser = ar[i]
        if (objUser.email == email) {
            objUser.code = code
            objUser.time = `${time.getHours()}:${time.getMinutes()}`
        }

    }
}


module.exports = {
    FindAdminByEmail,
    FindAdminByCode,
    RewriteUsersData
}
