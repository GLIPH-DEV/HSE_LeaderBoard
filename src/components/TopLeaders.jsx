import Pedestal from "./LeadersDecoration/Pedestal"
import { useStore } from "../stores/RootStore";
import { observer } from "mobx-react-lite";

import cloudSvg from "../assets/cloud.svg"

import { useState, useEffect, useCallback, useRef } from 'react';

const TopLeaders = observer(() => {
    const { leaderBoardStore } = useStore();
    const [clouds, setClouds] = useState([]);
    const nextId = useRef(0);

    const handleCloudAnimationEnd = useCallback((id) => {
        setClouds(prev => prev.filter(cloud => cloud.id !== id));
    }, []);

    useEffect(() => {
        const spawnCloud = () => {
            const id = nextId.current++;
            const top = Math.random() * 60 + '%'; // Random top position (0-30%)
            const duration = (Math.random() * 10 + 80) + 's'; // Random duration (15-25s)
            const delay = '0s'; // Start immediately
            const scale = Math.random() * 0.5 + 1; // Random scale (0.5 - 1.0)

            setClouds(prev => {
                if (prev.length >= 5) return prev;
                return [...prev, { id, top, duration, delay, scale }];
            });
        };

        // Initial cloud - spawn first one immediately
        spawnCloud();

        const interval = setInterval(spawnCloud, 5000); // Spawn a new cloud every 5 seconds

        return () => clearInterval(interval);
    }, []);

    if (leaderBoardStore.isLoading && leaderBoardStore.participants.length === 0) {
        return <div className="p-5 text-center">Загрузка...</div>;
    }

    return (
        <div className="w-full h-[800px] bg-gradient-to-b from-[#94C9EE] to-[#5DB0E8] relative overflow-hidden">
            <div className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full bg-[#FFED67] z-10"></div>
            {/* Cloud Generator */}
            {clouds.map(cloud => (
                <div
                    key={cloud.id}
                    className="absolute animate-cloud-move"
                    style={{
                        top: cloud.top,
                        animationDuration: cloud.duration,
                        animationDelay: cloud.delay,
                        left: '-150px' // Start off-screen
                    }}
                    onAnimationEnd={() => handleCloudAnimationEnd(cloud.id)}
                >
                    <img
                        src={cloudSvg}
                        alt="cloud"
                        className="object-contain opacity-80"
                        style={{
                            transform: `scale(${cloud.scale})`
                        }}
                    />
                </div>
            ))}

            <div className="w-full h-full flex items-end justify-center gap-24 translate-y-10">
                {/* 2nd Place */}
                <Pedestal
                    place={2}
                    name={leaderBoardStore.participants[1]?.name || '?'}
                    score={leaderBoardStore.participants[1]?.score || 0}
                >
                    <span className="text-[130px] leading-none mt-4 text-gray-500">
                        {leaderBoardStore.participants[1]?.name?.[0] || '?'}
                    </span>
                </Pedestal>

                {/* 1st Place */}
                <Pedestal
                    place={1}
                    name={leaderBoardStore.participants[0]?.name || '?'}
                    score={leaderBoardStore.participants[0]?.score || 0}
                >
                    <span className="text-[130px] leading-none mt-4 text-yellow-600">
                        {leaderBoardStore.participants[0]?.name?.[0] || '?'}
                    </span>
                </Pedestal>

                {/* 3rd Place */}
                <Pedestal
                    place={3}
                    name={leaderBoardStore.participants[2]?.name || '?'}
                    score={leaderBoardStore.participants[2]?.score || 0}
                >
                    <span className="text-[130px] leading-none mt-4 text-orange-700">
                        {leaderBoardStore.participants[2]?.name?.[0] || '?'}
                    </span>
                </Pedestal>
            </div>
        </div>
    )
})

export default TopLeaders