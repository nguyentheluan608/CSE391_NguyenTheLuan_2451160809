function img(label, color) { const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='520'><rect width='100%' height='100%' fill='${color}'/><text x='60' y='275' font-size='52' font-family='Arial' fill='white' font-weight='700'>${label}</text></svg>`; return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg); }
const photos = [
    { title: 'Ảnh 1 - Cổng làng quan họ', src: img('Quan họ Bắc Ninh', '#2563eb') },
    { title: 'Ảnh 2 - Góc học tập', src: img('Góc học tập', '#059669') },
    { title: 'Ảnh 3 - Laptop làm Web', src: img('Laptop Web', '#7c3aed') },
    { title: 'Ảnh 4 - Buổi tối ôn JS', src: img('Ôn JavaScript', '#dc2626') },
    { title: 'Ảnh 5 - Hoàn thành PBT', src: img('Hoàn thành PBT', '#ea580c') }
];
let index = 0; let playing = false; let timer = null;
const mainImage = document.querySelector('#mainImage'); const caption = document.querySelector('#caption'); const thumbs = document.querySelector('#thumbs'); const status = document.querySelector('#status');
function render() { mainImage.src = photos[index].src; caption.textContent = photos[index].title; thumbs.replaceChildren(); photos.forEach((p, i) => { const btn = document.createElement('button'); btn.setAttribute('aria-label', `Chọn ảnh ${i + 1}`); if (i === index) btn.classList.add('active'); const image = document.createElement('img'); image.src = p.src; image.alt = p.title; btn.appendChild(image); btn.addEventListener('click', () => { index = i; render(); }); thumbs.appendChild(btn); }); }
function next() { index = (index + 1) % photos.length; render(); }
function prev() { index = (index - 1 + photos.length) % photos.length; render(); }
function togglePlay() { playing = !playing; status.textContent = playing ? 'Slideshow đang chạy' : 'Slideshow đang dừng'; if (playing) timer = setInterval(next, 1300); else clearInterval(timer); }
document.querySelector('#nextBtn').addEventListener('click', next); document.querySelector('#prevBtn').addEventListener('click', prev);
mainImage.addEventListener('click', () => { document.querySelector('#lightboxImg').src = photos[index].src; document.querySelector('#lightbox').classList.add('show'); });
document.querySelector('#closeLightbox').addEventListener('click', () => document.querySelector('#lightbox').classList.remove('show'));
const commands = ['Next image', 'Previous image', 'Play or pause slideshow', 'Open lightbox', 'Close overlay'];
function openPalette() { const palette = document.querySelector('#palette'); palette.classList.add('show'); document.querySelector('#commandSearch').value = ''; renderCommands(''); document.querySelector('#commandSearch').focus(); }
function closePalette() { document.querySelector('#palette').classList.remove('show'); }
function renderCommands(keyword) { const list = document.querySelector('#commandList'); list.replaceChildren(); commands.filter(c => c.toLowerCase().includes(keyword.toLowerCase())).forEach(c => { const li = document.createElement('li'); li.tabIndex = 0; li.textContent = c; list.appendChild(li); }); }
document.querySelector('#openPalette').addEventListener('click', openPalette); document.querySelector('#commandSearch').addEventListener('input', e => renderCommands(e.target.value));
document.addEventListener('keydown', e => { if (e.ctrlKey && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); } else if (e.key === 'ArrowRight') next(); else if (e.key === 'ArrowLeft') prev(); else if (e.key === ' ') { e.preventDefault(); togglePlay(); } else if (/^[1-9]$/.test(e.key)) { const n = Number(e.key) - 1; if (photos[n]) { index = n; render(); } } else if (e.key === 'Escape') { closePalette(); document.querySelector('#lightbox').classList.remove('show'); } else if (e.key === 'Enter' && document.querySelector('#palette').classList.contains('show')) { closePalette(); } });
render();
