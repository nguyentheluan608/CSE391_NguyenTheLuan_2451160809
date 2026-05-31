# PBT_04 - CSS Layout

Họ tên: Nguyễn Thế Luân  
Quê quán: Bắc Ninh

## PHẦN A - KIỂM TRA ĐỌC HIỂU

### Câu A1 - 5 loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|---|---|---|---|---|
| `static` | Có | Theo luồng bình thường của tài liệu | Có | Dùng mặc định cho văn bản, đoạn nội dung bình thường |
| `relative` | Có | Chính vị trí ban đầu của nó | Có | Dịch nhẹ phần tử, hoặc làm mốc cho phần tử absolute bên trong |
| `absolute` | Không | Ancestor gần nhất có `position` khác `static` | Có, nếu mốc tham chiếu nằm trong trang | Badge sản phẩm, dropdown, tooltip |
| `fixed` | Không | Viewport của trình duyệt | Không | Header cố định, nút chat, nút scroll top |
| `sticky` | Có trước khi dính, sau đó hoạt động gần giống fixed | Vị trí trong luồng và viewport khi scroll đến ngưỡng | Có cho đến khi đạt ngưỡng sticky | Sidebar dính, header dính khi cuộn |

`absolute` tham chiếu parent khi parent đó có `position: relative`, `absolute`, `fixed` hoặc `sticky`. Parent gần nhất như vậy gọi là nearest positioned ancestor. Nếu không có ancestor nào được đặt position khác `static`, phần tử `absolute` sẽ tham chiếu theo khối chứa ban đầu, thường là vùng trang/body.

---

### Câu A2 - Flexbox vs Grid

#### Trường hợp 1

```css
.container { display: flex; }
.item { flex: 1; }
```

4 items sẽ nằm trên một hàng ngang. Mỗi item chiếm phần bằng nhau.

```text
┌────────┬────────┬────────┬────────┐
│ Item 1 │ Item 2 │ Item 3 │ Item 4 │
└────────┴────────┴────────┴────────┘
```

#### Trường hợp 2

```css
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
```

6 items sẽ chia thành 3 hàng, mỗi hàng 2 item. Vì mỗi item có width 45% và margin hai bên tổng khoảng 5%, nên một hàng vừa 2 item.

```text
┌─────────────┐ ┌─────────────┐
│   Item 1    │ │   Item 2    │
└─────────────┘ └─────────────┘
┌─────────────┐ ┌─────────────┐
│   Item 3    │ │   Item 4    │
└─────────────┘ └─────────────┘
┌─────────────┐ ┌─────────────┐
│   Item 5    │ │   Item 6    │
└─────────────┘ └─────────────┘
```

#### Trường hợp 3

```css
.container { display: flex; justify-content: space-between; align-items: center; }
```

3 items nằm trên một hàng, item đầu ở trái, item cuối ở phải, item giữa nằm giữa khoảng trống. Tất cả được căn giữa theo chiều dọc.

```text
┌─────────────────────────────────────┐
│ Item 1          Item 2       Item 3 │
└─────────────────────────────────────┘
```

#### Trường hợp 4

```css
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
```

3 items nằm thành 3 cột. Cột trái rộng 200px, cột giữa chiếm phần còn lại, cột phải rộng 200px. Giữa các cột có khoảng cách 20px.

```text
┌──────────┬────────────────────┬──────────┐
│  200px   │        1fr         │  200px   │
└──────────┴────────────────────┴──────────┘
```

#### Trường hợp 5

```css
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
```

7 items sẽ tạo thành 3 cột. Hai hàng đầu đủ 3 item, hàng cuối có item số 7 nằm ở cột đầu tiên.

```text
┌────────┬────────┬────────┐
│ Item 1 │ Item 2 │ Item 3 │
├────────┼────────┼────────┤
│ Item 4 │ Item 5 │ Item 6 │
├────────┼────────┼────────┤
│ Item 7 │        │        │
└────────┴────────┴────────┘
```

---

## PHẦN C - SUY LUẬN

### Câu C1 - Flexbox vs Grid: Khi nào dùng gì?

#### 1. Navigation bar ngang

Nên dùng Flexbox. Navbar chủ yếu là bố cục một chiều theo hàng ngang, gồm logo, menu và nhóm nút. Flexbox giúp căn giữa dọc bằng `align-items: center` và chia khoảng cách ngang bằng `justify-content`.

#### 2. Lưới ảnh Instagram

Nên dùng Grid. Lưới ảnh có nhiều hàng và nhiều cột, cần kiểm soát bố cục hai chiều. Grid phù hợp hơn vì có thể chia 3 cột đều nhau và tự xuống hàng khi có nhiều ảnh.

#### 3. Layout blog: main content + sidebar

Nên dùng Grid hoặc kết hợp. Grid phù hợp để chia bố cục tổng thể thành main content và sidebar. Bên trong từng phần có thể dùng Flexbox để căn chỉnh các thành phần nhỏ.

#### 4. Footer với 4 cột thông tin

Có thể dùng Grid. Footer có 4 cột rõ ràng, mỗi cột là một nhóm nội dung. Grid giúp chia cột đều, dễ chuyển thành 2 cột hoặc 1 cột trên màn hình nhỏ.

#### 5. Card sản phẩm

Nên dùng Flexbox bên trong card. Card có ảnh ở trên, text ở giữa và nút ở dưới. Dùng `display: flex`, `flex-direction: column` và `margin-top: auto` cho nút giúp nút luôn nằm đáy card.

---

### Câu C2 - Debug Flexbox

#### Lỗi 1: Cards không đều chiều cao, nút Mua bị nhảy lên/xuống

Nguyên nhân: `.card` chưa dùng flex theo cột, nên nội dung dài ngắn khác nhau làm nút nằm ở vị trí không đều.

Code sửa:

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}

.card {
    width: calc(33.333% - 16px);
    display: flex;
    flex-direction: column;
}

.card .btn {
    margin-top: auto;
    padding: 10px;
}
```

#### Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc nhưng vẫn dính góc trái trên

Nguyên nhân: `.hero` mới có `display: flex` nhưng chưa có `justify-content` và `align-items`.

Code sửa:

```css
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero-content {
    text-align: center;
}
```

#### Lỗi 3: Sidebar bị co lại khi content quá dài

Nguyên nhân: flex item mặc định có thể co lại vì `flex-shrink: 1`. Sidebar có `width: 250px` nhưng vẫn có thể bị ép nhỏ khi content chiếm nhiều chỗ.

Code sửa:

```css
.layout {
    display: flex;
    gap: 24px;
}

.sidebar {
    width: 250px;
    flex-shrink: 0;
}

.content {
    flex: 1;
    min-width: 0;
}
```
