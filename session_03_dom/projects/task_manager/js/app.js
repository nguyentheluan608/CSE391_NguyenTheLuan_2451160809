const TASK_STORAGE_KEY = "luan_tasks_session03";

const defaultTasks = [
    { id: Date.now() - 3, title: "Ôn DOM cơ bản", description: "Luyện querySelector, textContent và classList.", deadline: "2026-06-05", priority: "Cao", completed: true },
    { id: Date.now() - 2, title: "Làm bài quản lý sinh viên", description: "Hoàn thiện thêm, sửa, xóa và localStorage.", deadline: "2026-06-08", priority: "Trung bình", completed: false },
    { id: Date.now() - 1, title: "Đọc lại event delegation", description: "Hiểu cách xử lý nút trong danh sách động.", deadline: "2026-06-10", priority: "Thấp", completed: false }
];

let tasks = loadTasks();
let editingTaskId = null;

const openTaskBtn = document.getElementById("openTaskBtn");
const closeTaskBtn = document.getElementById("closeTaskBtn");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");
const taskModal = document.getElementById("taskModal");
const taskForm = document.getElementById("taskForm");
const taskFormTitle = document.getElementById("taskFormTitle");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskList = document.getElementById("taskList");
const notice = document.getElementById("notice");

const taskFields = {
    title: document.getElementById("taskTitle"),
    description: document.getElementById("taskDescription"),
    deadline: document.getElementById("deadline"),
    priority: document.getElementById("priority"),
    completed: document.getElementById("completed")
};

const taskErrors = {
    title: document.getElementById("taskTitleError"),
    description: document.getElementById("taskDescriptionError"),
    deadline: document.getElementById("deadlineError")
};

openTaskBtn.addEventListener("click", openAddTaskForm);
closeTaskBtn.addEventListener("click", closeTaskModal);
cancelTaskBtn.addEventListener("click", closeTaskModal);
taskForm.addEventListener("submit", handleTaskSubmit);
taskList.addEventListener("click", handleTaskClick);

taskModal.addEventListener("click", (event) => {
    if (event.target === taskModal) closeTaskModal();
});

renderTasks();
updateTaskSummary();

function loadTasks() {
    const saved = localStorage.getItem(TASK_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(defaultTasks));
    return defaultTasks;
}

function saveTasks() {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
}

function openAddTaskForm() {
    editingTaskId = null;
    taskFormTitle.textContent = "Thêm công việc";
    saveTaskBtn.textContent = "Lưu công việc";
    resetTaskForm();
    showTaskModal();
}

function showTaskModal() {
    taskModal.classList.add("show");
    taskModal.setAttribute("aria-hidden", "false");
    taskFields.title.focus();
}

function closeTaskModal() {
    taskModal.classList.remove("show");
    taskModal.setAttribute("aria-hidden", "true");
    resetTaskForm();
}

function resetTaskForm() {
    taskForm.reset();
    Object.values(taskErrors).forEach(error => error.textContent = "");
}

function handleTaskSubmit(event) {
    event.preventDefault();

    if (!validateTaskForm()) return;

    const taskData = {
        id: editingTaskId || Date.now(),
        title: taskFields.title.value.trim(),
        description: taskFields.description.value.trim(),
        deadline: taskFields.deadline.value,
        priority: taskFields.priority.value,
        completed: taskFields.completed.checked
    };

    if (editingTaskId === null) {
        tasks.push(taskData);
        showNotice("Đã thêm công việc mới.");
    } else {
        tasks = tasks.map(task => task.id === editingTaskId ? taskData : task);
        showNotice("Đã cập nhật công việc.");
    }

    saveTasks();
    renderTasks();
    updateTaskSummary();
    closeTaskModal();
}

function validateTaskForm() {
    let valid = true;
    Object.values(taskErrors).forEach(error => error.textContent = "");

    if (taskFields.title.value.trim().length < 2) {
        taskErrors.title.textContent = "Tiêu đề công việc không được để trống.";
        valid = false;
    }

    if (taskFields.description.value.trim().length < 5) {
        taskErrors.description.textContent = "Mô tả nên có ít nhất 5 ký tự.";
        valid = false;
    }

    if (!taskFields.deadline.value) {
        taskErrors.deadline.textContent = "Vui lòng chọn hạn hoàn thành.";
        valid = false;
    }

    return valid;
}

function renderTasks() {
    taskList.textContent = "";

    if (tasks.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "Chưa có công việc nào. Hãy thêm công việc đầu tiên.";
        taskList.appendChild(empty);
        return;
    }

    tasks.forEach(task => {
        const card = document.createElement("article");
        card.className = task.completed ? "task-card done" : "task-card";
        card.dataset.id = task.id;

        const title = document.createElement("h3");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.textContent = task.description;

        const meta = document.createElement("div");
        meta.className = "task-meta";
        meta.innerHTML = `
            <span>Hạn: ${formatDate(task.deadline)}</span>
            <span>Ưu tiên: ${task.priority}</span>
            <span>${task.completed ? "Đã hoàn thành" : "Chưa xong"}</span>
        `;

        const actions = document.createElement("div");
        actions.className = "card-actions";
        actions.innerHTML = `
            <button class="card-btn toggle-btn" data-action="toggle">${task.completed ? "Bỏ hoàn thành" : "Hoàn thành"}</button>
            <button class="card-btn edit-btn" data-action="edit">Sửa</button>
            <button class="card-btn delete-btn" data-action="delete">Xóa</button>
        `;

        card.append(title, description, meta, actions);
        taskList.appendChild(card);
    });
}

function handleTaskClick(event) {
    const button = event.target.closest("button[data-action]");
    const card = event.target.closest(".task-card");
    if (!button || !card) return;

    const id = Number(card.dataset.id);
    const action = button.dataset.action;

    if (action === "toggle") toggleTask(id);
    if (action === "edit") openEditTaskForm(id);
    if (action === "delete") deleteTask(id);
}

function toggleTask(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks();
    renderTasks();
    updateTaskSummary();
    showNotice("Đã đổi trạng thái công việc.");
}

function openEditTaskForm(id) {
    const task = tasks.find(item => item.id === id);
    if (!task) return;

    editingTaskId = id;
    taskFields.title.value = task.title;
    taskFields.description.value = task.description;
    taskFields.deadline.value = task.deadline;
    taskFields.priority.value = task.priority;
    taskFields.completed.checked = task.completed;

    taskFormTitle.textContent = "Cập nhật công việc";
    saveTaskBtn.textContent = "Cập nhật";
    showTaskModal();
}

function deleteTask(id) {
    const task = tasks.find(item => item.id === id);
    const confirmed = confirm(`Bạn có chắc muốn xóa công việc "${task.title}"?`);
    if (!confirmed) return;

    tasks = tasks.filter(item => item.id !== id);
    saveTasks();
    renderTasks();
    updateTaskSummary();
    showNotice("Đã xóa công việc.");
}

function updateTaskSummary() {
    const total = tasks.length;
    const done = tasks.filter(task => task.completed).length;
    const pending = total - done;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("doneTasks").textContent = done;
    document.getElementById("pendingTasks").textContent = pending;
}

function showNotice(text) {
    notice.textContent = text;
    setTimeout(() => {
        notice.textContent = "";
    }, 2500);
}

function formatDate(value) {
    if (!value) return "";
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
}
