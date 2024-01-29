import React, { useContext, useState } from 'react';
import { SimulationContext } from '../../simulationContext/SimulationContext';
import CategoryMenu from './CategoryMenuComponent';

const MainMenu = () => {
    const simContext = useContext(SimulationContext);
    const [openCategory, setOpenCategory] = useState(null);
    const [expandedPanel, setExpandedPanel] = useState(null);

    const toggleCategory = (menuName) => {
        setOpenCategory(currentOpenCategory => currentOpenCategory === menuName ? null : menuName);
    };

    const handlePanelClick = (categoryName, panelName) => {
        const fullPanelName = `${categoryName}-${panelName}`;
        setExpandedPanel(currentPanel => currentPanel === fullPanelName ? null : fullPanelName);
    };

    return (
        <div className='maingame-mainMenu'>
            <div className='mainMenu-leftDetails'>
            <div >{simContext.gameState.campaign.name}</div>
            <div >{simContext.gameState.campaign.budget}€</div></div>
            <div className='mainMenu-centerDetails'>
            {Object.entries(simContext.gameState.campaign.availableMenus).map(([name, data]) => (
                <CategoryMenu
                    key={name}
                    menuCategory={name}
                    menuData={data}
                    openCategory={openCategory}
                    onCategoryToggle={toggleCategory}
                    expandedPanel={expandedPanel}
                    onPanelClick={(panelName) => handlePanelClick(name, panelName)}
                />
            ))}
            </div>
            <div className='mainMenu-rightDetails' >
                <div>{simContext.gameState.campaign.year}</div>
                <div onClick={simContext.simulateYear}>Next Year</div>
            </div>
        </div>
    );
};

export default MainMenu;
