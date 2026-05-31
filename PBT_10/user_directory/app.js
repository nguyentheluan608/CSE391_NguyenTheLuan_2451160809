const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    async getUsers() { const r = await fetch(`${this.baseURL}/users`); if (!r.ok) throw new Error(`HTTP ${r.status}`); return await r.json(); },
    async getUser(id) { const r = await fetch(`${this.baseURL}/users/${id}`); if (!r.ok) throw new Error(`HTTP ${r.status}`); return await r.json(); },
    async createUser(data) { const r = await fetch(`${this.baseURL}/users`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); if (!r.ok) throw new Error(`HTTP ${r.status}`); return await r.json(); },
    async updateUser(id, data) { const r = await fetch(`${this.baseURL}/users/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); if (!r.ok) throw new Error(`HTTP ${r.status}`); return await r.json(); },
    async deleteUser(id) { const r = await fetch(`${this.baseURL}/users/${id}`, { method: "DELETE" }); if (!r.ok) throw new Error(`HTTP ${r.status}`); return true; }
};

const sampleUsers = [
    { id: 1, name: "Nguyễn Thế Luân", email: "luan.bacninh@example.com", company: { name: "Luan Digital" } },
    { id: 2, name: "Trần Minh Khôi", email: "khoi@example.com", company: { name: "Kinh Bắc Tech" } },
    { id: 3, name: "Phạm Gia Huy", email: "huy@example.com", company: { name: "Frontend Lab" } },
    { id: 4, name: "Đỗ Anh Quân", email: "quan@example.com", company: { name: "Async Studio" } },
    { id: 5, name: "Lê Hải Nam", email: "nam@example.com", company: { name: "API Works" } },
    { id: 6, name: "Bùi Quốc Việt", email: "viet@example.com", company: { name: "DOM Factory" } }
];

let users = [];
const list = document.querySelector("#userList");
const form = document.querySelector("#userForm");
const searchInput = document.querySelector("#searchInput");
const toast = document.querySelector("#toast");
const idInput = document.querySelector("#userId");
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const companyInput = document.querySelector("#companyInput");

const ui = {
    renderUsers(data) {
        list.innerHTML = "";
        if (data.length === 0) {
            list.innerHTML = `<div class="empty">Không tìm thấy user phù hợp.</div>`;
            return;
        }
        data.forEach(user => {
            const card = document.createElement("article");
            card.className = "user-card";
            card.innerHTML = `<h3>${user.name}</h3><p>${user.email}</p><p>Công ty: ${user.company?.name || user.company || "Chưa có"}</p><div class="actions"><button class="edit" data-id="${user.id}">Edit</button><button class="delete" data-id="${user.id}">Delete</button></div>`;
            list.appendChild(card);
        });
    },
    showLoading() { list.innerHTML = Array.from({ length: 6 }, () => `<div class="skeleton"></div>`).join(""); },
    hideLoading() {},
    showError(message) { list.innerHTML = `<div class="error-box"><h2>Không tải được dữ liệu</h2><p>${message}</p></div>`; },
    showSuccess(message) { toast.textContent = message; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 1700); }
};

function mode() { return new URLSearchParams(location.search).get("state") || "normal"; }

async function loadUsers(forceError = false) {
    ui.showLoading();
    if (mode() === "loading") return;
    if (mode() === "success") return setTimeout(() => { users = sampleUsers; ui.renderUsers(users); }, 400);
    if (mode() === "error" || forceError) return setTimeout(() => ui.showError("Demo lỗi API: không thể kết nối server."), 600);
    try {
        users = await api.getUsers();
    } catch (error) {
        users = sampleUsers;
        ui.showSuccess("Đang dùng dữ liệu mẫu vì môi trường không có Internet.");
    }
    ui.renderUsers(users);
}

function resetForm() { idInput.value = ""; form.reset(); }
function filterUsers() { const q = searchInput.value.toLowerCase(); ui.renderUsers(users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))); }

form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = { name: nameInput.value, email: emailInput.value, company: { name: companyInput.value } };
    const id = idInput.value;
    if (id) {
        try { await api.updateUser(id, data); } catch {}
        users = users.map(u => u.id == id ? { ...u, ...data } : u);
        ui.showSuccess("Đã cập nhật user.");
    } else {
        try { await api.createUser(data); } catch {}
        users.unshift({ id: Date.now(), ...data });
        ui.showSuccess("Đã thêm user mới.");
    }
    resetForm(); ui.renderUsers(users);
});

list.addEventListener("click", async e => {
    const id = e.target.dataset.id;
    if (!id) return;
    const found = users.find(u => u.id == id);
    if (e.target.classList.contains("edit")) {
        idInput.value = found.id; nameInput.value = found.name; emailInput.value = found.email; companyInput.value = found.company?.name || found.company || "";
    }
    if (e.target.classList.contains("delete") && confirm("Xóa user này?")) {
        try { await api.deleteUser(id); } catch {}
        users = users.filter(u => u.id != id);
        ui.showSuccess("Đã xóa user."); ui.renderUsers(users);
    }
});

searchInput.addEventListener("input", filterUsers);
document.querySelector("#reloadBtn").addEventListener("click", () => loadUsers());
document.querySelector("#demoErrorBtn").addEventListener("click", () => loadUsers(true));
document.querySelector("#resetBtn").addEventListener("click", resetForm);
loadUsers();