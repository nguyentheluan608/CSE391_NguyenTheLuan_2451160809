const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const list = document.querySelector('#todoList');
const countText = document.querySelector('#todoCount');
const clearBtn = document.querySelector('#clearCompleted');
const filterButtons = document.querySelectorAll('.filter-btn');

function loadTodos() {
    try { return JSON.parse(localStorage.getItem('luan_todos')) || null; } catch (e) { return null; }
}
function saveToStorage() {
    try { localStorage.setItem('luan_todos', JSON.stringify(todos)); } catch (e) {}
}
let todos = loadTodos() || [
    { id: Date.now() - 3, text: 'Hoàn thành bài DOM tree', completed: false },
    { id: Date.now() - 2, text: 'Làm Todo App bằng createElement', completed: true },
    { id: Date.now() - 1, text: 'Chụp screenshot kết quả', completed: false }
];
let currentFilter = 'all';

function saveTodos() { saveToStorage(); }
function filteredTodos() {
    if (currentFilter === 'active') return todos.filter(todo => !todo.completed);
    if (currentFilter === 'completed') return todos.filter(todo => todo.completed);
    return todos;
}
function updateCount() {
    const left = todos.filter(todo => !todo.completed).length;
    countText.textContent = `${left} items left`;
}
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item${todo.completed ? ' completed' : ''}`;
    li.dataset.id = todo.id;

    const checkbox = document.createElement('button');
    checkbox.className = 'toggle-btn';
    checkbox.textContent = todo.completed ? '✅' : '⬜';
    checkbox.setAttribute('aria-label', 'Đổi trạng thái công việc');

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = todo.text;
    span.title = 'Double-click để sửa';

    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.textContent = '❌';
    del.setAttribute('aria-label', 'Xóa công việc');

    li.append(checkbox, span, del);
    return li;
}
function renderTodos() {
    list.replaceChildren();
    filteredTodos().forEach(todo => list.appendChild(createTodoElement(todo)));
    updateCount();
}
form.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    todos.unshift({ id: Date.now(), text, completed: false });
    input.value = '';
    saveTodos();
    renderTodos();
});
list.addEventListener('click', event => {
    const li = event.target.closest('.todo-item');
    if (!li) return;
    const id = Number(li.dataset.id);
    if (event.target.classList.contains('delete-btn')) {
        todos = todos.filter(todo => todo.id !== id);
    } else if (event.target.classList.contains('text') || event.target.classList.contains('toggle-btn')) {
        todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    }
    saveTodos();
    renderTodos();
});
list.addEventListener('dblclick', event => {
    if (!event.target.classList.contains('text')) return;
    const li = event.target.closest('.todo-item');
    const id = Number(li.dataset.id);
    const oldText = event.target.textContent;
    const edit = document.createElement('input');
    edit.className = 'edit-input';
    edit.value = oldText;
    event.target.replaceWith(edit);
    edit.focus();
    edit.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const newText = edit.value.trim();
            if (newText) todos = todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo);
            saveTodos();
            renderTodos();
        }
    });
});
filterButtons.forEach(btn => btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTodos();
}));
clearBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
});
renderTodos();
