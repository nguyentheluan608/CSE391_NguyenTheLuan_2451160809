# PBT_01 - HTML5 Fundamentals

Họ tên: Nguyễn Thế Luân  
Quê quán: Bắc Ninh

---

## PHẦN A - KIỂM TRA ĐỌC HIỂU

### Câu A1 - HTTP & Browser

Nguồn tham chiếu: `01_introduction_html_universe.md` - phần Client-Server, HTTP, Browser Rendering.

Khi gõ `https://shopee.vn` vào trình duyệt và nhấn Enter, các bước xảy ra theo thứ tự:

1. Trình duyệt nhận URL người dùng nhập vào thanh địa chỉ.
2. Trình duyệt kiểm tra cache và thực hiện DNS lookup để tìm địa chỉ IP của tên miền `shopee.vn`.
3. Trình duyệt thiết lập kết nối với server, với HTTPS thì có thêm quá trình bắt tay TLS để mã hóa dữ liệu.
4. Browser gửi HTTP request đến server, thường là request `GET` để lấy trang chủ.
5. Server nhận request, xử lý và trả về HTTP response gồm status code, header và nội dung HTML.
6. Browser đọc HTML, sau đó tiếp tục tải thêm CSS, JavaScript, hình ảnh và font nếu có.
7. Browser parse HTML thành DOM, parse CSS thành CSSOM, chạy JavaScript và tạo render tree.
8. Browser layout, paint và hiển thị giao diện trang web cho người dùng.

Tab Network trong Chrome DevTools cho biết danh sách các request mà trang web gửi đi, ví dụ: URL request, status code, loại file, kích thước file, thời gian tải, thứ tự tải và tổng thời gian load trang.

Trong thư mục `screenshots/`, ảnh `04_network_panel.png` đánh dấu:

- Status Code của request đầu tiên.
- Tổng thời gian load trang.
- Một request trả về file CSS.

---

### Câu A2 - Semantic HTML

Nguồn tham chiếu: `PBT_01_HTML_Fundamentals.md` - phần Semantic HTML và yêu cầu sửa lỗi semantic.

Trang web bị Google đánh giá SEO thấp vì dùng quá nhiều thẻ `<div>` thay cho các thẻ semantic. Các lỗi semantic gồm:

1. Phần đầu trang dùng `<div class="header">` thay vì `<header>`.
2. Phần menu dùng `<div class="menu">` thay vì `<nav>`.
3. Phần nội dung chính dùng `<div class="main">` thay vì `<main>`.
4. Sản phẩm dùng `<div class="product">` thay vì `<article>`.
5. Tên sản phẩm dùng `<div class="title">` thay vì thẻ heading như `<h1>` hoặc `<h2>`.
6. Ảnh sản phẩm thiếu thuộc tính `alt`, làm giảm accessibility và SEO.
7. Phần chân trang dùng `<div class="footer">` thay vì `<footer>`.

Bản sửa:

```html
<header>
    <h1>ShopTLU</h1>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <section aria-labelledby="featured-title">
        <h2 id="featured-title">Sản phẩm nổi bật</h2>
        <article>
            <h3>iPhone 16 Pro</h3>
            <p><strong>25.990.000đ</strong></p>
            <figure>
                <img src="iphone.jpg" alt="iPhone 16 Pro màu titan">
                <figcaption>iPhone 16 Pro chính hãng</figcaption>
            </figure>
        </article>
    </section>
</main>

<footer>
    <p>&copy; 2026 ShopTLU</p>
</footer>
```

---

### Câu A3 - Block vs Inline

Nguồn tham chiếu: `PBT_01_HTML_Fundamentals.md` - phần Block vs Inline.

Kết quả hiển thị dạng text art:

```text
┌──────────────────────────────┐
│ Hộp 1                        │
└──────────────────────────────┘
Text A Text B
┌──────────────────────────────┐
│ Hộp 2                        │
└──────────────────────────────┘
Text C Text D
┌──────────────────────────────┐
│ Hộp 3                        │
└──────────────────────────────┘
```

Giải thích: thẻ `<div>` là block element nên tự chiếm một dòng mới và kéo rộng theo chiều ngang. Các thẻ `<span>` và `<strong>` là inline element nên nằm cùng dòng với các inline element khác, không tự xuống dòng nếu chưa hết chiều rộng.

---

### Câu A4 - Table

Nguồn tham chiếu: `05_tables_hyperlinks.md` - phần Table và quy tắc dùng table.

`<thead>` dùng để nhóm phần tiêu đề của bảng, thường chứa các ô `<th>` mô tả tên cột.  
`<tbody>` dùng để chứa dữ liệu chính của bảng.  
`<tfoot>` dùng để chứa phần tổng kết, ghi chú hoặc tổng cộng ở cuối bảng.

Không nên dùng table để tạo layout trang web vì:

