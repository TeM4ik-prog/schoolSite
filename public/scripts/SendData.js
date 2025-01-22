
let inpC = document.querySelector("#email-cl")
let inpIn = inpC.querySelector(".input-in")
let textIn = inpC.querySelector(".text-input")
let blurBlock = document.querySelector(".blur-container")
let emailContainerCode = document.querySelector(".email-code-container")
let inputE = document.querySelector("#inputEmail")
let buttSendEmail = document.querySelector("#buttSubmit")
let email = ''


inpC.addEventListener("click", function () {
    textIn.className = "text-input-after"
    inpIn.className = "input-in-after"

    let inputEmail = document.querySelector(".input-in-after")
    inputEmail.focus()

    document.addEventListener("keyup", ChechEmailErrors)

})


buttSendEmail.addEventListener("click", ChechEmailErrors)


async function SendData() {
    if (document.querySelector("#inputEmail") && document.querySelector(".input-in-after").value != "") {
        let buttSubmValue = (document.querySelector("#inputEmail")).value

        let responce = await fetch("/admin/email", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "post",
            body: JSON.stringify({ email: buttSubmValue })
        })

        let { url } = await responce.json()

        if (url) {
            window.location = url
            return
        }

        if (responce.ok) {
            ClearContainerCode()

            emailContainerCode.style.display = "inline-flex"
            inputE = document.querySelector("#inputEmail")
            email = inputE.value

            inputE.blur()
            blurBlock.style.display = "block"

            document.querySelector("#firstInputCode").focus()
            document.querySelector("#closeWindowCode").addEventListener("click", CloseCodeContainer)

            emailText.innerText = "Мы отправили письмо на " + email
        }
    }
}

function ChechEmailErrors() {
    let text = ''
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    let elem = document.querySelector(".text_error")
    let container = document.querySelector("#email-cl")

    let input = (document.querySelector(".input-in-after"))

    container.style.backgroundColor = "#52212c"
    buttSendEmail.style.backgroundColor = "#707480"

    buttSendEmail.removeEventListener('click', SendData)

    if (!input || input.value == "") {
        text = "Обязательное поле"
    }
    // !input.value.includes("@")
    else if (!EMAIL_REGEXP.test(input.value)) {
        text = "Такой почты не существует"
    }
    else {
        container.style.backgroundColor = "#282933"
        buttSendEmail.style.backgroundColor = "#2663f0"

        buttSendEmail.addEventListener('click', SendData)
        buttSendEmail.removeEventListener("click", ChechEmailErrors)

    }


    elem.style.display = "block"
    elem.innerText = text
}


function CloseCodeContainer() {
    emailContainerCode.style.display = "none"

    blurBlock.style.display = "none"
}

function ClearContainerCode() {
    let IpsInBox = document.querySelectorAll(".numbers-container .number-verifi input")

    IpsInBox.forEach((el) =>
        el.value = '')
}



// __________________________________________

let IpsInBox = document.querySelectorAll(".numbers-container .number-verifi input")
for (let i = 0; i < IpsInBox.length; i++) {
    let elem = IpsInBox[i]
    elem.addEventListener("keyup", AddEvent)

    async function AddEvent(e) {
        e.preventDefault()
        let valueIn = parseInt(e.target.value)


        if (valueIn !== "" && valueIn >= 0 && valueIn < 10) {
            if (i < IpsInBox.length - 1) {
                IpsInBox[i + 1].focus()
            }
            else {
                i = -1
                let code = ''
                IpsInBox.forEach((el) => {
                    code += el.value
                })



                // let responce = await fetch(`/admin/code?code=${code}&email=${email}&${} `{ code: code, email: email})
                // })


                let responce = await fetch("/admin/code", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: "post",
                    body: JSON.stringify({ code: code, email: email })

                })


                let { url } = await responce.json()
                if (responce.ok) {


                    document.querySelector(".email-code-container").style.display = "none"
                    inputE.style.display = "inline-flex"

                    blurBlock.style.display = "none"

                    window.location = url
                    return
                }

            }

        }
        else {
            e.target.value = ''
        }
    }
}

