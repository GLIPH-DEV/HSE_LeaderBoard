import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/RootStore.jsx';

import { getScoreText } from '../utils/textUtils';

const LeaderBoard = observer(() => {
    const { leaderBoardStore } = useStore();

    useEffect(() => {
        // Запускаем поллинг при монтировании компонента
        leaderBoardStore.startPolling();

        // Останавливаем поллинг при размонтировании
        return () => {
            leaderBoardStore.stopPolling();
        };
    }, [leaderBoardStore]);

    if (leaderBoardStore.isLoading && leaderBoardStore.participants.length === 0) {
        return <div className="p-5 text-center"></div>;
    }

    if (leaderBoardStore.error) {
        return (
            <div className="p-5 text-center text-red-500">
                Ошибка: {leaderBoardStore.error}
            </div>
        );
    }

    return (
        <div className="w-full mx-auto">
            {leaderBoardStore.participants.length === 0 ? (
                <p className="text-center">Нет данных</p>
            ) : (
                <div className="flex flex-col items-center gap-2 w-full">
                    <div className='text-center w-full text-2xl py-6 bg-[#F6F6F6]'>
                        Таблица лидеров
                    </div>
                    {!leaderBoardStore.isLoading && leaderBoardStore.participants.length != 0 && (
                        <div className="flex flex-col items-center gap-2 mt-6 w-full">
                            {leaderBoardStore.sortedParticipants.slice(3).map((participant, index) => (
                                <div
                                    key={participant.name}
                                    className={`flex max-w-3xl w-full justify-between items-center px-12 py-4 rounded-full transition-colors bg-[#F6F6F6]
                                }`}
                                >
                                    <div className="text-base">
                                        {index + 4}.
                                    </div>
                                    <div className="text-base flex-1 ml-4">
                                        {participant.name}
                                    </div>
                                    <div className="text-base">
                                        {getScoreText(participant.score)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});

export default LeaderBoard;
