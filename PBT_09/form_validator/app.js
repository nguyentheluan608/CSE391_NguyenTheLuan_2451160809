const fields = {
    name: document.querySelector('#fullName'), email: document.querySelector('#email'), password: document.querySelector('#password'), confirm: document.querySelector('#confirmPassword'), phone: document.querySelector('#phone')
};
const msg = { name: document.querySelector('#nameMsg'), email: document.querySelector('#emailMsg'), password: document.querySelector('#passwordMsg'), confirm: document.querySelector('#confirmMsg'), phone: document.querySelector('#phoneMsg') };
const strengthBar = document.querySelector('#strengthBar'); const submitBtn = document.querySelector('#submitBtn');
function setMsg(el, text, ok) { el.textContent = text; el.className = ok ? 'ok' : 'bad'; }
function validateName() { const ok = fields.name.value.trim().length >= 2 && fields.name.value.trim().length <= 50; setMsg(msg.name, ok ? '✅ Tên hợp lệ' : '❌ Tên cần từ 2 đến 50 ký tự', ok); return ok; }
function validateEmail() { const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value); setMsg(msg.email, ok ? '✅ Email hợp lệ' : '❌ Email chưa đúng định dạng', ok); return ok; }
function passwordStrength() { const v = fields.password.value; if (v.length < 8) return { level: 1, text: 'Yếu: cần ít nhất 8 ký tự', color: '#dc2626', width: '30%' }; const medium = /[A-Za-z]/.test(v) && /\d/.test(v); const strong = /[a-z]/.test(v) && /[A-Z]/.test(v) && /\d/.test(v) && /[^A-Za-z0-9]/.test(v); if (strong) return { level: 3, text: 'Mạnh', color: '#16a34a', width: '100%' }; if (medium) return { level: 2, text: 'Trung bình', color: '#f59e0b', width: '65%' }; return { level: 1, text: 'Yếu', color: '#dc2626', width: '30%' }; }
function validatePassword() { const s = passwordStrength(); strengthBar.style.width = s.width; strengthBar.style.background = s.color; const ok = s.level >= 2; setMsg(msg.password, ok ? '✅ Độ mạnh: ' + s.text : '❌ ' + s.text, ok); return ok; }
function validateConfirm() { const ok = fields.confirm.value && fields.confirm.value === fields.password.value; setMsg(msg.confirm, ok ? '✅ Mật khẩu khớp' : '❌ Mật khẩu chưa khớp', ok); return ok; }
function formatPhone() { const digits = fields.phone.value.replace(/\D/g, '').slice(0, 10); const parts = []; if (digits.length > 0) parts.push(digits.slice(0, 4)); if (digits.length > 4) parts.push(digits.slice(4, 7)); if (digits.length > 7) parts.push(digits.slice(7, 10)); fields.phone.value = parts.join('-'); }
function validatePhone() { formatPhone(); const ok = /^\d{4}-\d{3}-\d{3}$/.test(fields.phone.value); setMsg(msg.phone, ok ? '✅ Số điện thoại hợp lệ' : '❌ Số điện thoại cần 10 chữ số', ok); return ok; }
function validateAll() { const ok = validateName() & validateEmail() & validatePassword() & validateConfirm() & validatePhone(); submitBtn.disabled = !ok; return Boolean(ok); }
Object.values(fields).forEach(field => field.addEventListener('input', validateAll));
document.querySelector('#registerForm').addEventListener('submit', e => { e.preventDefault(); if (!validateAll()) return; document.querySelector('#summary').textContent = `${fields.name.value} - ${fields.email.value} - ${fields.phone.value}`; document.querySelector('#successModal').classList.add('show'); });
document.querySelector('#closeModal').addEventListener('click', () => document.querySelector('#successModal').classList.remove('show'));
validateAll();
