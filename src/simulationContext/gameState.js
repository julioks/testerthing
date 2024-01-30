import { useEffect, useState } from 'react';
import mockAPI from '../mockSimApi/mockAPI.js';

const useGameState = () => {
    
    const [gameState, setGameState] = useState({
        //inputs and outputs of simulation data that are available for a gameplay
        campaign:{"year":2023},
        availableMenus: [],
        isActive:false,//used to set the transfer from intro to the gameloop
        isLoading: true,//if the new simulation data is being updated
        error: null,
        colors:[]
    });useEffect(() => {
        console.log("Updated gameState:", gameState);
      }, [gameState]);
    const setColors = (colors) => {
        setGameState(prevState => ({
            ...prevState,
            colors: colors // This ensures you're not directly mutating the `colors` array.
        }));
    };
    const setCampaign = async (campaign) => {
        console.log("Received campaign for setCampaign:", campaign);
    
        try {
            const fetchedTechnologies = await fetchTechnologies(campaign.availableMenus);
            console.log("Fetched Technologies:", fetchedTechnologies);
    
            // Log the state before setting
            console.log("State before setting new campaign:", gameState);
    
            setGameState(prevState => ({
                ...prevState,
                campaign: {
                    ...prevState.campaign, // Preserve all existing campaign properties
                    ...campaign, // Apply updates from the new campaign object
                    availableMenus: fetchedTechnologies, // Override availableMenus with the new data
                    "year":2024
                },
                availableMenus: fetchedTechnologies,
                isActive: true, 
                isLoading: false, 
                error: null
            }));
            
    
            // Setting the colors (if needed)
            setColors(campaign.colors);
        } catch (err) {
            console.error("Error fetching availableMenus:", err);
            setGameState(prevState => ({ ...prevState, error: err.message, isLoading: false }));
        }
    };
    
    
    
    const fetchTechnologies = async (technologyNames) => {
        console.log("Technology names in fetchTechnologies:", technologyNames);
        setGameState(prevState => ({ ...prevState, isActive: true, isLoading: true, error: null }));
    
        try {
            const fetchedTechnologies = await mockAPI.getTechnologies(technologyNames);
            console.log("Technologies fetched in fetchTechnologies:", fetchedTechnologies);
    
            if (!fetchedTechnologies) {
                console.error("Fetched technologies are undefined or null");
                throw new Error("Failed to fetch technologies");
            }
    
            setGameState(prevState => ({ ...prevState, availableMenus: fetchedTechnologies }));
            return fetchedTechnologies; // Make sure to return the fetched data
        } catch (err) {
            console.error("Error fetching availableMenus in fetchTechnologies:", err);
            setGameState(prevState => ({ ...prevState, error: err.message }));
        } finally {
            setGameState(prevState => ({ ...prevState, isLoading: false }));
        }
    };
    
    const setValueByTechnology = (technologyName, key, newValue) => {
        console.log("Updating:", technologyName, key, newValue);
        setGameState(prevState => {
            // Check if the specific technology and key exist in the campaign.availableMenus
            if (prevState.campaign.availableMenus &&
                prevState.campaign.availableMenus[technologyName] &&
                prevState.campaign.availableMenus[technologyName][key]) {
                
                // Deep copy to avoid direct mutation
                const updatedMenus = JSON.parse(JSON.stringify(prevState.campaign.availableMenus));
    
                // Update the specific value
                updatedMenus[technologyName][key].value = newValue;
    
                // Return the new state
                return {
                    ...prevState,
                    campaign: {
                        ...prevState.campaign,
                        availableMenus: updatedMenus
                    }
                };
            }
            return prevState;
        });
    };
    const simulateYear = async () => {
        console.log("Simulating next year for campaign:", gameState.campaign);

        try {
            setGameState(prevState => ({ ...prevState, isLoading: true }));

            // Call the simulateNextYear function from mockAPI
            const updatedCampaign = await mockAPI.simulateNextYear(gameState.campaign);
            
            console.log("Updated campaign after simulation:", updatedCampaign);

            setGameState(prevState => ({
                ...prevState,
                campaign: updatedCampaign,
                isLoading: false,
                error: null
            }));

        } catch (err) {
            console.error("Error in simulating next year:", err);
            setGameState(prevState => ({ ...prevState, error: err.message, isLoading: false }));
        }
    };
    
    
    return { gameState, fetchTechnologies,setColors, setValueByTechnology,setCampaign,simulateYear };
};

export default useGameState;
