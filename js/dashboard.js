// Check Login
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

// Admin Name
const adminName = document.getElementById("adminName");

if (adminName) {
    adminName.innerText = localStorage.getItem("username") || "Admin";
}

// Profile Photo
const adminPhoto = document.getElementById("adminPhoto");
const changePhotoBtn = document.getElementById("changePhotoBtn");
const photoInput = document.getElementById("photoInput");

const savedPhoto = localStorage.getItem("adminPhoto");

if (savedPhoto) {
    adminPhoto.src = savedPhoto;
}

changePhotoBtn.addEventListener("click", function () {
    photoInput.click();
});

photoInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        adminPhoto.src = e.target.result;

        localStorage.setItem("adminPhoto", e.target.result);

    };

    reader.readAsDataURL(file);

});

// Load Students
let students =
    JSON.parse(localStorage.getItem("students")) || [];

document.getElementById("totalStudents").innerText =
    students.length;

// Load Attendance
let attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];

let present = 0;
let absent = 0;

if (attendance.length > 0) {

    let latest = attendance[attendance.length - 1];

    present = latest.present.length;
    absent = latest.absent.length;

}

document.getElementById("presentStudents").innerText = present;
document.getElementById("absentStudents").innerText = absent;

// Attendance Percentage
let percentage = 0;

if (students.length > 0) {

    percentage = Math.round((present / students.length) * 100);

}

document.getElementById("attendancePercentage").innerText =
    percentage + "%";

// Date & Time
function updateDateTime() {

    const now = new Date();

    document.getElementById("currentDate").innerHTML =
        now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    document.getElementById("currentTime").innerHTML =
        now.toLocaleTimeString();

}

updateDateTime();

setInterval(updateDateTime, 1000);

// Logout
document
.getElementById("logoutBtn")
.addEventListener("click", function () {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("loggedIn");

        window.location.href = "index.html";

    }

});

// Sample Data
if (students.length === 0) {

    students = [

        {
            id: 1,
            name: "Rahul Kumar",
            roll: "23CSE001",
            department: "CSE",
            year: "III"
        },

        {
            id: 2,
            name: "Anjali",
            roll: "23CSE002",
            department: "CSE",
            year: "III"
        },

        {
            id: 3,
            name: "Kiran",
            roll: "23CSE003",
            department: "CSE",
            year: "III"
        }

    ];

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    document.getElementById("totalStudents").innerText =
        students.length;

}
