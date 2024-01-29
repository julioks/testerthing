// SimulationProvider.js
import React, { createContext, useState } from 'react';
import useCampaigns from './campaigns';
import useGameState from './gameState';


const SimulationContext = createContext();

const SimulationProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState(["xses", "xdddd"]);
    const { campaignState, fetchCampaigns } = useCampaigns();
    const { gameState, fetchTechnologies,setColors, setValueByTechnology,setCampaign,simulateYear } = useGameState();

    const contextValue = {
        menuItems,
        setMenuItems,
        campaignState,
        fetchCampaigns,
        gameState,
        fetchTechnologies,
        setColors,setValueByTechnology,setCampaign,simulateYear
    };

    return (
        <SimulationContext.Provider value={contextValue}>
            {children}
        </SimulationContext.Provider>
    );
};

export { SimulationContext, SimulationProvider };
