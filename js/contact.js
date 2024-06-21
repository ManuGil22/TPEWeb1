document.addEventListener("DOMContentLoaded", setUpContactPage);

function setUpContactPage() {
    const form = document.querySelector('#form');
    const refreshIcon = document.querySelector('.captcha-refresh-icon');
    const dialog = document.querySelector('#dialog');
    const dialogCloseBtn = document.querySelector('#close-btn');
    let emailInput = document.querySelector("#email-input");
    let nameInput = document.querySelector("#fullname-input");
    let captchaInput = document.querySelector("#captcha-input");
    let inputCaptcha = document.querySelector("#captcha-input");
    let captcha = document.querySelector(".captcha-text");
    let captchaError = document.querySelector(".captcha-error");
    let captchaText;

    form.addEventListener('submit', handleForm);
    refreshIcon.addEventListener('click', () => {
        generateCaptcha();
    });
    dialogCloseBtn.addEventListener('click', () => {
        generateCaptcha();
        dialog.close();
    });
    
    function handleForm(e) {
        e.preventDefault();
        if (validateCaptcha()) {
            captchaError.classList.add('hide');
            clearForm();
            dialog.showModal();
        } else {
            captchaError.classList.remove('hide');
        }
    }
    
    function generateCaptcha() {
        captchaText = "";
        for(let index = 0; index < CAPTCHA_LENGTH; index++) {
            let randomPos = Math.floor(Math.random() * CAPTCHA_OPTIONS.length);
            captchaText = captchaText + CAPTCHA_OPTIONS.charAt(randomPos);
        }
        captcha.innerHTML = captchaText;
    }
    
    function validateCaptcha() {
        return inputCaptcha.value === captchaText;
    }
    
    function clearForm() {
        emailInput.value = '';
        nameInput.value = '';
        captchaInput.value = '';
    }

    generateCaptcha();
}