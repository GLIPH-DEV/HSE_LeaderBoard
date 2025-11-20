// Функция для правильного склонения слова "очко"
export const getScoreText = (score) => {
    const lastDigit = score % 10;
    const lastTwoDigits = score % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${score} очков`;
    }

    if (lastDigit === 1) {
        return `${score} очко`;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return `${score} очка`;
    }

    return `${score} очков`;
};
