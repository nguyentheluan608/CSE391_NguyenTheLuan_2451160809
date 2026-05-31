# PBT_03 - CSS Core

Họ tên: Nguyễn Thế Luân  
Quê quán: Bắc Ninh

## PHẦN A - KIỂM TRA ĐỌC HIỂU

### Câu A1 - 3 cách nhúng CSS

Nguồn tham chiếu: `08_introduction_css.md` - phần 3 cách thêm CSS.

#### 1. Inline CSS

Ví dụ:

```html
<h1 style="color: red; font-size: 28px;">Tiêu đề</h1>
```

Ưu điểm: viết nhanh, dễ thử trực tiếp trên một thẻ HTML.

Nhược điểm: khó bảo trì, lặp code nhiều, không tách riêng được phần nội dung và phần giao diện.

Nên dùng khi cần test nhanh hoặc chỉnh tạm một thuộc tính nhỏ.

#### 2. Internal CSS

Ví dụ:

```html
<head>
    <style>
        h1 {
            color: blue;
            font-size: 32px;
        }
    </style>
</head>
```

Ưu điểm: phù hợp với file HTML nhỏ, không cần tạo thêm file CSS riêng.

Nhược điểm: nếu dự án có nhiều trang thì code CSS bị lặp lại, khó quản lý.

Nên dùng khi làm demo nhỏ hoặc bài thử nghiệm đơn giản.

#### 3. External CSS

Ví dụ:

```html
<link rel="stylesheet" href="style.css">
```

```css
h1 {
    color: green;
    font-size: 30px;
}
```

Ưu điểm: tách riêng HTML và CSS, dễ tái sử dụng, dễ bảo trì, phù hợp với dự án thật.

Nhược điểm: cần tạo thêm file CSS và liên kết đúng đường dẫn.

Nên dùng trong hầu hết các bài web và dự án thực tế.

Nếu cùng một element có cả inline, internal và external CSS cùng áp dụng thì thường inline CSS thắng vì có độ ưu tiên cao hơn. Nếu có `!important` thì quy tắc có `!important` có thể thắng quy tắc bình thường.

---

### Câu A2 - CSS Selectors

Nguồn tham chiếu: kiến thức CSS selectors trong phần CSS Core.

1. `h1` chọn thẻ h1 có nội dung: `ShopTLU`
2. `.price` chọn 2 thẻ p có nội dung: `25.990.000đ`, `45.990.000đ`
3. `#app header` chọn thẻ header có class `top-bar dark`
4. `nav a:first-child` chọn link đầu tiên trong nav: `Home`
5. `.product.featured h2` chọn h2 trong article có cả class `product` và `featured`: `MacBook Pro`
6. `article > p` chọn các thẻ p là con trực tiếp của article: `25.990.000đ`, `Mô tả sản phẩm...`, `45.990.000đ`, `Mô tả sản phẩm...`
7. `a[href="/"]` chọn link có href là `/`: `Home`
8. `.top-bar.dark h1` chọn h1 nằm trong header có cả class `top-bar` và `dark`: `ShopTLU`

---

### Câu A3 - Box Model

Nguồn tham chiếu: `11_box_model.md` - phần Classic Box Model và Border-box.

#### Trường hợp 1: content-box

```css
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```

Chiều rộng hiển thị:

```text
400 + 20*2 + 5*2 = 450px
```

Không gian chiếm trên trang:

```text
450 + 10*2 = 470px
```

#### Trường hợp 2: border-box

```css
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```

Chiều rộng hiển thị:

```text
400px
```

Kích thước content thực tế:

```text
400 - 20*2 - 5*2 = 350px
```

Không gian chiếm trên trang:

```text
400 + 10*2 = 420px
```

#### Trường hợp 3: Margin collapse

```css
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```

Khoảng cách giữa hai box là:

```text
40px
```

Không phải 65px vì margin dọc của hai block liền nhau bị collapse, trình duyệt lấy margin lớn hơn chứ không cộng cả hai.

Nếu `.box-a` có `margin-bottom: -10px` và `.box-b` có `margin-top: 40px` thì khoảng cách là:

```text
30px
```

---

### Câu A4 - Specificity

Element cần xét:

```html
<p class="price" id="main-price">...</p>
```

| Rule | Selector | Specificity |
|---|---|---|
| Rule A | `p` | `(0, 0, 1)` |
| Rule B | `.price` | `(0, 1, 0)` |
| Rule C | `#main-price` | `(1, 0, 0)` |
| Rule D | `p.price` | `(0, 1, 1)` |

Element sẽ có màu đỏ vì `#main-price` có specificity cao nhất.

Nếu thêm inline style:

```html
<p class="price" id="main-price" style="color: orange;">...</p>
```

Element có màu cam vì inline style có độ ưu tiên cao hơn selector thông thường.

Nếu Rule A thêm `!important`:

```css
p { color: black !important; }
```

Element có màu đen vì `!important` được ưu tiên hơn các rule bình thường, kể cả khi selector có specificity thấp hơn.

---

