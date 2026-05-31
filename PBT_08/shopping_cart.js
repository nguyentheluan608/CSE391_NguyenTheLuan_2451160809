function createCart() {
    let items = [];
    let discount = {
        code: "",
        type: "percent",
        value: 0
    };

    function formatMoney(value) {
        return Math.max(0, Math.round(value)).toLocaleString("vi-VN") + "đ";
    }

    function getSubTotal() {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    function getDiscountMoney() {
        const subTotal = getSubTotal();
        if (discount.type === "percent") {
            return subTotal * discount.value / 100;
        }
        return discount.value;
    }

    return {
        addItem(product, quantity = 1) {
            const found = items.find(item => item.id === product.id);
            if (found) {
                found.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }

            const found = items.find(item => item.id === productId);
            if (found) {
                found.quantity = newQuantity;
            }
        },

        getTotal() {
            return Math.max(0, getSubTotal() - getDiscountMoney());
        },

        applyDiscount(code) {
            const upperCode = code.toUpperCase();
            if (upperCode === "SALE10") {
                discount = { code: upperCode, type: "percent", value: 10 };
                return "Áp dụng SALE10 thành công";
            }
            if (upperCode === "SALE20") {
                discount = { code: upperCode, type: "percent", value: 20 };
                return "Áp dụng SALE20 thành công";
            }
            if (upperCode === "FREESHIP") {
                discount = { code: upperCode, type: "money", value: 30000 };
                return "Áp dụng FREESHIP thành công";
            }
            discount = { code: "", type: "percent", value: 0 };
            return "Mã giảm giá không hợp lệ";
        },

        printCart() {
            console.log("┌──────────────────────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm            │ SL │ Đơn giá        │ Tổng         │");
            console.log("├──────────────────────────────────────────────────────────────┤");

            if (items.length === 0) {
                console.log("│ Giỏ hàng đang trống                                          │");
            }

            items.forEach((item, index) => {
                const total = item.price * item.quantity;
                const line = `│ ${(index + 1).toString().padEnd(1)} │ ${item.name.padEnd(19)} │ ${item.quantity.toString().padStart(2)} │ ${formatMoney(item.price).padStart(13)} │ ${formatMoney(total).padStart(12)} │`;
                console.log(line);
            });

            console.log("├──────────────────────────────────────────────────────────────┤");
            console.log(`│ Tạm tính:                                      ${formatMoney(getSubTotal()).padStart(14)} │`);
            console.log(`│ Giảm giá ${discount.code || "không có"}:                         ${("-" + formatMoney(getDiscountMoney())).padStart(14)} │`);
            console.log(`│ Tổng thanh toán:                               ${formatMoney(this.getTotal()).padStart(14)} │`);
            console.log("└──────────────────────────────────────────────────────────────┘");
        },

        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        clearCart() {
            items = [];
            discount = { code: "", type: "percent", value: 0 };
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 7, name: "Galaxy Buds", price: 3490000 }, 1);

console.log("=== GIỎ HÀNG BAN ĐẦU ===");
cart.printCart();

console.log("\n=== ÁP DỤNG MÃ SALE10 ===");
console.log(cart.applyDiscount("SALE10"));
cart.printCart();

console.log("\nSố sản phẩm trong giỏ:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau khi xóa AirPods Pro:", cart.getItemCount());
cart.updateQuantity(1, 1);
console.log("Sau khi cập nhật iPhone 16 còn 1 sản phẩm:", cart.getItemCount());
cart.printCart();

cart.clearCart();
console.log("\nSau khi xóa toàn bộ giỏ:");
cart.printCart();
