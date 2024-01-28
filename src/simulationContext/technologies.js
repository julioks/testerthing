import { useState } from 'react';
import mockAPI from '../mockSimApi/mockAPI.js';

const useTechnologies = () => {
    const [techState, setTechState] = useState({
        technologies: [],
        isLoading: false,
        error: null,
    });

    const fetchTechnologies = async (technologyNames) => {
        setTechState(prevState => ({ ...prevState, isLoading: true, error: null }));
        try {
            const fetchedTechnologies = await mockAPI.getTechnologies(technologyNames);
            setTechState(prevState => ({ ...prevState, technologies: fetchedTechnologies }));
        } catch (err) {
            console.error("Error fetching technologies:", err);
            setTechState(prevState => ({ ...prevState, error: err.message }));
        } finally {
            setTechState(prevState => ({ ...prevState, isLoading: false }));
        }
    };

    return { techState, fetchTechnologies };
};

export default useTechnologies;
