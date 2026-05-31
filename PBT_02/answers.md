# PBT_02 - HTML5 Forms & Media

Sinh viên: Nguyễn Thế Luân

## PHẦN A - KIỂM TRA ĐỌC HIỂU

### Câu A1 - Input Types

Nguồn tham khảo: `07_forms_interactive.md` - phần Các Input Types HTML5.

1. `type="text"` → Ô nhập văn bản bình thường, có thể kiểm tra bằng `required`, `minlength`, `maxlength`, `pattern` → Dùng để nhập họ tên hoặc username trong form đăng ký.
2. `type="email"` → Ô nhập email, trình duyệt tự kiểm tra định dạng có ký tự `@` và phần tên miền → Dùng cho email tài khoản khách hàng.
3. `type="password"` → Ô nhập mật khẩu, ký tự được che lại, có thể dùng `minlength` và `pattern` → Dùng cho mật khẩu đăng nhập.
4. `type="tel"` → Ô nhập số điện thoại, trên điện thoại thường hiện bàn phím số, có thể dùng `pattern` → Dùng cho số điện thoại nhận hàng.
5. `type="number"` → Ô nhập số, thường có nút tăng giảm, có thể dùng `min`, `max`, `step` → Dùng cho số lượng sản phẩm.
6. `type="date"` → Ô chọn ngày bằng date picker, có thể dùng `min`, `max` → Dùng cho ngày sinh hoặc ngày giao hàng mong muốn.
7. `type="checkbox"` → Ô tích chọn, có thể dùng `required` → Dùng cho đồng ý điều khoản mua hàng.
8. `type="radio"` → Nút chọn một trong nhiều lựa chọn cùng nhóm `name` → Dùng cho chọn phương thức thanh toán COD, chuyển khoản hoặc ví điện tử.
9. `type="range"` → Thanh kéo chọn giá trị trong khoảng, có thể dùng `min`, `max`, `step` → Dùng để chọn khoảng thời gian giao hàng hoặc mức giá lọc sản phẩm.
10. `type="file"` → Ô chọn file từ máy, có thể dùng `accept` và `multiple` → Dùng cho tải ảnh đại diện hoặc ảnh xác nhận thanh toán.

### Câu A2 - Validation Attributes

Nguồn tham khảo: `07_forms_interactive.md` - phần HTML5 Validation Attributes.

#### Trường hợp 1

```html
<input type="text" required value="">
```

Khi bấm Submit, trình duyệt không cho gửi form vì ô này bắt buộc nhập nhưng đang để trống. Thuộc tính `required` yêu cầu người dùng phải nhập dữ liệu.

#### Trường hợp 2

```html
<input type="email" value="abc">
```

Trình duyệt không cho gửi form vì `abc` không đúng định dạng email. `type="email"` tự kiểm tra giá trị có dạng email hợp lệ.

#### Trường hợp 3

```html
<input type="number" min="1" max="10" value="15">
```

Trình duyệt không cho gửi form vì giá trị `15` lớn hơn `max="10"`. Trường số này chỉ chấp nhận giá trị từ 1 đến 10.

#### Trường hợp 4

```html
<input type="text" pattern="[0-9]{10}" value="abc123">
```

Trình duyệt không cho gửi form vì giá trị `abc123` không khớp pattern. Pattern yêu cầu đúng 10 chữ số.

#### Trường hợp 5

```html
<input type="password" minlength="8" value="123">
```

Trình duyệt không cho gửi form vì mật khẩu chỉ có 3 ký tự, nhỏ hơn `minlength="8"`.

Kết quả khi chạy `validation_test.html` giống với dự đoán. Các trường sai đều bị trình duyệt chặn submit và hiển thị trạng thái không hợp lệ.

### Câu A3 - Accessibility

Nguồn tham khảo: `07_forms_interactive.md` - phần Accessibility.

1. `<label for="email">` quan trọng vì nó giúp người dùng biết input dùng để nhập thông tin gì. Với screen reader, label được đọc cùng input nên người dùng khiếm thị có thể hiểu đang nhập dữ liệu nào. Khi click vào label, con trỏ cũng tự focus vào input tương ứng, giúp thao tác dễ hơn.

