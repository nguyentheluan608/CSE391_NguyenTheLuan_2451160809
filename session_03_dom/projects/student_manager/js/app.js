const STORAGE_KEY = "luan_students_session03";

const defaultStudents = [
    { id: "2451160809", name: "Nguyễn Thế Luân", birthday: "2006-04-12", className: "66CNTT1", score: 8.1, email: "luan0809@tlu.edu.vn" },
    { id: "2451160810", name: "Trần Minh Quân", birthday: "2006-02-19", className: "66CNTT2", score: 7.4, email: "quan0810@tlu.edu.vn" },
    { id: "2451160811", name: "Đỗ Hoàng Anh", birthday: "2006-07-03", className: "66CNPM1", score: 6.8, email: "anh0811@tlu.edu.vn" }
];

let students = loadStudents();
let editingIndex = -1;

const openAddBtn = document.getElementById("openAddBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const modal = document.getElementById("studentModal");
const form = document.getElementById("studentForm");
const formTitle = document.getElementById("formTitle");
const saveBtn = document.getElementById("saveBtn");
const tableBody = document.getElementById("studentTableBody");
const messageBox = document.getElementById("messageBox");

const fields = {
    editId: document.getElementById("editId"),
    studentId: document.getElementById("studentId"),
    studentName: document.getElementById("studentName"),
    birthday: document.getElementById("birthday"),
    className: document.getElementById("className"),
    score: document.getElementById("score"),
    email: document.getElementById("email")
};

const errors = {
    studentId: document.getElementById("studentIdError"),
    studentName: document.getElementById("studentNameError"),
    birthday: document.getElementById("birthdayError"),
    className: document.getElementById("classNameError"),
    score: document.getElementById("scoreError"),
    email: document.getElementById("emailError")
};

openAddBtn.addEventListener("click", openAddForm);
closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
});

form.addEventListener("submit", handleSubmit);
tableBody.addEventListener("click", handleTableAction);

renderStudents();
updateStatistics();

function loadStudents() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        return JSON.parse(saved);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStudents));
    return defaultStudents;
}

function saveStudents() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function openAddForm() {
    editingIndex = -1;
    formTitle.textContent = "Thêm sinh viên";
    saveBtn.textContent = "Lưu sinh viên";
    resetForm();
    showModal();
}

function showModal() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    fields.studentId.focus();
}

function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    resetForm();
}

function resetForm() {
    form.reset();
    Object.values(errors).forEach(error => error.textContent = "");
}

function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const student = {
        id: fields.studentId.value.trim(),
        name: fields.studentName.value.trim(),
        birthday: fields.birthday.value,
        className: fields.className.value,
        score: Number(fields.score.value),
        email: fields.email.value.trim()
    };

    if (editingIndex === -1) {
        students.push(student);
        showMessage("Đã thêm sinh viên mới.");
    } else {
        students[editingIndex] = student;
        showMessage("Đã cập nhật thông tin sinh viên.");
    }

    saveStudents();
    renderStudents();
    updateStatistics();
    closeModal();
}

function validateForm() {
    let valid = true;
    Object.values(errors).forEach(error => error.textContent = "");

    const id = fields.studentId.value.trim();
    const name = fields.studentName.value.trim();
    const score = Number(fields.score.value);
    const email = fields.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!/^\d{10}$/.test(id)) {
        errors.studentId.textContent = "Mã sinh viên cần đúng 10 chữ số.";
        valid = false;
    }

    const duplicate = students.some((student, index) => student.id === id && index !== editingIndex);
    if (duplicate) {
        errors.studentId.textContent = "Mã sinh viên đã tồn tại.";
        valid = false;
    }

    if (name.length < 2) {
        errors.studentName.textContent = "Họ tên không được để trống.";
        valid = false;
    }

    if (!fields.birthday.value) {
        errors.birthday.textContent = "Vui lòng chọn ngày sinh.";
        valid = false;
    }

    if (!fields.className.value) {
        errors.className.textContent = "Vui lòng chọn lớp học.";
        valid = false;
    }

    if (Number.isNaN(score) || score < 0 || score > 10) {
        errors.score.textContent = "Điểm phải nằm trong khoảng 0 đến 10.";
        valid = false;
    }

    if (!emailRegex.test(email)) {
        errors.email.textContent = "Email chưa đúng định dạng.";
        valid = false;
    }

    return valid;
}

function renderStudents() {
    tableBody.textContent = "";

    if (students.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 7;
        cell.className = "empty-row";
        cell.textContent = "Chưa có sinh viên nào trong danh sách.";
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }

    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${formatDate(student.birthday)}</td>
            <td>${student.className}</td>
            <td>${student.email}</td>
            <td>${Number(student.score).toFixed(1)}</td>
            <td>
                <div class="action-group">
                    <button class="action-btn edit-btn" data-action="edit" data-index="${index}">Sửa</button>
                    <button class="action-btn delete-btn" data-action="delete" data-index="${index}">Xóa</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function handleTableAction(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const index = Number(button.dataset.index);
    const action = button.dataset.action;

    if (action === "edit") {
        openEditForm(index);
    }

    if (action === "delete") {
        deleteStudent(index);
    }
}

function openEditForm(index) {
    editingIndex = index;
    const student = students[index];

    fields.studentId.value = student.id;
    fields.studentName.value = student.name;
    fields.birthday.value = student.birthday;
    fields.className.value = student.className;
    fields.score.value = student.score;
    fields.email.value = student.email;

    formTitle.textContent = "Cập nhật sinh viên";
    saveBtn.textContent = "Cập nhật";
    showModal();
}

function deleteStudent(index) {
    const student = students[index];
    const confirmed = confirm(`Bạn có chắc muốn xóa sinh viên ${student.name}?`);
    if (!confirmed) return;

    students.splice(index, 1);
    saveStudents();
    renderStudents();
    updateStatistics();
    showMessage("Đã xóa sinh viên khỏi danh sách.");
}

function updateStatistics() {
    const total = students.length;
    const average = total === 0 ? 0 : students.reduce((sum, student) => sum + Number(student.score), 0) / total;
    const good = students.filter(student => Number(student.score) >= 7).length;

    document.getElementById("totalStudents").textContent = total;
    document.getElementById("averageScore").textContent = average.toFixed(2);
    document.getElementById("goodStudents").textContent = good;
}

function showMessage(text) {
    messageBox.textContent = text;
    setTimeout(() => {
        messageBox.textContent = "";
    }, 2500);
}

function formatDate(value) {
    if (!value) return "";
    const parts = value.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}
