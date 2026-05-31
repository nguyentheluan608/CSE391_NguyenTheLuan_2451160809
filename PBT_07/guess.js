const startBtn = document.querySelector("#startBtn");

startBtn.addEventListener("click", function () {
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    const guessedNumbers = [];
    let count = 0;
    const maxTurn = 7;
    let isWin = false;

    while (count < maxTurn) {
        const input = prompt(`Lần đoán ${count + 1}/${maxTurn}: Nhập số từ 1 đến 100`);

        if (input === null) {
            alert("Bạn đã thoát game.");
            break;
        }

        const guess = Number(input);

        if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
            alert("Vui lòng nhập số nguyên từ 1 đến 100.");
            continue;
        }

        let isDuplicate = false;
        for (let i = 0; i < guessedNumbers.length; i++) {
            if (guessedNumbers[i] === guess) {
                isDuplicate = true;
                break;
            }
        }

        if (isDuplicate) {
            alert("Bạn đã đoán số này rồi!");
            continue;
        }

        guessedNumbers.push(guess);
        count++;

        if (guess === secretNumber) {
            alert(`Đúng rồi! Bạn đoán đúng sau ${count} lần!`);
            isWin = true;
            break;
        } else if (guess < secretNumber) {
            alert("Cao hơn");
        } else {
            alert("Thấp hơn");
        }
    }

    if (!isWin && count === maxTurn) {
        alert(`Bạn đã hết lượt. Đáp án đúng là ${secretNumber}.`);
    }
});
