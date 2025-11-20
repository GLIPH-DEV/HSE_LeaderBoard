import { makeAutoObservable, runInAction } from 'mobx';

const API_URL = '/google-api/macros/echo?user_content_key=AehSKLhv5wXX8X5vvD7QsClNmmAxKWQ5ml6tCyMDi3DpsNzmBBGl8xAwKc_NLU1oCpXYQQRijJ8zmOx4rOSwWc5vjRp47m771FQ7l7b_uQBHpwf7w7-cizK45nZvBZfT7CDDIL3g84lkI1i-nbhiBn5l9cZ5Cev1k1ejaDoLXE-coyqJ7-j1q6j-uQxtOsGCFko1KK7LEF9XN5qwGlnAmO32BXJtkLyJNEIr5lZ7Zs6MhP-WfA_1rOFel5cIYA9_nkdQNhs2UxdicJjJDvyHDRdVJh_Ks7cZfQ&lib=MoA7w1KyGPRZQYOoDdisfqZogFqLoYSAg';
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
        this.isLoading = true;
        this.error = null;

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

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
