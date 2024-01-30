import React, { useState, useEffect } from 'react';

const TooltipInfo = ({ term, explanation, onClick, isActive }) => {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        setIsClicked(isActive);
    }, [isActive]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isClicked) {
                setIsClicked(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isClicked]);

    const handleClick = (event) => {
        event.stopPropagation();
        onClick(event);  // Pass the event to the handler in parent
    };

    return (
        <span 
            className="tooltipInfo" 
            onClick={handleClick}
            style={{ textDecoration: isClicked ? 'none' : 'underline', cursor: 'pointer' }}
        >
            {term}
            {isClicked && (
                <div className="tooltipContent">
                    {explanation}
                </div>
            )}
        </span>
    );
};

export default TooltipInfo;
