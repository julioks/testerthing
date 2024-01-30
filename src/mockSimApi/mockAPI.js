import { mockCampaigns } from "./mockCampaigns";
import { mockTechnologies } from "./mockTechnologies";

// Helper function for simulation logic
const calculateNewValue = (data) => {
  const randomFactor = Math.random() * 0.1; // Adding some randomness
  const newValue = data.value * (1 + randomFactor);
  return Number(newValue.toFixed(2)); // Round to 2 decimal places and convert back to number
};

const simulateNextYear = (campaign) => {
  let newCampaign = JSON.parse(JSON.stringify(campaign));

  // Update the year
  newCampaign.year++;

  // Update the budget
  newCampaign.budget = Math.round(newCampaign.budget * 1.05);

  // Iterate through each category in the campaign
  Object.keys(newCampaign['availableMenus']).forEach(category => {
    Object.keys(newCampaign['availableMenus'][category]).forEach(key => {
      const data = newCampaign['availableMenus'][category][key];

      // Add current value to history
      data.expand.history.push(data.value);

      // Update values only if it's not an input field
      if (!data.isInput) {
        const newValue = calculateNewValue(data);
        data.value = newValue; // Update with new value
      }
    });
  });

  return newCampaign;
};



// Mock API functions
const mockAPI = {
  getCampaigns: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockCampaignData = mockCampaigns;
        resolve(mockCampaignData);
      }, 2000); // 2 seconds delay
    });
  },
  getTechnologies: (technologyNames) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredTechnologies = Object.entries(mockTechnologies)
          .filter(([key]) => technologyNames.includes(key))
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
        resolve(filteredTechnologies);
      }, 2000); // 2 seconds delay
    });
  },
  simulateNextYear: (campaign) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Apply the year progression simulation to the provided campaign object
        const updatedCampaign = simulateNextYear(campaign);
        resolve(updatedCampaign);
      }, 2000); // 2 seconds delay
    });
  }
};

export default mockAPI;
