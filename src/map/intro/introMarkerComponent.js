/*custom leaflet marker that is used as the campaign selector, must get a single campaign as defined in the mock data*/

import React, { useContext, useEffect, useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { SimulationContext } from '../../simulationContext/SimulationContext';

const IntroMarker = ({campaign}) => {
    const [icon, setIcon] = useState(null);
    const simContext=useContext(SimulationContext);



    useEffect(() => {
       
       const createAndMeasureMarker=()=> {
        
         /*
         because we cant calculate the size unless an element is inserted into the dom, we cant just
        div.querySelector('.marker_name').clientWidth and we have to make a temp_div via document.createElement
        and then get our heights/widths for animations
        */
        const expandedInfoDiv=document.createElement("div");
        expandedInfoDiv.innerHTML=` <div class="marker_infoExpanded">
        <div class="marker_extraDescription">
        ${campaign.exinfoHTML}
        </div>
            <div class="marker_kpis">
                ${campaign.kpis.map(kpi => `<div class="marker_kpiSingle">
                    <div class="marker_kpiName">${kpi.name}</div>
                    <div class="marker_kpiTarget">${kpi.target}</div>
                </div>`).join('')}
            </div>
            <div class="marker_startCampaign">
                Start Campaign!
            </div>
        </div>`;


        const temp_div = document.createElement("div")
        temp_div.classList.add("marker")
        temp_div.innerHTML= `<div class="marker_name">${campaign.name}</div>
        <div class="marker_info">${campaign.infoHTML}</div>
        ${expandedInfoDiv.innerHTML}`;
   

        document.querySelector('.leaflet-marker-pane').append(temp_div)
        document.querySelector('.leaflet-marker-pane').append(expandedInfoDiv)

        var name_height=temp_div.querySelector('.marker_name').getBoundingClientRect().height;
        const name_width=temp_div.querySelector('.marker_name').getBoundingClientRect().width;
        const info_width=temp_div.querySelector('.marker_info').getBoundingClientRect().width;
        expandedInfoDiv.style.width = `${name_width+info_width}px`
        const infoExpanded_height=expandedInfoDiv.querySelector('.marker_infoExpanded').getBoundingClientRect().height;
        
        document.querySelector('.leaflet-marker-pane').removeChild(temp_div)
        document.querySelector('.leaflet-marker-pane').removeChild(expandedInfoDiv)
     

        const div = L.DomUtil.create('div', 'marker');
        div.id = `marker-${campaign.name.replace(/[^a-zA-Z0-9]/g, '_')}`; // Replace non-alphanumeric characters with underscores
        div.innerHTML = temp_div.innerHTML
        /*styling things*/
        div.style.color=campaign.colors.primary;
        div.style.backgroundColor=campaign.colors.secondary;
        div.querySelector('.marker_name').style.background = campaign.colors.primary
        div.querySelector('.marker_name').style.color = campaign.colors.secondary
        div.style.width = `${name_width}px`; // Set initial width
        div.style.height = `${name_height}px`; // Set initial width

        //event listeners for stlying
        div.addEventListener('mouseenter', () => {
            div.style.width = `${name_width + info_width}px`;
            div.querySelector('.marker_info').style.left = name_width + 'px';
            div.querySelector('.marker_info').style.background = campaign.colors.secondary
            div.querySelector('.marker_info').style.color = campaign.colors.primary
        });
        
        div.addEventListener('mouseleave', () => {
            
            div.style.width = `${name_width}px`;
            div.querySelector('.marker_info').style.left = '0px';
            div.style.height = `${name_height}px`;
        });
        div.addEventListener('click', () => {
           
           
            div.querySelector('.marker_infoExpanded').style.left=0
            div.style.height = `${name_height+infoExpanded_height}px`;
            div.querySelector('.marker_infoExpanded').style.background = campaign.colors.secondary
            div.querySelector('.marker_infoExpanded').style.color = campaign.colors.primary

            div.querySelector('.marker_infoExpanded').style.top = `${name_height}px`;
            div.querySelector('.marker_startCampaign').style.background = campaign.colors.primary
            div.querySelector('.marker_startCampaign').style.color = campaign.colors.secondary

        });
        //event listener for starting the campaign
        const startCampaignButton = div.querySelector('.marker_startCampaign');
        if (startCampaignButton) {
            startCampaignButton.addEventListener('click', function() {
                /*is there anything wrong with using a context like this in this particular space??
                i think you can get away without contexts tho....*/
            
                simContext.setCampaign(campaign)
                /*this is a bit sketchy, the call of everything holds onto the console log and the app relying on the usestate in the map*/
                console.log("Start campaign clicked",campaign.availableMenus,simContext.fetchTechnologies(campaign.availableMenus));
                
            });
        }

        const customIcon = L.divIcon({
            html: div
        });
        setIcon(customIcon);
    }
        //to make sure calculations are done when foants are loaded, although on some edge cases it still does not work
        //for now the edgecases are cirumvented by the loadingtime for the simulation details. i.e. the fonts get applied
        //in time for calculations whilst the simcontext is fetching data
        document.fonts.ready.then(() => {
            createAndMeasureMarker();
        });

    }, [campaign]);

    if (!icon) return null;

    

    return <Marker id={campaign.name} position={campaign.coordinates} icon={icon} />;
}
export default IntroMarker;