2. `<fieldset>` và `<legend>` dùng khi muốn nhóm nhiều trường liên quan với nhau. Ví dụ trong form đăng ký, nhóm "Thông tin cá nhân" gồm họ tên, email, số điện thoại, ngày sinh. Nhóm "Tài khoản" gồm username, password và xác nhận password. Cách này giúp form rõ ràng hơn và tốt hơn cho accessibility.

3. `aria-label` dùng khi phần tử tương tác không có chữ hiển thị rõ ràng, ví dụ nút chỉ có icon giỏ hàng. Không nên dùng `aria-label` thay cho `<label>` nếu đã có label hiển thị, vì dễ gây trùng lặp hoặc làm thông tin đọc ra không nhất quán với nội dung trên màn hình.

### Câu A4 - Media

Nguồn tham khảo: `06_graphics_multimedia.md` - phần Images và Video & Audio HTML5.

1. `loading="lazy"` giúp ảnh chỉ tải khi gần xuất hiện trong vùng nhìn của người dùng. Nó làm trang tải nhanh hơn vì không phải tải tất cả ảnh ngay từ đầu. Không nên dùng lazy cho ảnh quan trọng ở đầu trang như logo chính, banner hero hoặc ảnh cần hiển thị ngay khi mở trang.

2. Nên cung cấp nhiều `<source>` trong thẻ `<video>` vì mỗi trình duyệt có thể hỗ trợ định dạng video khác nhau. Khi có nhiều source, trình duyệt sẽ chọn định dạng phù hợp để phát. Ba format video phổ biến trên web là MP4, WebM và Ogg.

3. Thuộc tính `alt` mô tả nội dung ảnh. Nó hỗ trợ screen reader, SEO và hiển thị thay thế khi ảnh lỗi.

- Ảnh sản phẩm iPhone 16: `alt="iPhone 16 màu xanh dương dung lượng 256GB nhìn từ mặt trước và mặt sau"`
- Ảnh trang trí: `alt=""`
- Ảnh biểu đồ doanh thu Q1/2026: `alt="Biểu đồ doanh thu quý 1 năm 2026 tăng từ tháng 1 đến tháng 3"`

### Câu A5 - So sánh figure và img

Nguồn tham khảo: `06_graphics_multimedia.md` - phần Images và Best Practices.

Cách 1 dùng `<img>` trực tiếp phù hợp khi ảnh chỉ là một phần đơn giản trong nội dung và không cần chú thích riêng. Ví dụ:

1. Logo nhỏ trong header của website.
2. Icon minh họa trong nút hoặc phần giới thiệu ngắn.

Cách 2 dùng `<figure>` và `<figcaption>` phù hợp khi ảnh là một nội dung độc lập và cần chú thích. Ví dụ:

1. Ảnh sản phẩm trong trang bán hàng kèm tên và giá.
2. Ảnh biểu đồ doanh thu kèm chú thích giải thích số liệu.

`<figure>` làm nội dung rõ nghĩa hơn vì ảnh và chú thích được nhóm lại với nhau. Còn `<img>` đơn lẻ ngắn gọn hơn khi chỉ cần hiển thị ảnh bình thường.

---

## PHẦN C - PHÂN TÍCH & SUY LUẬN

### Câu C1 - Debug Form

#### Lỗi 1

Dòng 2 — Input "Tên" không có `<label for="...">`, không có `id`, `name`, `required`.

Sửa:

```html
<label for="fullname">Tên:</label>
<input type="text" id="fullname" name="fullname" required minlength="2" placeholder="Nguyễn Thế Luân">
```

#### Lỗi 2

Dòng 4 — Input email không có label, không có `id`, `name`, `required`.

Sửa:

```html
<label for="email">Email:</label>
<input type="email" id="email" name="email" required placeholder="luan@email.com">
```

#### Lỗi 3

Dòng 6 — Password không có label, không có `id`, `name`, `required`, `minlength` và pattern kiểm tra độ mạnh.

Sửa:

```html
<label for="password">Mật khẩu:</label>
<input type="password" id="password" name="password" required minlength="8" pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}" placeholder="Ít nhất 8 ký tự">
```

#### Lỗi 4

Dòng 7 — Ô nhập lại mật khẩu không có label, không có `id`, `name`, validation giống mật khẩu.

Sửa:

```html
<label for="confirmPassword">Nhập lại mật khẩu:</label>
<input type="password" id="confirmPassword" name="confirmPassword" required minlength="8" placeholder="Nhập lại mật khẩu">
```

