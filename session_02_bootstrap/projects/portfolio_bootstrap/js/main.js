const topButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
    if (!topButton) return;
    topButton.classList.toggle("show", window.scrollY > 400);
});

if (topButton) {
    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        projectItems.forEach((item) => {
            const match = filter === "all" || item.dataset.category === filter;
            item.classList.toggle("d-none", !match);
        });
    });
});

const forms = document.querySelectorAll("form");
forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const alertBox = document.createElement("div");
        alertBox.className = "alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 shadow";
        alertBox.style.zIndex = "2000";
        alertBox.textContent = "Đã ghi nhận thông tin demo.";
        document.body.appendChild(alertBox);
        setTimeout(() => alertBox.remove(), 2200);
    });
});
