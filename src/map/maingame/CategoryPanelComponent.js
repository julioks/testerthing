import React, { useRef, useEffect, useLayoutEffect, useContext, useState } from 'react';
import Graph from './graphComponent';
import { SimulationContext } from '../../simulationContext/SimulationContext';
import { parseTextWithTooltips } from '../../toolTip/TooltipTextParser';

const CategoryPanel = ({ panelName, panelData, isExpanded, onPanelClick, categoryName}) => {
    const elementRef = useRef(null);
    const inputRefs = useRef({});
    const [activeTooltip, setActiveTooltip] = useState(null);
    const invertColors = () => {
        const primaryColor = getComputedStyle(elementRef.current).getPropertyValue('--primary_col');
        const secondaryColor = getComputedStyle(elementRef.current).getPropertyValue('--secondary_col');
        elementRef.current.style.setProperty('--primary_col', secondaryColor);
        elementRef.current.style.setProperty('--secondary_col', primaryColor);
    };

    const resetColors = () => {
        elementRef.current.style.removeProperty('--primary_col');
        elementRef.current.style.removeProperty('--secondary_col');
    };

    const handleMouseEnter = () => {
        if (!isExpanded) {
            invertColors();
        }
    };

    const handleMouseLeave = () => {
        if (!isExpanded) {
            resetColors();
        }
    };

    useEffect(() => {
        if (isExpanded) {
            resetColors();
            invertColors();
        } else {
            setActiveTooltip(null)
            resetColors();
        }
    }, [isExpanded]);

    const handlePanelClick = () => {
        onPanelClick(panelName);
    };
    const simContext=useContext(SimulationContext)
    const handleChange = (e, itemName) => {
        e.stopPropagation(); // Add this line to stop event propagation
    
        const inputRef = inputRefs.current[itemName]?.input;
        const shadowRef = inputRefs.current[itemName]?.shadow;
    
        if (inputRef && shadowRef) {
            shadowRef.textContent = e.target.value;
            inputRef.style.width = (shadowRef.offsetWidth + 10) + 'px';
    
            // Use setValueByTechnology to update the state
            simContext.setValueByTechnology(categoryName, panelName, e.target.value);
        }
    };
    
    

    const adjustWidth = (inputRef, shadowRef) => {
        if (!inputRef || !shadowRef) return;
        
        shadowRef.textContent = inputRef.value;
        inputRef.style.width = Math.max(shadowRef.offsetWidth , 0) + 'px'; // Minimum width of 20px
    };

    useLayoutEffect(() => {
        // Adjust width for all inputs after DOM updates
        Object.keys(inputRefs.current).forEach(key => {
            const { input, shadow } = inputRefs.current[key];
            if (input && shadow) {
                shadow.textContent = input.value;
                adjustWidth(input, shadow);
            }
        });
    });
    const handleTooltipClick = (event,term) => {
        event.stopPropagation(); 
        setActiveTooltip(activeTooltip === term ? null : term);
    };

    return (
        <div 
            ref={elementRef}
            id={panelName} 
            onClick={handlePanelClick} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            className='maingame-categoryPanel'
        >
            <div className="categoryPanel-name">{panelName}</div>
            {panelData.isInput ? (
            <>
                <input 
                    ref={el => inputRefs.current[panelName] = { input: el, shadow: inputRefs.current[panelName]?.shadow }}
                    className="categoryPanel-value"
                    type="number"
                    value={panelData.value}
                    style={{ textDecoration: "underline" }}
                    onChange={(e) => handleChange(e, panelName)}
                />
                <span 
                    ref={el => inputRefs.current[panelName] = { ...inputRefs.current[panelName], shadow: el }}
                    className='categoryPanel-value shadowText'
                    style={{ display: 'inline-block', visibility: 'hidden', position: 'absolute', pointerEvents: 'none' }}
                ></span>
            </>
            ) : (
                <div className="categoryPanel-value">
                    {typeof panelData.value === 'object' ? panelData.value : panelData.value}
                </div>
            )}
            {isExpanded && (
                <div className="categoryPanel-expandableDetails">
                    <p className='expandableDetails-description'>
                        {<p className='expand_description'>
                    {parseTextWithTooltips(panelData.expand.description, handleTooltipClick, activeTooltip)}
                </p>}
                    </p>
                    <Graph history={panelData.expand.history} />
                </div>
            )}
        </div>
    );
};

export default CategoryPanel;
