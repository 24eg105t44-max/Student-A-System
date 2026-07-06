const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";
const loginForm = document.getElementById("loginForm");
const loginType = document.getElementById("loginType");
const username = document.getElementById("username");
const password = document.getElementById("password");
const error = document.getElementById("error");
const togglePassword = document.getElementById("togglePassword");
const loginBtn = document.querySelector(".login-btn");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const role = loginType.value;
    const user = username.value.trim();
    const pass = password.value.trim();

    error.innerHTML = "";

    if (user === "" || pass === "") {

        error.style.color = "#ff8080";
        error.innerHTML = "Please enter all fields.";
        return;

    }

    loginBtn.disabled = true;
    loginBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';

    setTimeout(function () {

if (role === "admin") {

            if (
                user === ADMIN_USERNAME &&
                pass === ADMIN_PASSWORD
            ) {

                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("userRole", "admin");
                localStorage.setItem("username", user);

                error.style.color = "#7CFC00";
                error.innerHTML = "✔ Login Successful";

                setTimeout(function () {

                    window.location.href = "dashboard.html";

                }, 800);

            } else {

                loginFailed("Invalid Admin Username or Password");

            }

        }

         else {

            let students =
                JSON.parse(localStorage.getItem("students")) || [];

            let student = students.find(function (s) {

                return (
                    s.roll === user &&
                    s.password === pass
                );

            });

            if (student) {

                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("userRole", "student");
                localStorage.setItem("studentRoll", student.roll);
                localStorage.setItem("studentName", student.name);

                error.style.color = "#7CFC00";
                error.innerHTML = "✔ Login Successful";

                setTimeout(function () {

                    window.location.href =
                        "student-dashboard.html";

                }, 800);

            } else {

                loginFailed("Invalid Roll Number or Password");

            }

        }

    }, 600);

});

function loginFailed(message) {

    error.style.color = "#ff8080";
    error.innerHTML = "❌ " + message;

    loginBtn.disabled = false;

    loginBtn.innerHTML =
        '<i class="fa-solid fa-right-to-bracket"></i> Login';

}

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';

    } else {

        password.type = "password";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye"></i>';

    }

});

loginType.addEventListener("change", function () {

    if (this.value === "admin") {

        username.placeholder =
            "Enter Admin Username";

    } else {

        username.placeholder =
            "Enter Roll Number";

    }

});

window.onload = function () {

    username.focus();

};

ocument.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        loginForm.requestSubmit();

    }

});
            
