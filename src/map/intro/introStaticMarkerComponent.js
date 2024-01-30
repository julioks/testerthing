import React, { useState, useEffect, useRef, useContext } from 'react';
import { SimulationContext } from '../../simulationContext/SimulationContext';

const IntroStaticMarker = ({ campaign }) => {
    const markerRef = useRef(null);
    const simContext = useContext(SimulationContext);

    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [dimensions, setDimensions] = useState({ nameWidth: 0, nameHeight: 0, infoWidth: 0, expandedInfoHeight: 0 });

    useEffect(() => {
        if (markerRef.current) {
            const nameElem = markerRef.current.querySelector('.marker_name');
            const infoElem = markerRef.current.querySelector('.marker_info');
            const expandedInfoElem = markerRef.current.querySelector('.marker_infoExpanded');

            const nameHeight = nameElem.getBoundingClientRect().height;
            const nameWidth = nameElem.getBoundingClientRect().width;
            const infoWidth = infoElem.getBoundingClientRect().width;
            const expandedInfoHeight = expandedInfoElem.getBoundingClientRect().height;

            expandedInfoElem.style.width = `${nameWidth + infoWidth}px`;
            setDimensions({ nameWidth, nameHeight, infoWidth, expandedInfoHeight });
        }
    }, [campaign]); // Recalculate when campaign changes

    useEffect(() => {
        if (!markerRef.current || !dimensions) return;

        const infoElem = markerRef.current.querySelector('.marker_info');
        const expandedInfoElem = markerRef.current.querySelector('.marker_infoExpanded');

        if (isHovered) {
            markerRef.current.style.width = `${dimensions.nameWidth + dimensions.infoWidth}px`;
            markerRef.current.style.height=`${dimensions.nameHeight}px`;
            infoElem.style.left = `${dimensions.nameWidth}px`;
            infoElem.style.background = campaign.colors.secondary;
            infoElem.style.color = campaign.colors.primary;
            
        } else {setIsClicked(false)
            markerRef.current.style.width = `${dimensions.nameWidth}px`;
            infoElem.style.left = '0px';
            markerRef.current.style.height=`${dimensions.nameHeight}px`
        }

        if (isClicked) {
            markerRef.current.style.height = `${dimensions.nameHeight + dimensions.expandedInfoHeight}px`;
            expandedInfoElem.style.position = 'absolute'; // Positioning relative to the marker
            expandedInfoElem.style.zIndex = 10000; // Bring to front if needed
        }
    }, [isHovered, isClicked, dimensions, campaign.colors]);
    const handleStartCampaign = () => {
        simContext.setCampaign(campaign);
        console.log("Start campaign clicked", campaign.availableMenus, simContext.fetchTechnologies(campaign.availableMenus));
    };

    if (!dimensions) return null; // Ensure dimensions are set before rendering

    return (
        <div id='marker-Zenmo_Zero'
            ref={markerRef}
            className="marker"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsClicked(!isClicked)}
            style={{
                color: campaign.colors.primary,
                backgroundColor: campaign.colors.secondary,
                width: `${dimensions.nameWidth}px`,
                height: `${dimensions.nameHeight}px`
            }}
        >
            <div className="marker_name" style={{ background: campaign.colors.primary, color: campaign.colors.secondary }}>
                {campaign.name}
            </div>
            <div className="marker_info" dangerouslySetInnerHTML={{ __html: campaign.infoHTML }} />
            <div className="marker_infoExpanded" style={{ background: campaign.colors.secondary, color: campaign.colors.primary, left:0 ,top : `${dimensions.nameHeight}px`}}>
                <div className="marker_extraDescription" dangerouslySetInnerHTML={{ __html: campaign.exinfoHTML }} />
                <div className="marker_kpis">
                    {campaign.kpis.map((kpi, index) => (
                        <div key={index} className="marker_kpiSingle">
                            <div className="marker_kpiName">{kpi.name}</div>
                            <div className="marker_kpiTarget">{kpi.target}</div>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
};

export default IntroStaticMarker;
