import { TopLeadersDecorationGold, TopLeadersDecorationSilver, TopLeadersDecorationBronse } from "./TopLeadersDecoration"
import groupSvg from '../../assets/group.svg'
import groupLowSvg from '../../assets/group-low.svg'
import groupHighSvg from '../../assets/group-high.svg'

import { getScoreText } from '../../utils/textUtils';

const Pedestal = ({ place, children, name, score, categories }) => {
    let Decoration = null;
    let circleColor = "";

    if (place === 1 || place === 'gold') {
        Decoration = TopLeadersDecorationGold;
        circleColor = "#FCC417";
    } else if (place === 2 || place === 'silver') {
        Decoration = TopLeadersDecorationSilver;
        circleColor = "#F9F9F9";
    } else if (place === 3 || place === 'bronze') {
        Decoration = TopLeadersDecorationBronse;
        circleColor = "#D3A867";
    }

    return (
        <div className="group flex flex-col items-center relative">
            <div className="relative flex items-center justify-center mb-4">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 scale-75">
                    {Decoration && <Decoration />}
                </div>

                <div
                    className="w-36 h-36 rounded-full flex items-center justify-center z-10 shadow-lg"
                    style={{ backgroundColor: circleColor }}
                >
                    {children}
                </div>
            </div>

            {/* Название игры / участника под тултипом */}
            <span className="font-bold text-gray-600 uppercase z-10">{name} - {getScoreText(score)}</span>

            {/* Подсказка с категориями для топ-3 */}
            {categories && (
                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-4 -translate-y-full hidden group-hover:flex flex-col gap-1 bg-white text-sm text-gray-800 shadow-lg rounded-xl px-4 py-3 border border-gray-200 z-40">
                    {Object.entries(categories).map(([key, value]) => (
                        <div key={key} className="flex justify-between gap-4">
                            <span className="capitalize">{key}</span>
                            <span className="font-semibold">{value}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="z-0">
                <img src={place === 1 ? groupHighSvg : place === 2 ? groupSvg : groupLowSvg} alt="Pedestal" className="w-40 h-auto object-contain" />
            </div>
        </div>
    )
}

export default Pedestal
