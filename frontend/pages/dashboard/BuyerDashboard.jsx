import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import RequirementsList from "../../components/Requirement/RequirementsList";
import ContractsList from "../../components/Contract/ContractsList";
import PostRequirement from "../../components/Requirement/PostRequirement";
import RequestsList from "../../components/Request/RequestsList";

function BuyerDashboard() {
  const [tab, setTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const tabStyle = {
    textTransform: "none", // Prevents ALL CAPS
    fontWeight: "600",
    fontSize: "1rem",
    color: "rgba(0, 0, 0, 0.87)", // Default text color
    "&:hover": {
      color: "#15803d", // Darker green on hover
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#16a34a", // Primary green when selected
    },
  };

  return (
    <Box sx={{ width: "80%", mx: "auto", mt: 4 }}>
      <Tabs 
        value={tab} 
        onChange={handleTabChange}
        centered
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#16a34a",
          },
        }}
      >
        <Tab label="My Requirements" sx={tabStyle} />
        <Tab label="Post Requirement" sx={tabStyle} />
        <Tab label="My Contracts" sx={tabStyle} />
        <Tab label="Manage Requests" sx={tabStyle} />
      </Tabs>

      <Box>
        {tab === 0 && <RequirementsList />}
        {tab === 1 && <PostRequirement />}
        {tab === 2 && <ContractsList />}
        {tab === 3 && <RequestsList />}
      </Box>
    </Box>
  );
}

export default BuyerDashboard;
