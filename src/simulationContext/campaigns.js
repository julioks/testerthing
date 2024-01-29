import { useState } from 'react';
import mockAPI from '../mockSimApi/mockAPI.js';

const useCampaigns = () => {
    const [campaignState, setCampaignState] = useState({
        campaigns: [],
        isLoading: true,
        error: null,
    });

    const fetchCampaigns = async () => {
        setCampaignState(prevState => ({ ...prevState, isLoading: true, error: null }));
        try {
            const fetchedCampaigns = await mockAPI.getCampaigns();
            setCampaignState(prevState => ({ ...prevState, campaigns: fetchedCampaigns }));
        } catch (err) {
            console.error("Error fetching campaigns:", err);
            setCampaignState(prevState => ({ ...prevState, error: err.message }));
        } finally {
            setCampaignState(prevState => ({ ...prevState, isLoading: false }));
        }
    };

    return { campaignState, fetchCampaigns };
};

export default useCampaigns;
