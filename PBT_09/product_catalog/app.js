function svgImg(label, color) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='420' height='260'><rect width='100%' height='100%' fill='${color}'/><circle cx='330' cy='55' r='42' fill='rgba(255,255,255,.25)'/><text x='28' y='138' font-size='34' font-family='Arial' fill='white' font-weight='700'>${label}</text></svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}
const products = [
    { id: 1, name: 'BPhone Luan Edition', price: 12990000, category: 'phone', image: svgImg('BPhone', '#b45309'), rating: 4.4, inStock: true },
    { id: 2, name: 'iPhone 16', price: 25990000, category: 'phone', image: svgImg('iPhone', '#1d4ed8'), rating: 4.8, inStock: true },
    { id: 3, name: 'Galaxy S24 FE', price: 18990000, category: 'phone', image: svgImg('Galaxy', '#7c3aed'), rating: 4.5, inStock: true },
    { id: 4, name: 'MacBook Air M3', price: 28990000, category: 'laptop', image: svgImg('MacBook', '#475569'), rating: 4.7, inStock: true },
    { id: 5, name: 'ThinkPad Bắc Ninh', price: 23990000, category: 'laptop', image: svgImg('ThinkPad', '#991b1b'), rating: 4.6, inStock: false },
    { id: 6, name: 'Dell Inspiron 15', price: 17990000, category: 'laptop', image: svgImg('Dell', '#0f766e'), rating: 4.2, inStock: true },
    { id: 7, name: 'iPad Air', price: 16990000, category: 'tablet', image: svgImg('iPad', '#059669'), rating: 4.6, inStock: true },
    { id: 8, name: 'Xiaomi Pad 6', price: 7990000, category: 'tablet', image: svgImg('Pad 6', '#ea580c'), rating: 4.3, inStock: true },
    { id: 9, name: 'AirPods Pro', price: 6990000, category: 'accessory', image: svgImg('AirPods', '#0891b2'), rating: 4.5, inStock: true },
    { id: 10, name: 'Galaxy Buds', price: 3290000, category: 'accessory', image: svgImg('Buds', '#db2777'), rating: 4.0, inStock: true },
    { id: 11, name: 'Sạc nhanh 65W', price: 690000, category: 'accessory', image: svgImg('65W', '#4b5563'), rating: 4.1, inStock: true },
    { id: 12, name: 'Bàn phím cơ Mini', price: 1590000, category: 'accessory', image: svgImg('Keyboard', '#16a34a'), rating: 4.4, inStock: true }
];
let state = { keyword: '', category: 'all', sort: 'default', cart: 0 };

document.body.innerHTML = `
<main class="page">
    <header class="topbar">
        <section class="brand"><h1>LuanTech Catalog</h1><p>Render bằng DOM, search, filter, sort và modal.</p></section>
        <section class="cart">🛒 Giỏ hàng: <span id="cartBadge">0</span></section>
    </header>
    <section class="controls">
        <input id="searchInput" class="search" type="search" placeholder="Tìm điện thoại, laptop...">
        <select id="sortSelect" class="sort"><option value="default">Sắp xếp</option><option value="priceAsc">Giá tăng</option><option value="priceDesc">Giá giảm</option><option value="nameAsc">Tên A-Z</option><option value="ratingDesc">Đánh giá cao nhất</option></select>
        <button id="darkToggle" class="btn">Dark mode</button>
    </section>
    <section id="categories" class="category-row"></section>
    <section id="productGrid" class="grid"></section>
</main>
<section id="modal" class="modal" aria-hidden="true"></section>`;
const grid = document.querySelector('#productGrid');
const categories = document.querySelector('#categories');
const modal = document.querySelector('#modal');
function formatPrice(n) { return n.toLocaleString('vi-VN') + 'đ'; }
function getFilteredProducts() {
    let result = products.filter(p => p.name.toLowerCase().includes(state.keyword.toLowerCase()));
    if (state.category !== 'all') result = result.filter(p => p.category === state.category);
    if (state.sort === 'priceAsc') result = [...result].sort((a,b)=>a.price-b.price);
    if (state.sort === 'priceDesc') result = [...result].sort((a,b)=>b.price-a.price);
    if (state.sort === 'nameAsc') result = [...result].sort((a,b)=>a.name.localeCompare(b.name));
    if (state.sort === 'ratingDesc') result = [...result].sort((a,b)=>b.rating-a.rating);
    return result;
}
function renderCategories() {
    const list = ['all', ...new Set(products.map(p => p.category))];
    categories.replaceChildren();
    list.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `category-btn${state.category === cat ? ' active' : ''}`;
        btn.dataset.category = cat;
        btn.textContent = cat === 'all' ? 'Tất cả' : cat;
        categories.appendChild(btn);
    });
}
function renderProducts() {
    grid.replaceChildren();
    getFilteredProducts().forEach(product => {
        const card = document.createElement('article');
        card.className = 'card';
        card.dataset.id = product.id;
        const img = document.createElement('img'); img.src = product.image; img.alt = product.name;
        const body = document.createElement('div'); body.className = 'body';
        const title = document.createElement('h3'); title.textContent = product.name;
        const price = document.createElement('p'); price.className = 'price'; price.textContent = formatPrice(product.price);
        const meta = document.createElement('p'); meta.innerHTML = `⭐ ${product.rating} · <span class="${product.inStock ? 'stock' : 'out'}">${product.inStock ? 'Còn hàng' : 'Hết hàng'}</span>`;
        const actions = document.createElement('div'); actions.className = 'actions';
        const detail = document.createElement('button'); detail.className = 'btn detail-btn'; detail.textContent = 'Chi tiết';
        const add = document.createElement('button'); add.className = 'btn add-btn'; add.textContent = 'Thêm giỏ';
        actions.append(detail, add); body.append(title, price, meta, actions); card.append(img, body); grid.appendChild(card);
    });
}
function openModal(product) {
    modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false');
    modal.innerHTML = `<section class="modal-card"><button class="modal-close">Đóng</button><h2>${product.name}</h2><p><strong>Giá:</strong> ${formatPrice(product.price)}</p><p><strong>Loại:</strong> ${product.category}</p><p><strong>Rating:</strong> ${product.rating}/5</p><p>Sản phẩm phù hợp cho sinh viên cần thiết bị học tập và làm bài web.</p></section>`;
}
function init() { renderCategories(); renderProducts(); }
document.querySelector('#searchInput').addEventListener('input', e => { state.keyword = e.target.value; renderProducts(); });
document.querySelector('#sortSelect').addEventListener('change', e => { state.sort = e.target.value; renderProducts(); });
document.querySelector('#darkToggle').addEventListener('click', () => document.body.classList.toggle('dark-mode'));
categories.addEventListener('click', e => { if (!e.target.matches('button')) return; state.category = e.target.dataset.category; renderCategories(); renderProducts(); });
grid.addEventListener('click', e => { const card = e.target.closest('.card'); if (!card) return; const product = products.find(p => p.id === Number(card.dataset.id)); if (e.target.classList.contains('add-btn')) { state.cart++; document.querySelector('#cartBadge').textContent = state.cart; } else { openModal(product); } });
modal.addEventListener('click', e => { if (e.target === modal || e.target.classList.contains('modal-close')) { modal.classList.remove('show'); modal.innerHTML = ''; } });
init();
