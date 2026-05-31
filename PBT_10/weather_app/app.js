const form = document.querySelector("#weatherForm");
const cityInput = document.querySelector("#cityInput");
const stateBox = document.querySelector("#stateBox");
const historyList = document.querySelector("#historyList");

const sampleWeather = {
    current_condition: [{ temp_C: "28", humidity: "74", weatherDesc: [{ value: "Có mây nhẹ" }] }],
    nearest_area: [{ areaName: [{ value: "Hanoi" }], country: [{ value: "Vietnam" }] }]
};

function getMode() {
    return new URLSearchParams(location.search).get("state") || "normal";
}

function showLoading() {
    stateBox.className = "state-card loading";
    stateBox.innerHTML = `<div class="spinner"></div><h2>Đang tải thời tiết...</h2><p>Ứng dụng đang gửi request đến API thời tiết.</p>`;
}

function showError(message = "Không lấy được dữ liệu thời tiết. Vui lòng kiểm tra mạng hoặc thử thành phố khác.") {
    stateBox.className = "state-card error";
    stateBox.innerHTML = `<h2>❌ Có lỗi xảy ra</h2><p>${message}</p><button class="retry-btn" id="retryBtn">Thử lại</button>`;
    const btn = document.querySelector("#retryBtn");
    if (btn) btn.addEventListener("click", () => searchWeather(cityInput.value.trim() || "Hanoi"));
}

function showWeather(data, fromFallback = false) {
    const current = data.current_condition[0];
    const area = data.nearest_area?.[0];
    const city = area?.areaName?.[0]?.value || cityInput.value || "Hanoi";
    const country = area?.country?.[0]?.value || "Vietnam";
    const desc = current.weatherDesc?.[0]?.value || "Không rõ";
    stateBox.className = "state-card";
    stateBox.innerHTML = `
        <div class="city-title">
            <div class="weather-icon">⛅</div>
            <div>
                <h2>${city}, ${country}</h2>
                <p>${desc}${fromFallback ? " - dữ liệu mẫu khi không có mạng" : ""}</p>
            </div>
        </div>
        <div class="weather-info">
            <div class="metric"><span>Nhiệt độ</span><strong>${current.temp_C}°C</strong></div>
            <div class="metric"><span>Độ ẩm</span><strong>${current.humidity}%</strong></div>
        </div>`;
    saveHistory(city);
}

function saveHistory(city) {
    const old = JSON.parse(localStorage.getItem("luan_weather_history") || "[]");
    const next = [city, ...old.filter(item => item.toLowerCase() !== city.toLowerCase())].slice(0, 5);
    localStorage.setItem("luan_weather_history", JSON.stringify(next));
    renderHistory();
}

function renderHistory() {
    const items = JSON.parse(localStorage.getItem("luan_weather_history") || "[]");
    historyList.innerHTML = "";
    if (items.length === 0) {
        historyList.textContent = "Chưa có lịch sử tìm kiếm.";
        return;
    }
    items.forEach(city => {
        const btn = document.createElement("button");
        btn.textContent = city;
        btn.addEventListener("click", () => {
            cityInput.value = city;
            searchWeather(city);
        });
        historyList.appendChild(btn);
    });
}

async function searchWeather(city) {
    if (!city) return showError("Vui lòng nhập tên thành phố.");
    showLoading();
    if (getMode() === "loading") return;
    if (getMode() === "success") return setTimeout(() => showWeather(sampleWeather, true), 400);
    if (getMode() === "error") return setTimeout(() => showError("Demo lỗi: API không phản hồi."), 500);

    try {
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        showWeather(data);
    } catch (error) {
        showWeather(sampleWeather, true);
    }
}

form.addEventListener("submit", event => {
    event.preventDefault();
    searchWeather(cityInput.value.trim());
});

renderHistory();
searchWeather(cityInput.value.trim());