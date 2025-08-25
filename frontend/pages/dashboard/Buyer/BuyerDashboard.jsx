import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import RequirementsList from "../../../components/Requirement/RequirementsList";
import ContractsList from "./ContractsList";
import PostRequirement from '../../../components/Requirement/PostRequirement';

function BuyerDashboard() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
        <Tab label="My Requirements" />
        <Tab label="My Contracts" />
        <Tab label="Post Requirement" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && <RequirementsList />}
        {tab === 1 && <ContractsList />}
        {tab === 2 && <PostRequirement />}
      </Box>
    </Box>
  );
}

export default BuyerDashboard;
