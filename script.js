/* Accessing the required elements by ID */
const nameInput = document.getElementById("name");
const studentIdInput = document.getElementById("ID");
const emailInput = document.getElementById("email");
const contactNoInput = document.getElementById("Contact No");
const classInput = document.getElementById("Class");
const addButton = document.getElementById("AddButton");
const listContainer = document.getElementById("listContainer");
const form = document.getElementById("myForm");
const list = document.getElementById("list");
const saveButton = document.createElement('button');

/* Adding click event listener */
form.addEventListener("submit", addStudent);

/* Adding to local storage */

function addStudent(e) {
  e.preventDefault();
  const name = nameInput.value;
  const studentId = studentIdInput.value;
  const email = emailInput.value;
  const contactNo = contactNoInput.value;
  const studentClass = classInput.value;

  const student = {
    name: name,
    studentId: studentId,
    email: email,
    contactNo: contactNo,
    studentClass: studentClass,
  };

  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

/* Adding to local storage */

/* displayStudents functon to diaplay students in the ui */

function displayStudents(e) {
  listContainer.innerHTML = "";
  const students = JSON.parse(localStorage.getItem("students")) || [];
  list.style.overflowY = "auto";
  students.forEach((student, index) => {
    const li = document.createElement("li");
    li.classList = "listItem";
    // console.log(li)
    const div1 = document.createElement("div");
    div1.innerHTML = student.name;
    const div2 = document.createElement("div");
    div2.innerHTML = student.studentId;
    const div3 = document.createElement("div");
    div3.innerHTML = student.email;
    const div4 = document.createElement("div");
    div4.innerHTML = student.contactNo;
    const div5 = document.createElement("div");
    div5.innerHTML = student.studentClass;
    const div6 = document.createElement("div");

    div6.addEventListener("click", () => editStudent(index));

    const i1 = document.createElement("i");
    i1.classList = "fa-solid fa-pen-to-square";
    //   console.log(i1)
    div6.classList = "editbutton";
    div6.appendChild(i1);
    //   console.log(div6)
    const div7 = document.createElement("div");

    div7.addEventListener("click", () => deleteStudent(index));

    const i2 = document.createElement("i");
    i2.classList = "fa-solid fa-trash-can";
    //   console.log(i2)
    div7.classList = "editbutton";
    div7.appendChild(i2);
    //   console.log(div7)
    li.appendChild(div1);
    li.appendChild(div2);
    li.appendChild(div3);
    li.appendChild(div4);
    li.appendChild(div5);
    li.appendChild(div6);
    li.appendChild(div7);
    //   console.log(li)
    listContainer.appendChild(li);
  });
  nameInput.value = "";
  studentIdInput.value = "";
  emailInput.value = "";
  contactNoInput.value = "";
  classInput.value = "";
}

displayStudents();

/* displayStudents functon to diaplay students in the ui */

/* delete student  */

function deleteStudent(index) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}
/* delete student  */

/* editStudent */
function editStudent(index) {
  addButton.style.display = "none";
  saveButton.classList = "button";
  saveButton.innerHTML = "SAVE";
  saveButton.type = "submit";
  // console.log(saveButton)
  form.appendChild(saveButton);
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students[index];
  nameInput.value = student.name;
  studentIdInput.value = student.studentId;
  emailInput.value = student.email;
  contactNoInput.value = student.contactNo;
  classInput.value = student.studentClass;


  saveButton.onclick = (e) => {
    e.preventDefault();
    saveStudentData(index);
  };
}
/* editStudent */

/* function to save data */
function saveStudentData(index){
  const name = nameInput.value.trim();
  const studentId = studentIdInput.value.trim();
  const email = emailInput.value.trim();
  const contactNo = contactNoInput.value.trim();
  const studentClass = classInput.value.trim();

  if (!name || !studentId || !email || !contactNo || !studentClass) {
    alert("All fields are mandatory.");
    return;
  }

  const students = JSON.parse(localStorage.getItem("students")) || [];
  students[index] = {
    name: name,
    studentId: studentId,
    email: email,
    contactNo: contactNo,
    studentClass: studentClass,
  };
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
  addButton.style.display = "inline-block";
  form.removeChild(saveButton); 
}

/* function to save data */

displayStudents();