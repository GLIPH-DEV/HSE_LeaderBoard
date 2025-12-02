import { makeAutoObservable, runInAction } from 'mobx';

// Источник данных: Google Apps Script JSON API
// Структура ответа:
// [
//   {
//     "game_name": "Snowberman",
//     "final_score": 103,
//     "categories": { ... }
//   },
//   ...
// ]
const API_URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiqd7l6oYo14EWuT28HAdkcFu2FV87_GLJGUW1nxyekLb2pCtciU12DvinqkoiiLN55zGYMyay5K0GbYY65Fvj8FFCFYOsz11Ey8eXEz0BwbFT6qN7Qp9akVQgrXYvoNDyjmj3GuITn3u5SGC-CUvAw3Ane0VLFYrgE0sEIMyRFHpJxQ3dUjn57s9EOC5Qf2WZ7yBQv-XFXmAogtz32sWfJelRvG4CqjakNAjsXt3v4oF6GVWs4t_Ea6uNVlAZVt2dNpad6KdFTbFE0FhpilBP4RiolLwhTaXTJjWq2&lib=Mz-239NmbsVWUWyGr4D1tPUKOxNHxfsgT';
const POLLING_INTERVAL = 60000; // 60 секунд

class LeaderBoardStore {
    participants = [];
    isLoading = false;
    error = null;
    pollingInterval = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Получение данных с API
    async fetchParticipants() {
        // Устанавливаем isLoading только если это первая загрузка (нет данных)
        if (this.participants.length === 0) {
            this.isLoading = true;
        }
        this.error = null;

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const rawData = await response.json();

            // Преобразуем данные API к формату, который ожидает UI:
            // { name, score, categories }
            const data = rawData.map((item) => ({
                name: item.game_name,
                score: item.final_score,
                categories: item.categories,
            }));

            runInAction(() => {
                // Сортируем по убыванию score
                this.participants = data.sort((a, b) => b.score - a.score);
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
                this.isLoading = false;
            });
            console.error('Error fetching leaderboard:', error);
        }
    }

    // Запуск поллинга
    startPolling() {
        // Сразу загружаем данные
        this.fetchParticipants();

        // Запускаем периодическое обновление
        this.pollingInterval = setInterval(() => {
            this.fetchParticipants();
        }, POLLING_INTERVAL);
    }

    // Остановка поллинга
    stopPolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
    }

    // Геттер для получения отсортированного списка
    get sortedParticipants() {
        return this.participants;
    }
}

export default new LeaderBoardStore();
