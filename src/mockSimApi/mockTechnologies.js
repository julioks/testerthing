export const mockTechnologies = {
    "Grid": {
        "Average Cost per kWh": { 
            value: 0.10, 
            isImportant: true,
            expand: {
                history: [0.15, 0.14, 0.12, 0.14], 
                description: "Average price per kilowatt-hour (kWh), incorporating {production costs}, {transmission losses}, and {administrative overheads}."}
        },
        "Average Grid Capacity": { 
            value: 500, 
            isImportant: false,
            expand: {
                history: [450, 480, 490, 500], 
                description: "Mean grid capacity in megawatts (MW), reflecting the {maximum power transmission capability}, influenced by {infrastructure investments}, renewable integration, and {technology upgrades}."}
        },
        "Infrastructure Failures": { 
            value: 2, 
            isImportant: true,
            expand: {
                history: [5, 3, 4, 2], 
                description: "Count of significant {grid system breakdowns}, due to {natural events}, {aging infrastructure}, or {operational errors}. Declining numbers show maintenance enhancements and robust {infrastructure investments}."}
        }
    },
    
    "Solar": {
        "Solar Panel Installations": { 
            value: 10, 
            isImportant: true,
            isInput:true,
            expand: {
                history: [7, 8, 9, 10], 
                description: "Count of installed solar panels, indicative of solar energy adoption, influenced by {policy}, technology, and {public interest in renewables}."}
        },
        "Solar Power Capacity": { 
            value: 1000, 
            isImportant: false,
            expand: {
                history: [800, 850, 900, 1000], 
                description: "Total solar generation capacity in megawatts (MW), showing maximum potential output and advancements in solar technology and scale."}
        },
        "Solar Energy Generation": { 
            value: 200, 
            isImportant: true,
            expand: {
                history: [150, 160, 180, 200], 
                description: "Energy produced by solar panels in megawatt-hours (MWh), affected by {panel efficiency}, {sunlight availability}, and maintenance."}
        },
        "Solar Infrastructure Efficiency": { 
            value: 80, 
            isImportant: false,
            expand: {
                history: [70, 72, 76, 80], 
                description: "Proportion of solar infrastructure maintaining optimal operation and efficiency."}
        }
    },
"Wind": {
    "Wind Turbine Count": { 
        value: 75, 
        isImportant: true,isInput:true,
        expand: {
            history: [55, 60, 68, 75], 
            description: "Number of operational wind turbines, representing {wind energy infrastructure scale}, driven by policies, technology, and investment trends."}
    },
    "Wind Energy Capacity": { 
        value: 800, 
        isImportant: false,
        expand: {
            history: [650, 700, 750, 800], 
            description: "Total wind generation capacity in megawatts (MW), reflecting maximum power output and efficiency of wind turbines."}
    }
},
"Batteries": {
    "Battery Storage Capacity": { 
        value: 1000, 
        isImportant:true,
        expand: {
            history: [750, 800, 900, 1000], 
            description: "Total battery energy storage in megawatt-hours (MWh), crucial for {energy balance in renewable systems}, with increases showing technological and scale."}
    },
    "Battery Unit Quantity": {
        value: 5000,
        isImportant: false,
        isInput:true,
        expand: {
            history: [4000, 4500, 4800, 5000],
            description: "Total number of battery units deployed in the system, a critical factor in {scalability and redundancy} of energy storage solutions."
        }
    },
    "Energy Storage Efficiency": { 
        value: 90, 
        isImportant: true,
        expand: {
            history: [85, 86, 88, 90], 
            description: "Efficiency percentage of {energy retention during storage} in battery systems."}
    },
    "Battery Lifespan": { 
        value: 10, 
        isImportant: false,
        expand: {
            history: [7, 8, 9, 10], 
            description: "Average operational years of battery systems, with longer lifespans indicating {durability and sustainability enhancements}."}
    },
    "Battery Material Recycling Rate": { 
        value: 70, 
        isImportant: false,
        expand: {
            history: [50, 55, 65, 70], 
            description: "Proportion of battery materials recycled post-use, significant for sustainability and {raw material demand reduction}."}
    }
},

"Hydroelectric": {
    "Hydro Dam Capacity": {
        value: 500, 
        isInput:true,
        isImportant: false,
        expand: {
            history: [400, 450, 475, 500], 
            description: "Total capacity of hydroelectric dams in megawatts (MW), showing maximum power output and reflecting new constructions or upgrades."}
    },
    "Hydroelectric Power Generation": {
        value: 300, 
        isImportant: true,
        expand: {
            history: [250, 260, 280, 300], 
            description: "Energy produced from hydro sources in megawatt-hours (MWh), varying with {water flow and turbine efficiency}."}
    },
    "Hydro Environmental Impact": {
        value: 40, 
        isImportant: false,
        expand: {
            history: [50, 48, 45, 40], 
            description: "Ecological impact score of hydro systems, with lower scores indicating reduced {aquatic and environmental effects}."}
    },
    "Hydro Efficiency": {
        value: 85, 
        isImportant: false,
        expand: {
            history: [80, 82, 84, 85], 
            description: "Conversion rate of water energy to electricity in hydro plants, with higher rates showing technological improvements."}
    }
},

"Geothermal": {
    "Geothermal Plant Capacity": {
        value: 200, 
        isImportant: false,
        isInput:true,
        expand: {
            history: [150, 160, 180, 200], 
            description: "Total geothermal energy capacity in megawatts (MW), reflecting usage scale and plant enhancements."}
    },
    "Geothermal Energy Generation": {
        value: 150, 
        isImportant: true,
        expand: {
            history: [100, 120, 130, 150], 
            description: "Energy output from geothermal sources in megawatt-hours (MWh), influenced by {geological conditions} and operational efficiency."}
    },
    "Geothermal Plant Stability": {
        value: 95, 
        isImportant: false,
        expand: {
            history: [90, 92, 94, 95], 
            description: "Indicates the reliability and consistent performance of geothermal plants. High stability means fewer {operational disruptions} and consistent energy output."
        }
    },
    "Geothermal Environmental Impact": {
        value: 30, 
        isImportant: false,
        expand: {
            history: [40, 38, 35, 30], 
            description: "Assesses the ecological and environmental effects of geothermal energy production. Lower values represent minimal disturbance to local ecosystems and reduced {greenhouse gas emissions}."
        }
    }
},

"Bioenergy": {
    "Biomass Source Diversity": {
        value: 5, 
        isImportant: false,
        expand: {
            history: [3, 4, 4, 5], 
            description: "The number of different biomass sources used for energy, such as {agricultural waste}, {wood}, {and organic waste}. Diversity in sources can lead to more sustainable and stable bioenergy production."
        }
    },
    "Bioenergy Production": {
        value: 120, 
        isImportant: true,
        expand: {
            history: [90, 100, 110, 120], 
            description: "The amount of energy generated from biomass, measured in Megawatt-hours (MWh). This reflects the efficiency and scale of bioenergy production facilities."
        }
    },
    "Biomass Waste Recycling Rate": {
        value: 60, 
        isImportant: false,
        expand: {
            history: [45, 50, 55, 60], 
            description: "Percentage of waste material recycled in bioenergy production. High recycling rates indicate efficient use of biomass and reduced environmental impact."
        }
    },
    "Bioenergy Sustainability Index": {
        value: 80, 
        isImportant: false,
        expand: {
            history: [70, 72, 76, 80], 
            description: "A measure of the overall sustainability of bioenergy practices, considering factors like {carbon emissions}, {land use}, {and ecological impact}. Higher values indicate more sustainable and environmentally friendly practices."
        }
    }
},


"Energy Efficiency": {
    "Smart Grid Integration": {
        value: 70, 
        isImportant: true,
        expand: {
            history: [50, 55, 65, 70], 
            description: "Percentage of the grid using {smart technology}. Smart grids enhance energy efficiency and reliability through better {demand response}, integration of renewable sources, and improved grid management."
        }
    },
    "Building Insulation Level": {
        value: 80, 
        isImportant: false,
        expand: {
            history: [60, 65, 75, 80], 
            description: "Average level of insulation in buildings, rated on a scale of 100. Better insulation reduces energy consumption for heating and cooling, indicating progress in energy conservation practices."
        }
    },
    "Public Transport Usage": {
        value: 60, 
        isImportant: false,
        expand: {
            history: [40, 45, 55, 60], 
            description: "Percentage of the population regularly using public transport. High usage can significantly reduce {individual carbon footprints} and is a key component of sustainable urban planning."
        }
    },
    "Renewable Energy Incentives": {
        value: 50, 
        isInput:true,
        isImportant: false,
        expand: {
            history: [30, 35, 45, 50], 
            description: "A measure of government and private incentives for renewable energy use, rated on a scale of 100. Incentives can include {subsidies}, {tax rebates}, {and grants}. Higher values indicate stronger encouragement for adopting renewable energy."
        }
    }
},

"Policy and Regulation": {
    "Carbon Tax": {
        value: 30, 
        isImportant: true,
        isInput:true,
        expand: {
            history: [10, 15, 25, 30], 
            description: "Level of carbon tax implementation, rated on a scale of 100. A higher value indicates a more aggressive approach to taxing {carbon emissions}, which can drive reductions in {greenhouse gas emissions}."
        }
    },
    "Renewable Energy Targets": {
        value: 60, 
        isImportant: true,
        expand: {
            history: [40, 45, 55, 60], 
            description: "Degree to which renewable energy targets are being met, on a scale of 100. This reflects the commitment and progress of a region in transitioning to {renewable energy sources}."
        }
    },
    "Energy Subsidies": {
        value: 20, 
        isImportant: false,
        isInput:true,
        expand: {
            history: [25, 23, 22, 20], 
            description: "Level of {subsidies} provided for non-{renewable energy sources}, rated out of 100. Lower values indicate a reduction in support for {fossil fuels} and a shift towards cleaner energy alternatives."
        }
    },
    "Public Awareness Level": {
        value: 70, 
        isImportant: false,
        expand: {
            history: [50, 55, 65, 70], 
            description: "The level of public awareness and understanding of energy issues, rated out of 100. Higher values suggest a more informed public, likely to support {sustainable energy initiatives}."
        }
    }
},

};