1. Table sinh ra để trình bày dữ liệu dạng bảng, không phải để chia bố cục trang.
2. Layout bằng table khó responsive trên điện thoại.
3. Code HTML bị rối, nhiều hàng/cột lồng nhau nên khó bảo trì.
4. Screen reader có thể hiểu nhầm nội dung là dữ liệu bảng, gây khó khăn cho người dùng khiếm thị.
5. CSS Flexbox và Grid phù hợp hơn cho layout hiện đại.

---

## PHẦN B - DEBUG HTML

### Bài B3 - Danh sách lỗi đã sửa

Lỗi 1: Dòng 1 — `<!DOCTYPE>` viết thiếu `html` — Sửa thành `<!DOCTYPE html>`.

Lỗi 2: Dòng 2 — Thẻ `<html>` thiếu thuộc tính ngôn ngữ — Sửa thành `<html lang="vi">`.

Lỗi 3: Dòng 4 — Thẻ `<title>` chưa đóng — Sửa thành `<title>Trang web</title>`.

Lỗi 4: Dòng 5 — `charset="utf8"` chưa chuẩn — Sửa thành `charset="UTF-8"`.

Lỗi 5: Phần `<head>` thiếu meta viewport — Thêm `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.

Lỗi 6: Dòng 8 — Thẻ `<h1>` đóng sai thành `<h1>` — Sửa thành `</h1>`.

Lỗi 7: Dòng 12 — Link `<a href="home">Trang chủ<a>` chưa đóng đúng — Sửa thành `<a href="home.html">Trang chủ</a>`.

Lỗi 8: Dòng 19 — Ảnh thiếu dấu nháy ở `src` và thiếu `alt` — Sửa thành `<img src="iphone.jpg" alt="iPhone 16 Pro">`.

Lỗi 9: Dòng 21 — Thẻ `<b>` và `<p>` đóng sai thứ tự — Sửa thành `<p>Giá: <strong>25.990.000đ</strong></p>`.

Lỗi 10: Bảng thiếu `<thead>` và `<tbody>` — Bổ sung cấu trúc bảng chuẩn.

Lỗi 11: Hàng tiêu đề bảng dùng `<td>` thay vì `<th>` — Sửa thành `<th>`.

Lỗi 12: Có hai thẻ `<main>` trong cùng một trang — Sidebar nên sửa thành `<aside>`.

Lỗi 13: Footer có thẻ `<p>` chưa đóng — Sửa thành `<p>Copyright 2026</p>`.

Lỗi 14: Thiếu thẻ `</html>` cuối trang — Bổ sung thẻ đóng.

---

### Bài B4 - Phân tích trang web thật

Trang web được chọn: `thegioididong.com`.

#### 1. Semantic HTML5

Ba thẻ semantic HTML5 quan sát được:

1. `<header>`: dùng cho phần đầu trang, chứa logo, tìm kiếm, giỏ hàng và điều hướng chính.
2. `<nav>`: dùng cho khu vực điều hướng danh mục như Điện thoại, Laptop, Phụ kiện, Tablet.
3. `<section>`: dùng cho các khối nội dung như khuyến mãi, danh sách sản phẩm, danh mục sản phẩm.

Hai điểm chưa tối ưu semantic:

1. Một số khối sản phẩm có thể dùng `<article>` rõ ràng hơn vì mỗi sản phẩm là một nội dung độc lập.
2. Một số nhóm điều hướng hoặc nội dung phụ có thể dùng `<aside>` thay vì chỉ dùng các khối chứa thông thường.

#### 2. Table

Table được kiểm tra trong phần thông tin/so sánh sản phẩm. Nội dung bảng dùng để trình bày dữ liệu kỹ thuật hoặc thông tin so sánh sản phẩm.

Bảng có cấu trúc dữ liệu dạng hàng và cột, có thể dùng `<tbody>` để chứa dữ liệu chính. Một số bảng thông số trên các trang thương mại điện tử thường không dùng đầy đủ `<thead>`, vì cột đầu tiên là tên thông số và cột thứ hai là giá trị.

#### 3. Form

Form được tìm thấy ở khu vực ô tìm kiếm sản phẩm. Form này dùng để người dùng nhập từ khóa tìm kiếm điện thoại, laptop hoặc phụ kiện.

- `action`: gửi đến trang xử lý tìm kiếm hoặc URL tìm kiếm của website.
- `method`: thường dùng `GET` để đưa từ khóa tìm kiếm lên URL.
- Input type sử dụng: `search` hoặc `text`.

Các ảnh minh họa được đặt trong thư mục `screenshots/`.

---

## PHẦN C - SUY LUẬN

### Câu C1 - Thiết kế cấu trúc HTML

```html
<header> <!-- header vì đây là phần đầu trang, chứa logo và điều hướng chính -->
    <h1>Shop Điện Thoại</h1> <!-- h1 là tiêu đề chính của website -->
    <nav aria-label="Điều hướng chính"> <!-- nav vì chứa các liên kết điều hướng -->
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/dien-thoai">Điện thoại</a></li>
            <li><a href="/lien-he">Liên hệ</a></li>
        </ul>
    </nav>
</header>