#### Lỗi 5

Dòng 9 — Phone dùng `type="text"`, không có label đúng chuẩn, không có pattern kiểm tra 10 số.

Sửa:

```html
<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone" required pattern="[0-9]{10}" placeholder="0901234567">
```

#### Lỗi 6

Dòng 11 — Select không có label, `id`, `name`, `required`, option đầu tiên chưa có value rỗng để bắt buộc chọn.

Sửa:

```html
<label for="city">Thành phố:</label>
<select id="city" name="city" required>
    <option value="">-- Chọn thành phố --</option>
    <option value="hanoi">Hà Nội</option>
    <option value="hcm">TP.HCM</option>
</select>
```

#### Lỗi 7

Dòng 16 — Label "Tôi đồng ý điều khoản" không chứa input checkbox, nên người dùng không có ô để tích chọn.

Sửa:

```html
<label for="agree">
    <input type="checkbox" id="agree" name="agree" required>
    Tôi đồng ý điều khoản
</label>
```

#### Lỗi 8

Dòng 19 — Nút submit dùng `<input type="submit">` vẫn chạy, nhưng nên dùng `<button type="submit">` để dễ thêm nội dung, icon và hỗ trợ accessibility tốt hơn.

Sửa:

```html
<button type="submit">Gửi</button>
```

Bản sửa đầy đủ:

```html
<form action="#" method="POST">
    <label for="fullname">Tên:</label>
    <input type="text" id="fullname" name="fullname" required minlength="2" placeholder="Nguyễn Thế Luân">

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required placeholder="luan@email.com">

    <label for="password">Mật khẩu:</label>
    <input type="password" id="password" name="password" required minlength="8" pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}" placeholder="Ít nhất 8 ký tự">

    <label for="confirmPassword">Nhập lại mật khẩu:</label>
    <input type="password" id="confirmPassword" name="confirmPassword" required minlength="8" placeholder="Nhập lại mật khẩu">

    <label for="phone">Phone:</label>
    <input type="tel" id="phone" name="phone" required pattern="[0-9]{10}" placeholder="0901234567">

    <label for="city">Thành phố:</label>
    <select id="city" name="city" required>
        <option value="">-- Chọn thành phố --</option>
        <option value="hanoi">Hà Nội</option>
        <option value="hcm">TP.HCM</option>
    </select>

    <label for="agree">
        <input type="checkbox" id="agree" name="agree" required>
        Tôi đồng ý điều khoản
    </label>

    <button type="submit">Gửi</button>
</form>
```

### Câu C2 - Thiết kế chiến lược Validation

#### 1. Pattern regex

CMND/CCCD đúng 12 chữ số:

```html
<input type="text" pattern="[0-9]{12}" required>
```

Số tài khoản từ 10 đến 15 chữ số:

```html
<input type="text" pattern="[0-9]{10,15}" required>
```

Email:

```html
<input type="email" required>
```

PIN đúng 6 chữ số và không hiển thị:

```html
<input type="password" pattern="[0-9]{6}" required inputmode="numeric">
```

#### 2. HTML5 validation có đủ an toàn không?

HTML5 validation chưa đủ an toàn cho ứng dụng ngân hàng. Nó chỉ kiểm tra ở phía trình duyệt để hỗ trợ người dùng nhập đúng định dạng. Người dùng vẫn có thể tắt validation, sửa HTML bằng DevTools hoặc gửi request trực tiếp đến server. Vì vậy ứng dụng ngân hàng bắt buộc phải validate lại ở Backend.

#### 3. Ba loại validation HTML5 không thể làm được

1. Kiểm tra email đã tồn tại trong hệ thống hay chưa.
2. Kiểm tra xác nhận mật khẩu có khớp mật khẩu không.
3. Kiểm tra OTP, mã xác thực hoặc dữ liệu từ server có hợp lệ không.

#### 4. Hai rủi ro bảo mật nếu chỉ validate Frontend

1. Người dùng có thể vượt qua kiểm tra bằng cách chỉnh sửa HTML hoặc gửi request giả, làm dữ liệu sai đi vào hệ thống.
2. Kẻ tấn công có thể gửi dữ liệu độc hại đến server, gây lỗi hệ thống hoặc tạo nguy cơ tấn công như injection nếu Backend không kiểm tra lại.
