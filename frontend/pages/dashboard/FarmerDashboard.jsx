import PostOffer from '../../components/Offer/PostOffer';
import OffersList from '../../components/Offer/OffersList';
import ContractsList from '../../components/Contract/ContractsList';
import RequestsList from '../../components/Request/RequestsList';
import { useState, useContext } from 'react';
import { Tabs, Tab, Box } from "@mui/material";
import { AppContext } from '../../context/AppContext';

const FarmerDashboard = () => {
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
    <Box sx={{ width: "80%", mx: "auto", mt: 4, mb:0 }}>
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
        <Tab label="My Offers" sx={tabStyle} />
        <Tab label="Post Offer" sx={tabStyle} />
        <Tab label="My Contracts" sx={tabStyle} />
        <Tab label="Manage Requests" sx={tabStyle} />
      </Tabs>

      <Box>
          {tab === 0 && <OffersList />}
          {tab === 1 && <PostOffer/>}
          {tab === 2 && <ContractsList />}
          {tab === 3 && <RequestsList />}
        </Box>
      </Box>
    );
};

export default FarmerDashboard;
