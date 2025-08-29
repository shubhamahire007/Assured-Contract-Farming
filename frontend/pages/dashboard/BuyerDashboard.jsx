import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import RequirementsList from "../../components/Requirement/RequirementsList";
import ContractsList from "../../components/ContractsList";
import PostRequirement from '../../components/Requirement/PostRequirement';
import RequestsList from "../../components/RequestsList";

function BuyerDashboard() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ width: "100%"}}>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
        <Tab label="My Requirements" />
        <Tab label="Post Requirement" />
        <Tab label="My Contracts" />
        <Tab label="Manage Requests" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && <RequirementsList />}
        {tab === 1 && <PostRequirement />}
        {tab === 2 && <ContractsList />}
        {tab === 3 && <RequestsList />}
      </Box>
    </Box>
  );
}

export default BuyerDashboard;
