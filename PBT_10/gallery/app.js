const grid = document.querySelector("#galleryGrid");
const trigger = document.querySelector("#load-trigger");
const loading = document.querySelector("#loadingMore");
const errorBox = document.querySelector("#errorBox");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
let page = 1;
let isLoading = false;

function mode() { return new URLSearchParams(location.search).get("state") || "normal"; }

function samplePhotos(start = 1) {
    return Array.from({ length: 20 }, (_, i) => {
        const id = start + i;
        const color = ["1d4ed8", "b45309", "047857", "7c3aed", "be123c"][id % 5];
        return { id, author: `Tác giả ${id}`, download_url: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='500' height='360'><rect width='100%' height='100%' fill='%23${color}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='36' font-family='Arial'>Ảnh ${id}</text></svg>`)}` };
    });
}

function createPhoto(photo) {
    const card = document.createElement("article");
    card.className = "photo-card";
    const img = document.createElement("img");
    img.dataset.src = photo.download_url;
    img.alt = `Ảnh của ${photo.author}`;
    img.loading = "lazy";
    const title = document.createElement("p");
    title.textContent = `${photo.author} - #${photo.id}`;
    card.append(img, title);
    card.addEventListener("click", () => openLightbox(photo.download_url, img.alt));
    grid.appendChild(card);
    lazyObserver.observe(img);
}

const lazyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            lazyObserver.unobserve(img);
        }
    });
});

async function loadMorePhotos(forceError = false) {
    if (isLoading) return;
    isLoading = true;
    loading.classList.add("show");
    errorBox.textContent = "";
    if (mode() === "loading") return;
    if (mode() === "success") { samplePhotos((page - 1) * 20 + 1).forEach(createPhoto); page++; loading.classList.remove("show"); isLoading = false; return; }
    if (mode() === "error" || forceError) {
        setTimeout(() => { loading.classList.remove("show"); errorBox.textContent = "Không tải được ảnh mới. Vui lòng thử lại sau."; isLoading = false; }, 500);
        return;
    }
    try {
        const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const photos = await res.json();
        photos.forEach(createPhoto);
    } catch (error) {
        samplePhotos((page - 1) * 20 + 1).forEach(createPhoto);
    }
    page++;
    loading.classList.remove("show");
    isLoading = false;
}

function openLightbox(src, alt) { lightboxImage.src = src; lightboxImage.alt = alt; lightbox.classList.add("open"); }
document.querySelector("#closeLightbox").addEventListener("click", () => lightbox.classList.remove("open"));
document.addEventListener("keydown", e => { if (e.key === "Escape") lightbox.classList.remove("open"); });
document.querySelector("#demoError").addEventListener("click", () => loadMorePhotos(true));

const scrollObserver = new IntersectionObserver(entries => { if (entries[0].isIntersecting) loadMorePhotos(); });
scrollObserver.observe(trigger);
loadMorePhotos();