## PHẦN B - GHI NHẬN THỰC HÀNH

### Bài B1 - Style trang Profile

Các loại selector đã dùng trong `style.css`:

1. Element selector: `body`, `header`, `table`
2. Class selector: `.hero`, `.skill-table`, `.active`
3. ID selector: `#profile`, `#skills`
4. Descendant selector: `header nav a`
5. Pseudo-class selector: `a:hover`, `tbody tr:nth-child(even)`, `tbody tr:hover`

### Bài B2 - Box Model Lab

Hộp 1 dùng `content-box`:

```text
Chiều rộng thực tế = 300 + 20*2 + 5*2 = 350px
```

Hộp 2 dùng `border-box`:

```text
Chiều rộng thực tế = 300px
```

Sự khác biệt là `content-box` chỉ tính `width` cho phần content, còn padding và border cộng thêm ra ngoài. `border-box` tính cả content, padding và border vào trong giá trị width đã đặt.

Với layout 3 cột:

```text
Không dùng border-box:
Sidebar = 250 + 30 = 280px
Content = 500 + 40 = 540px
Ads = 250 + 30 = 280px
Tổng = 1100px > 1000px nên layout dễ bị vỡ.
```

```text
Dùng border-box:
Sidebar = 250px
Content = 500px
Ads = 250px
Tổng = 1000px nên layout vừa container.
```

### Bài B3 - Specificity Battle

| Thứ tự | Rule | Specificity |
|---|---|---|
| 1 | `p` | `(0, 0, 1)` |
| 2 | `.text` | `(0, 1, 0)` |
| 3 | `.highlight` | `(0, 1, 0)` |
| 4 | `p.text` | `(0, 1, 1)` |
| 5 | `.text.highlight` | `(0, 2, 0)` |
| 6 | `body p.text` | `(0, 1, 2)` |
| 7 | `main .highlight` | `(0, 1, 1)` |
| 8 | `#demo` | `(1, 0, 0)` |
| 9 | `p#demo.text` | `(1, 1, 1)` |
| 10 | `main section p#demo.text.highlight` | `(1, 2, 3)` |

Element cuối cùng hiển thị màu tím đậm vì rule số 10 có specificity cao nhất trong các rule cùng target element.

Nếu đổi thứ tự các rule nhưng rule số 10 vẫn có specificity cao nhất thì kết quả không đổi. Thứ tự chỉ quyết định khi các rule có specificity bằng nhau.

---

## PHẦN C - DEBUG & SUY LUẬN

### Câu C1 - Debug CSS Layout

Nguồn tham chiếu: `11_box_model.md` - phần cách tính kích thước thực tế và border-box.

CSS ban đầu:

```css
.container {
    width: 960px;
    margin: 0 auto;
}
.sidebar {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}
.content {
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

Chiều rộng thực tế của sidebar:

```text
300 + 20*2 + 1*2 = 342px
```

Chiều rộng thực tế của content:

```text
660 + 30*2 + 1*2 = 722px
```

Tổng chiều rộng:

```text
342 + 722 = 1064px
```

Container chỉ rộng 960px nên tổng chiều rộng hai cột vượt quá container. Vì vậy content bị đẩy xuống dòng mới.

#### Cách sửa 1: dùng border-box

```css
* {
    box-sizing: border-box;
}
.sidebar {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}
.content {
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

Khi dùng `border-box`, tổng vẫn là:

```text
300 + 660 = 960px
```

#### Cách sửa 2: không dùng border-box

Cần giảm width phần content để cộng thêm padding và border vẫn vừa container.

```css
.sidebar {
    width: 258px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}
.content {
    width: 598px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

Tổng thực tế:

```text
Sidebar = 258 + 40 + 2 = 300px
Content = 598 + 60 + 2 = 660px
Tổng = 960px
```

---

### Câu C2 - Cascade Puzzle

CSS:

```css
body { font-size: 16px; color: #333; }
.container { font-size: 14px; }
.card { color: blue; }
.card .title { font-size: 20px; }
.card p { color: inherit; }
#featured .title { color: red; }
.highlight { color: green !important; }
```

#### 1. "Sản phẩm A"

```text
font-size = 20px
color = green
```

Font-size là 20px vì `.card .title` chọn đúng h2 có class `title`. Màu là green vì h2 có class `highlight` và rule `.highlight { color: green !important; }` thắng cả `#featured .title { color: red; }`.

#### 2. "Mô tả sản phẩm" trong card featured

```text
color = blue
```

Thẻ p nằm trong `.card`, mà `.card` có color blue. Rule `.card p { color: inherit; }` làm p kế thừa màu từ `.card`, nên p có màu blue.

#### 3. "Sản phẩm B"

```text
font-size = 20px
color = blue
```

H2 có class `title` nên font-size là 20px. Nó nằm trong `.card`, nên kế thừa color blue từ `.card`.

#### 4. "Mô tả sản phẩm B"

```text
color = green
```

Thẻ p có class `highlight`, nên rule `.highlight { color: green !important; }` thắng rule `.card p { color: inherit; }`.
