if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

const roll = localStorage.getItem("studentRoll");
const students = JSON.parse(localStorage.getItem("students")) || [];
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
    if (student.photo) {
        profilePhoto.src = student.photo;
    } else {
        profilePhoto.src = "images/default-profile.png";
    }
}

function updateDateTime() {

    const now = new Date();

    if (document.getElementById("currentDate")) {
        document.getElementById("currentDate").innerText =
            now.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });
    }

    if (document.getElementById("currentTime")) {
        document.getElementById("currentTime").innerText =
            now.toLocaleTimeString();
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

    let status = record.present.includes(student.roll)
        ? "Present"
        : "Absent";

    let color = status === "Present"
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

    let studentNotifications = notifications[roll] || [];

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
