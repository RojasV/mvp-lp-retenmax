class MailSender {
    constructor() {
        this.mailEl = document.querySelector('.php-email-form')
        this.submitBtn = document.querySelector('.mail-submit')
        this.spinnerEl = document.querySelector('.spinner-border')
        this.formContainerEl = document.querySelector('.form-container')
        this.sendMail()

    }

    async sendMail() {
        this.mailEl.addEventListener('submit', e => {
            e.preventDefault()

            this.submitBtn.setAttribute("disabled", true)
            this.spinnerEl.style.display = "block"
            this.formContainerEl.classList.add("opacity")

            const formData = new FormData(this.mailEl)

            let celphoneHandledToStringNumber = "55" + formData.get("celphone").replace("(", "").replace(")", "").replace(" ", "").replace("-", "")

            const templateParams = {
                from_name: formData.get("name"),
                email: formData.get("email"),
                celphone: celphoneHandledToStringNumber
            }

            emailjs.send('service_0lhss64', "template_4ndxcal", templateParams, 'gQaGWN1YCHugVnOdV')
                .then(() => {
                    this.successAlertHandler(templateParams.from_name)
                    this.submitBtn.setAttribute("disabled", false)
                    this.mailEl.reset()
                    this.spinnerEl.style.display = "none"
                    this.formContainerEl.classList.remove("opacity")
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }



    successAlertHandler(user) {
        Swal.fire({
                title: `Ficamos felizes pelo seu interesse ${user}!`,
                text: 'Recebemos o seu email e te responderemos em no máximo 1 minutinho!',
                icon: 'success',
                confirmButtonText: "ok"
            })
            .then(() => {
                this.submitBtn.removeAttribute("disabled")
            })
            .catch(err => {
                console.log(err)
            })
    }


}

window.app = new MailSender()