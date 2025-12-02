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
        <div className="w-full mx-auto bg-[#F3F4F6]">
            {leaderBoardStore.participants.length === 0 ? (
                <p className="text-center">Нет данных</p>
            ) : (
                <div className="flex flex-col items-center gap-2 w-full">
                    <div className='text-center w-full text-2xl py-6 bg-[#F3F4F6]'>
                        Таблица лидеров
                    </div>
                    {!leaderBoardStore.isLoading && leaderBoardStore.participants.length != 0 && (
                        <div className="flex flex-col items-center gap-2 mt-6 w-full">
                            {leaderBoardStore.sortedParticipants.slice(3).map((participant, index) => (
                                <div
                                    key={participant.name}
                                    className="group relative flex max-w-3xl w-full justify-between items-center px-12 py-4 rounded-full transition-colors bg-[#F9FAFB]"
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

                                    {/* Подсказка с категориями */}
                                    {participant.categories && (
                                        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full hidden group-hover:flex flex-col gap-1 bg-white text-sm text-gray-800 shadow-lg rounded-xl px-4 py-3 border border-gray-200 z-20">
                                            {Object.entries(participant.categories).map(([key, value]) => (
                                                <div key={key} className="flex justify-between gap-4">
                                                    <span className="capitalize">{key}</span>
                                                    <span className="font-semibold">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