<nav aria-label="breadcrumb"> <!-- nav vì breadcrumb cũng là một dạng điều hướng -->
    <ol> <!-- ol vì breadcrumb có thứ tự từ rộng đến chi tiết -->
        <li><a href="/">Trang chủ</a></li>
        <li><a href="/dien-thoai">Điện thoại</a></li>
        <li>iPhone 16</li>
    </ol>
</nav>

<main> <!-- main vì đây là nội dung chính duy nhất của trang -->
    <article> <!-- article vì chi tiết sản phẩm là một nội dung độc lập -->
        <section aria-labelledby="gallery-title"> <!-- section vì đây là khu vực ảnh sản phẩm -->
            <h2 id="gallery-title">Ảnh sản phẩm</h2>
            <figure> <!-- figure vì nhóm ảnh có chú thích riêng -->
                <img src="image-1.jpg" alt="Ảnh mặt trước iPhone 16">
                <img src="image-2.jpg" alt="Ảnh mặt sau iPhone 16">
                <img src="image-3.jpg" alt="Ảnh cạnh bên iPhone 16">
                <img src="image-4.jpg" alt="Ảnh hộp iPhone 16">
                <img src="image-5.jpg" alt="Ảnh iPhone 16 khi cầm trên tay">
                <figcaption>Bộ ảnh sản phẩm iPhone 16</figcaption>
            </figure>
        </section>

        <section aria-labelledby="product-info-title"> <!-- section vì nhóm thông tin chính của sản phẩm -->
            <h2 id="product-info-title">Thông tin sản phẩm</h2>
            <h3>iPhone 16 256GB</h3>
            <p><strong>Giá:</strong> 22.990.000đ</p>
            <p><strong>Đánh giá:</strong> 4.8/5 sao</p>
            <p>Mô tả ngắn về sản phẩm.</p>
            <button type="button">Thêm vào giỏ hàng</button>
        </section>

        <section aria-labelledby="spec-title"> <!-- section vì đây là nhóm thông số kỹ thuật -->
            <h2 id="spec-title">Thông số kỹ thuật</h2>
            <table> <!-- table vì thông số là dữ liệu dạng bảng -->
                <thead>
                    <tr>
                        <th>Thông số</th>
                        <th>Giá trị</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Màn hình</td>
                        <td>6.1 inch</td>
                    </tr>
                    <tr>
                        <td>Bộ nhớ</td>
                        <td>256GB</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section aria-labelledby="review-title"> <!-- section vì đây là khu vực đánh giá -->
            <h2 id="review-title">Đánh giá và bình luận</h2>
            <article> <!-- article vì mỗi đánh giá là một nội dung độc lập -->
                <h3>Người dùng A</h3>
                <p>Sản phẩm tốt, pin ổn.</p>
            </article>
        </section>
    </article>

    <aside aria-labelledby="similar-title"> <!-- aside vì đây là nội dung phụ liên quan -->
        <h2 id="similar-title">Sản phẩm tương tự</h2>
        <article>
            <h3>iPhone 15</h3>
            <p>Giá: 18.990.000đ</p>
        </article>
    </aside>
</main>

<footer> <!-- footer vì đây là phần cuối trang -->
    <p>&copy; 2026 Shop Điện Thoại</p>
</footer>
```

---

### Câu C2 - So sánh và tranh luận

Em không đồng ý với ý kiến “dùng `<div>` cho mọi thứ rồi thêm class là được”. Về mặt hiển thị, cách đó có thể vẫn tạo ra giao diện giống nhau, nhưng về kỹ thuật thì semantic HTML có nhiều lợi ích hơn. Thứ nhất, semantic HTML giúp công cụ tìm kiếm hiểu rõ cấu trúc trang. Ví dụ, khi dùng `<article>` cho một sản phẩm và `<h1>`, `<h2>` cho tiêu đề, Google dễ nhận biết đâu là nội dung chính, đâu là tiêu đề, đâu là thông tin phụ. Điều này hỗ trợ SEO tốt hơn so với việc toàn bộ trang chỉ là các thẻ `<div>`.

Thứ hai, semantic HTML tốt hơn cho accessibility. Người dùng sử dụng screen reader có thể nhảy nhanh đến `<nav>`, `<main>`, `<header>`, `<footer>` để hiểu bố cục trang. Nếu tất cả đều là `<div>`, trình đọc màn hình sẽ khó phân biệt đâu là menu, đâu là nội dung chính.

Ví dụ, một thanh menu nên viết bằng `<nav><ul><li><a>...</a></li></ul></nav>` thay vì nhiều `<div>` lồng nhau, vì trình duyệt và công cụ hỗ trợ đều hiểu đây là khu vực điều hướng.

Tuy nhiên, `<div>` vẫn phù hợp khi cần tạo một khối bao bọc chỉ để chia layout hoặc nhóm phần tử mà không mang ý nghĩa nội dung đặc biệt. Vì vậy, không phải bỏ hoàn toàn `<div>`, mà cần dùng đúng lúc.
```
