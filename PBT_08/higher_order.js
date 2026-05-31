function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((value, fn) => fn(value), initialValue);
    };
}

function memoize(fn) {
    const cache = new Map();

    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log("Lấy kết quả từ cache...");
            return cache.get(key);
        }

        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

function debounce(fn, delay) {
    let timerId;

    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

async function retry(fn, maxAttempts = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn(attempt);
        } catch (error) {
            lastError = error;
            console.log(`Lần thử ${attempt} thất bại: ${error.message}`);
        }
    }

    throw lastError;
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log("=== PIPE ===");
console.log(process(5));

console.log("\n=== MEMOIZE ===");
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += i;
    }
    return result;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));
console.log(expensiveCalc(500000));

console.log("\n=== DEBOUNCE ===");
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

search("l");
search("lu");
search("lua");
search("luan");

console.log("Gọi search liên tục, chỉ lần cuối được chạy sau 500ms");

console.log("\n=== RETRY ===");
let failedTimes = 0;

retry(async () => {
    failedTimes++;
    if (failedTimes < 3) {
        throw new Error("API tạm lỗi");
    }
    return "Kết nối thành công ở lần thử " + failedTimes;
}, 4)
    .then(result => console.log(result))
    .catch(error => console.log("Thất bại hoàn toàn:", error.message))
    .finally(() => {
        setTimeout(() => {
            console.log("Demo higher-order functions kết thúc");
        }, 700);
    });
