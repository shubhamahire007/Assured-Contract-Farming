import OffersList from '../../../components/Offer/OffersList';
import RequirementsList from '../../../components/Requirement/RequirementsList';
import UsersList from './UsersList';
import ContractsList from '../../../components/ContractsList';

// import ContractsList from './ContractsList';

import { useState } from 'react';
import { Tabs, Tab, Box } from "@mui/material";

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ width: "100%"}}>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
        <Tab label="Farmers" />
        <Tab label="Buyers" />
        <Tab label="Requirements" />
        <Tab label="Offers" />
        <Tab label="Contracts" />
      </Tabs>

      {tab === 0 && <UsersList role="Farmer"/>}
      {tab === 1 && <UsersList role="Buyer"/>}
      {tab === 2 && <RequirementsList />}
      {tab === 3 && <OffersList />}
      {tab === 4 && <ContractsList />}
    </Box>
  );
}

export default AdminDashboard;
