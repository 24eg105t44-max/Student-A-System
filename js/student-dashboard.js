if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

const roll = localStorage.getItem("studentRoll");
let students = JSON.parse(localStorage.getItem("students")) || [];
const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
const notifications = JSON.parse(localStorage.getItem("notifications")) || {};

const student = students.find(s => s.roll === roll);

if (!student) {
    alert("Student not found!");
    window.location.href = "index.html";
}

document.getElementById("studentName").innerText = student.name;
document.getElementById("studentRoll").innerText = student.roll;

const welcome = document.getElementById("welcomeText");
if (welcome) {
    welcome.innerText = "Welcome, " + student.name;
}

const profilePhoto = document.getElementById("profilePhoto");

if (profilePhoto) {
    profilePhoto.src = student.photo || "images/default-profile.png";
}



const changePhotoBtn = document.getElementById("changePhotoBtn");
const photoInput = document.getElementById("photoInput");

if (changePhotoBtn && photoInput) {

    changePhotoBtn.addEventListener("click", function () {
        photoInput.click();
    });

    photoInput.addEventListener("change", function (e) {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (event) {

            profilePhoto.src = event.target.result;

            student.photo = event.target.result;

            localStorage.setItem("students", JSON.stringify(students));

            alert("Profile photo updated successfully!");

        };

        reader.readAsDataURL(file);

    });

}



function updateDateTime() {

    const now = new Date();

    const date = document.getElementById("currentDate");
    const time = document.getElementById("currentTime");

    if (date) {
        date.innerText = now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    if (time) {
        time.innerText = now.toLocaleTimeString();
    }

}

updateDateTime();
setInterval(updateDateTime, 1000);



let presentDays = 0;
let totalDays = attendance.length;

attendance.forEach(record => {
    if (record.present.includes(student.roll)) {
        presentDays++;
    }
});

let absentDays = totalDays - presentDays;

let percentage = totalDays === 0
    ? 0
    : Math.round((presentDays / totalDays) * 100);

document.getElementById("presentDays").innerText = presentDays;
document.getElementById("absentDays").innerText = absentDays;
document.getElementById("percentage").innerText = percentage + "%";



const historyTable = document.getElementById("historyTable");

historyTable.innerHTML = "";

attendance.forEach(record => {

    const status = record.present.includes(student.roll)
        ? "Present"
        : "Absent";

    const color = status === "Present"
        ? "green"
        : "red";

    historyTable.innerHTML += `
        <tr>
            <td>${record.date}</td>
            <td style="color:${color};font-weight:bold;">
                ${status}
            </td>
        </tr>
    `;

});



const notificationTable = document.getElementById("notificationTable");

if (notificationTable) {

    notificationTable.innerHTML = "";

    const studentNotifications = notifications[roll] || [];

    if (studentNotifications.length === 0) {

        notificationTable.innerHTML = `
            <tr>
                <td colspan="2">No Notifications</td>
            </tr>
        `;

    } else {

        studentNotifications.slice().reverse().forEach(n => {

            notificationTable.innerHTML += `
                <tr>
                    <td>${n.message}</td>
                    <td>${n.date}</td>
                </tr>
            `;

        });

    }

}



document.getElementById("logoutBtn").addEventListener("click", function () {

    if (confirm("Do you want to logout?")) {

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("studentRoll");

        window.location.href = "student-login.html";

    }

});
