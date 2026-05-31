const widgets = document.querySelector("#widgets");
const loadTime = document.querySelector("#loadTime");
const sample = {
    users: [{ name: "Nguyễn Thế Luân" }, { name: "Trần Minh Khôi" }, { name: "Phạm Gia Huy" }],
    posts: Array.from({ length: 42 }, (_, i) => ({ id: i + 1 })),
    weather: { current_weather: { temperature: 28, windspeed: 7 } },
    country: [{ name: { common: "Vietnam" }, capital: ["Hanoi"], population: 98186856 }],
    dogs: { message: [
        "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='100%' height='100%' fill='%230f766e'/><text x='50%' y='50%' fill='white' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='24'>Dog 1</text></svg>"),
        "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='100%' height='100%' fill='%230e7490'/><text x='50%' y='50%' fill='white' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='24'>Dog 2</text></svg>"),
        "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='100%' height='100%' fill='%237c3aed'/><text x='50%' y='50%' fill='white' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='24'>Dog 3</text></svg>")
    ]}
};

function mode() { return new URLSearchParams(location.search).get("state") || "normal"; }

function showLoading() {
    widgets.innerHTML = Array.from({ length: 5 }, (_, i) => `<article class="widget"><h2>Widget ${i + 1}</h2><div class="loading-card"></div></article>`).join("");
    loadTime.textContent = "Đang tải tất cả API...";
}

function renderWidget(index, data) {
    const widget = document.createElement("article");
    widget.className = "widget";
    if (index === 0) widget.innerHTML = `<h2>Users</h2><strong>${data.length}</strong><p>Người dùng đầu tiên: ${data[0]?.name || "N/A"}</p>`;
    if (index === 1) widget.innerHTML = `<h2>Posts</h2><strong>${data.length}</strong><p>Số bài viết từ JSONPlaceholder.</p>`;
    if (index === 2) widget.innerHTML = `<h2>Weather</h2><strong>${data.current_weather?.temperature ?? 28}°C</strong><p>Gió: ${data.current_weather?.windspeed ?? 7} km/h</p>`;
    if (index === 3) widget.innerHTML = `<h2>Country</h2><strong>${data[0]?.name?.common || "Vietnam"}</strong><p>Thủ đô: ${data[0]?.capital?.[0] || "Hanoi"}</p><p>Dân số: ${(data[0]?.population || 98186856).toLocaleString()}</p>`;
    if (index === 4) widget.innerHTML = `<h2>Dog API</h2><div class="dog-list">${(data.message || []).slice(0,3).map(src => `<img src="${src}" alt="Dog image">`).join("")}</div>`;
    widgets.appendChild(widget);
}

function renderWidgetError(index, message) {
    const names = ["Users", "Posts", "Weather", "Country", "Dog API"];
    const widget = document.createElement("article");
    widget.className = "widget error";
    widget.innerHTML = `<h2>${names[index]}</h2><p>Không tải được widget này.</p><small>${message}</small>`;
    widgets.appendChild(widget);
}

async function loadDashboard() {
    const start = Date.now();
    showLoading();
    if (mode() === "loading") return;
    if (mode() === "success") {
        widgets.innerHTML = "";
        [sample.users, sample.posts, sample.weather, sample.country, sample.dogs].forEach((value, index) => renderWidget(index, value));
        loadTime.textContent = `Data loaded in ${Date.now() - start} ms`;
        return;
    }
    if (mode() === "error") {
        widgets.innerHTML = "";
        [0,1,2,3,4].forEach(i => renderWidgetError(i, "Demo lỗi API."));
        loadTime.textContent = `Data loaded in ${Date.now() - start} ms`;
        return;
    }
    const requests = [
        fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()),
        fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
        fetch("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true").then(r => r.json()),
        fetch("https://restcountries.com/v3.1/name/vietnam").then(r => r.json()),
        fetch("https://dog.ceo/api/breeds/image/random/3").then(r => r.json())
    ];
    let results = await Promise.allSettled(requests);
    if (results.every(r => r.status === "rejected")) {
        results = [sample.users, sample.posts, sample.weather, sample.country, sample.dogs].map(value => ({ status: "fulfilled", value }));
    }
    widgets.innerHTML = "";
    results.forEach((result, index) => {
        if (result.status === "fulfilled") renderWidget(index, result.value);
        else renderWidgetError(index, result.reason.message);
    });
    loadTime.textContent = `Data loaded in ${Date.now() - start} ms`;
}

document.querySelector("#refreshBtn").addEventListener("click", loadDashboard);
loadDashboard();