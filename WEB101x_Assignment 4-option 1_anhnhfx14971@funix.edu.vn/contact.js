//đối tượng validator
function validator(options) {

    //Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(".form-message");
        var errorMassage = rule.test(inputElement.value);

        if (errorMassage) {
            errorElement.innerText = errorMassage;
            inputElement.parentElement.classList.add("invalid");
        } else {
            errorElement.innerText = "";
            inputElement.parentElement.classList.remove("invalid");
        }

    }

    //Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector)

            if (inputElement) {
                //Khi click vào buttun submit
                if (options.isSubmitted) {
                    validate(inputElement, rule)
                }

                //Xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule)
                }

                //Xử lý trường hợp khi người dùng nhập vào input
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(".form-message");
                    errorElement.innerText = "";
                    inputElement.parentElement.classList.remove("invalid");
                }
            }

        });

    }
}

validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            if (value.trim().length > 100) return "Your name should not exceed 100 characters.";
            else if (value.trim() == "") return "Please fill out your name.";
            else return undefined;
        }
    }
}

validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (value.trim().length > 100) return "Your email should not exceed 100 characters.";
            else if (!regex.test(value)) return "Please fill out your email.";
            else return undefined;
        }
    }
}

validator.isSubject = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            if (value.trim().length < 50) return "Subject should not shorter than 50 characters.";
            if (value.trim().length > 250) return "Subject should not exceed 250 characters.";
            else return undefined;
        }
    }
}

validator.isMessage = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            if (value.trim() == "") return "Please fill out the message.";
            else if (value.trim().length > 500) return "Message should not exceed 500 characters.";
            else return undefined;
        }
    }
}

validator({
    form: '#form-1',
    rules: [
        validator.isRequired('#fullname'),
        validator.isEmail('#email'),
        validator.isSubject('#subject'),
        validator.isMessage('#message'),
    ],
    isSubmitted: false
})

document.getElementById("submit-button").onclick = function() {
    validator({
        form: '#form-1',
        rules: [
            validator.isRequired('#fullname'),
            validator.isEmail('#email'),
            validator.isSubject('#subject'),
            validator.isMessage('#message'),
        ],
        isSubmitted: true
    });
}