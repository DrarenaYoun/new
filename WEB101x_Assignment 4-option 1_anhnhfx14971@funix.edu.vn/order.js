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
                // khi click vào button submit
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

validator.isChoosecake = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            if (value.trim() == "") return "Please select our product.";
            else return undefined;
        }
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


validator.isMessage = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            if (value.trim().length > 30) return "Message should not exceed 30 characters.";
            else return undefined;
        }
    }
}

validator.isTime = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            if (value.trim() == "") return "Please fill out the deliver date.";
            else return undefined;
        }
    }
}

validator.isPlace = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            if (value.trim().length > 500) return "Address should not exceed 500 characters.";
            else if (value.trim() == "") return "Please fill out the address.";
            else return undefined;
        }
    }
}

validator.isCall = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            if (value.trim() == "") return "Please choose yes or no";
            else return undefined;
        }
    }
}



validator({
    form: '#form-1',
    rules: [
        validator.isChoosecake('#choose-cake'),
        validator.isRequired('#fullname'),
        validator.isMessage('#message'),
        validator.isTime('#time'),
        validator.isPlace('#place'),
        validator.isCall('#call')
    ],
    isSubmitted: false
});

document.getElementById("submit-button").onclick = function() {
    validator({
        form: '#form-1',
        rules: [
            validator.isChoosecake('#choose-cake'),
            validator.isRequired('#fullname'),
            validator.isMessage('#message'),
            validator.isTime('#time'),
            validator.isPlace('#place'),
            validator.isCall('#call')
        ],
        isSubmitted: true
    });
}