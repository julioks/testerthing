import React from "react";
import CategoryPanel from "./CategoryPanelComponent";

const CategoryMenu = ({ menuCategory, menuData, onCategoryToggle, openCategory, expandedPanel, onPanelClick }) => {
    const containerClassName = openCategory === menuCategory ? 'menuCategory-categoryPanels' : 'menuCategory-categoryPanels closed';
    const selfClassName = openCategory === menuCategory ? 'maingame-menuCategory open' : 'maingame-menuCategory';
    
    const renderClick = () => {
        onCategoryToggle(menuCategory);
    };

    return (
        <div className={selfClassName}>
            <div className='menuCategory-categoryName' onClick={renderClick}>{menuCategory}</div>
            <div className={containerClassName}>
                {Object.entries(menuData).map(([name, data]) => (
                    <CategoryPanel 
                        key={name} 
                        panelName={name} 
                        panelData={data} 
                        isExpanded={expandedPanel === `${menuCategory}-${name}`}
                        onPanelClick={() => onPanelClick(name)}
                        categoryName={menuCategory}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryMenu;
