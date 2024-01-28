import { mockCampaigns } from "./mockCampaigns";
import { mockTechnologies } from "./mockTechnologies";

// Mock API functions
const mockAPI = {
  getCampaigns: () => {
    return new Promise((resolve) => {
      setTimeout(() => {

        const mockCampaignData = mockCampaigns;

        resolve(mockCampaignData);
      }, 2000); // 2000 milliseconds = 2 seconds delay
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
      console.log(filteredTechnologies)
      }, 2000); // 2000 milliseconds = 2 seconds delay
    });
  },
};

export default mockAPI;
