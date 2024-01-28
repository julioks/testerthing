import { useContext, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { SimulationContext } from '../simulationContext/SimulationContext'
import IntroMarker from './intro/introMarkerComponent'

const LeafletMap = () => {
    const simContext = useContext(SimulationContext);

    useEffect(() => {
        simContext.fetchCampaigns();
        console.log(simContext.fetchTechnologies("Grid"))
    }, []); // Fetch campaigns on component mount

    if (simContext.campaignState.isLoading) {
        // Still loading data
        return <div>Loading...</div>;
    } else if (simContext.campaignState.error) {
        // Error occurred during fetch
        return <div>Error: {simContext.error}</div>;
    } else if (simContext.campaignState.campaigns && simContext.campaignState.campaigns.length > 0) {
        // Data fetched and available
        
        return (
            <MapContainer 
                id='map' 
                center={[52.2368962532708, 5.60386799596014]} 
                zoom={8} 
                style={{ height: '100vh' }}
            >
                <TileLayer
                    attribution='&copy;'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {simContext.campaignState.campaigns.map((campaign) => (
                    <IntroMarker key={campaign.name} campaign={campaign} />
                ))}
            </MapContainer>
        );
    } else {
        // Data fetched but empty
        return <div>No campaigns available.</div>;
    }
};

export default LeafletMap;
