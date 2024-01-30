import { useContext, useEffect, useRef } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { SimulationContext } from '../simulationContext/SimulationContext'
import IntroMarker from './intro/introMarkerComponent'
import MainMenu from './maingame/MenuComponent';
import IntroStaticMarker from './intro/introStaticMarkerComponent';
import LoadingScreen from './loadingComponent';

const LeafletMap = () => {
    const simContext = useContext(SimulationContext);
    const mapRef=useRef();
    useEffect(() => {
       simContext.fetchCampaigns();
    }, []); // Fetch campaigns on component mount

    const renderMapContent = () => {

        if (!simContext.gameState.isActive) {
            if (!simContext.campaignState.isLoading) {
                return (
                    <>
                    {simContext.campaignState.campaigns.map((campaign) => (
                        campaign.name === "Zenmo Zero" ? 
                            <IntroStaticMarker key={campaign.name} campaign={campaign} /> :
                            <IntroMarker key={campaign.name} campaign={campaign} />
                    ))}
                </>
                
                );
            } 
        }  else  {
            if (!simContext.gameState.isLoading) {
                
                if (mapRef.current) {
                    mapRef.current.flyTo(simContext.gameState.campaign.coordinates, 16);
                  }
                document.body.style.setProperty('--primary_col', simContext.gameState.colors.primary);
                document.body.style.setProperty('--secondary_col', simContext.gameState.colors.secondary);
                   
                    return <MainMenu/>
                      
            }
            else{
                return <LoadingScreen text={"Year "+(simContext.gameState.campaign.year+1)}/>;
            }
           
        }
        // You can add more conditions for different stages as needed
    };
    if (simContext.campaignState.isLoading) {
        // Still loading data
        return <LoadingScreen text={"Zenmo Zero"}/>;
    } else if (simContext.campaignState.error) {
        // Error occurred during fetch
        return <div>Error: {simContext.error}</div>;
    } else if (simContext.campaignState.campaigns && simContext.campaignState.campaigns.length > 0) {
        // Data fetched and available
        
        return (
            <MapContainer 
                ref={mapRef}
                id='map' 
                center={[52.2368962532708, 5.60386799596014]} 
                zoom={8} 
                style={{ height: '100vh' }}
            >
                <TileLayer
                    attribution='&copy;'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {renderMapContent()}
            </MapContainer>
        );
    } else {
        // Data fetched but empty
        return <div>No campaigns available.</div>;
    }
};

export default LeafletMap;
