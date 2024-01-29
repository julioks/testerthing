import React, { useState, useEffect, useRef } from 'react';

const Graph = ({ history }) => {
    const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
    const [maxLabelWidth, setMaxLabelWidth] = useState(0);
    const labelRef = useRef([]);

    useEffect(() => {
        const updateDimensions = () => {
            const widthInVw = window.innerWidth * 0.25;
            const heightInVh = window.innerHeight * 0.1;
            setSvgDimensions({ width: widthInVw, height: heightInVh });
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        // Calculate the maximum width of the Y-labels
        const maxWidth = Math.max(...labelRef.current.map(ref => ref.offsetWidth));
        setMaxLabelWidth(maxWidth);
    }, [history]);

    if (!history || history.length === 0) return null;

    const margin = { top: 20, right: 20, bottom: 30, left:10+ maxLabelWidth };
    const graphWidth = svgDimensions.width - margin.left - margin.right;
    const graphHeight = svgDimensions.height - margin.top - margin.bottom;
    const maxValue = Math.max(...history);
    const minValue = Math.min(...history);
    const scaleY = graphHeight / (maxValue - minValue);
    const scaleX = graphWidth / (history.length - 1);
    const pathData = history.map((value, index) => {
        const x = margin.left + index * scaleX;
        const y = margin.top + graphHeight - (value - minValue) * scaleY;
        return `${index === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');

    const renderXLabels = () => {
        const currentYear = new Date().getFullYear(); // Get the current year
        const yearOffset = currentYear - 4; // The year corresponding to the 0th index
    
        return history.map((value, index) => {
            const year = yearOffset + index; // Calculate the year for each data point
            const labelPosition = margin.left + index * scaleX;
            // Adjust label frequency as needed
            if (index % Math.floor(history.length / 4) === 0) {
                return (
                    <div 
                        key={index}
                        className="x-label"
                        style={{ position: 'absolute', left: `${labelPosition-5}px`, bottom: '0px' }}
                    >
                        {year}
                    </div>
                );
            }
            return null;
        });
    };
    
    

    const getYPosition = (value) => {
        // Calculate the Y position for a label based on its value
        const y = margin.top + graphHeight - (value - minValue) * scaleY;
        return y - 10; // Adjusting 10 pixels upwards to center the label
    };

    return (
        <div className="graph-outer-container" style={{ padding: '5%' }}>
        <div className="graph-container" style={{ position: 'relative', height: `${svgDimensions.height}px` }}>
            <div 
                ref={el => labelRef.current[0] = el}
                className="y-label" 
                style={{ position: 'absolute', left: '0px', top: `${getYPosition(maxValue)}px` }}
            >
                {maxValue.toFixed(2)}
            </div>
            <div 
                ref={el => labelRef.current[1] = el}
                className="y-label" 
                style={{ position: 'absolute', left: '0px', top: `${getYPosition(minValue)}px` }}
            >
                {minValue.toFixed(2)}
            </div>
            {renderXLabels()}
            <svg width={svgDimensions.width} height={svgDimensions.height} viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}>
                <path d={pathData} fill="none" stroke="var(--primary_col)" />
            </svg>
            </div></div>
    );
};

export default Graph;