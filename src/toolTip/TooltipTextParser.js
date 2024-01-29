// TooltipTextParser.js
import React from 'react';
import TooltipInfo from './TooltipInfo';
import { tooltipDictionary } from './tooltipDictionary';

export const parseTextWithTooltips = (text, handleTooltipClick, activeTooltip) => {
    const regex = /{([^}]+)}/g;
    let parts = text.split(regex);

    return parts.map((part, index) => {
        if (tooltipDictionary[part]) {
            return (
                <TooltipInfo 
                    key={index} 
                    term={part} 
                    explanation={tooltipDictionary[part]} 
                    onClick={(event) => handleTooltipClick(event, part)}
                    isActive={activeTooltip === part}
                />
            );
        }
        return part;
    });
};

