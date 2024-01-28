// SimulationProvider.js
import React, { createContext, useState } from 'react';
import useCampaigns from './campaigns';
import useTechnologies from './technologies';


const SimulationContext = createContext();

const SimulationProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState(["xses", "xdddd"]);
    const { campaignState, fetchCampaigns } = useCampaigns();
    const { techState, fetchTechnologies } = useTechnologies();

    const contextValue = {
        menuItems,
        setMenuItems,
        campaignState,
        fetchCampaigns,
        techState,
        fetchTechnologies
    };

    return (
        <SimulationContext.Provider value={contextValue}>
            {children}
        </SimulationContext.Provider>
    );
};

export { SimulationContext, SimulationProvider };
