import { TopLeadersDecorationGold, TopLeadersDecorationSilver, TopLeadersDecorationBronse } from "./TopLeadersDecoration"
import groupSvg from '../../assets/group.svg'
import groupLowSvg from '../../assets/group-low.svg'
import groupHighSvg from '../../assets/group-high.svg'

import { getScoreText } from '../../utils/textUtils';

const Pedestal = ({ place, children, name, score }) => {
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
        <div className="flex flex-col items-center relative">
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

            <span className=" z-20 font-bold text-gray-600 uppercase">{name} - {getScoreText(score)}</span>

            <div className="z-0">
                <img src={place === 1 ? groupHighSvg : place === 2 ? groupSvg : groupLowSvg} alt="Pedestal" className="w-40 h-auto object-contain" />
            </div>
        </div>
    )
}

export default Pedestal
