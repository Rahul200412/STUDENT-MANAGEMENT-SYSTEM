const ADMIN_PASSWORD = "admin123";
let students = JSON.parse(localStorage.getItem("students")) || [];

function login() {
  const pass = document.getElementById("adminPass").value;
  if (pass === ADMIN_PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("mainApp").style.display = "block";
  } else {
    alert("Incorrect Password");
  }
}

function displayStudents(filter = "") {
  const list = document.getElementById("studentList");
  list.innerHTML = "";
  students
    .filter(s =>
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.className.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((s, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${s.name}</td>
        <td>${s.roll}</td>
        <td>${s.className}</td>
        <td>${s.grade}</td>
        <td>${s.attendance}</td>
        <td>
          <button onclick="viewReport(${i})">Report</button>
          <button onclick="deleteStudent(${i})">Delete</button>
        </td>`;
      list.appendChild(row);
    });
}

function deleteStudent(i) {
  students.splice(i, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

document.getElementById("studentForm").addEventListener("submit", e => {
  e.preventDefault();
  const s = {
    name: name.value.trim(),
    roll: roll.value.trim(),
    className: className.value.trim(),
    grade: grade.value.trim(),
    attendance: attendance.value
  };
  students.push(s);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
  studentForm.reset();
});

document.getElementById("search").addEventListener("input", e => {
  displayStudents(e.target.value);
});

function viewReport(i) {
  const s = students[i];
  document.getElementById("modalContent").innerHTML = `
    Name: ${s.name}<br>
    Roll No: ${s.roll}<br>
    Class: ${s.className}<br>
    Grade: ${s.grade}%<br>
    Attendance: ${s.attendance}`;
  document.getElementById("overlay").style.display = "block";
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("modal").style.display = "none";
}

function exportCSV() {
  let csv = "Name,Roll,Class,Grade,Attendance\n";
  students.forEach(s => {
    csv += `${s.name},${s.roll},${s.className},${s.grade},${s.attendance}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "students.csv";
  a.click();
}

displayStudents();
