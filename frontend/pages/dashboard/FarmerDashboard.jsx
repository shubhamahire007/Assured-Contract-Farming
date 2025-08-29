import PostOffer from '../../components/Offer/PostOffer';
import OffersList from '../../components/Offer/OffersList';
import ContractsList from '../../components/ContractsList';
import RequestsList from '../../components/RequestsList';
import { useState } from 'react';
import { Tabs, Tab, Box } from "@mui/material";

const FarmerDashboard = () => {
  const [tab, setTab] = useState(0);
  
    return (
      <Box sx={{ width: "100%" }}>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
          <Tab label="My Offers" />
          <Tab label="Post Offer" />
          <Tab label="My Contracts" />
          <Tab label="Manage Requests" />
        </Tabs>
  
        <Box sx={{ mt: 3 }}>
          {tab === 0 && <OffersList />}
          {tab === 1 && <PostOffer />}
          {tab === 2 && <ContractsList />}
          {tab === 3 && <RequestsList />}
        </Box>
      </Box>
    );
};

export default FarmerDashboard;
