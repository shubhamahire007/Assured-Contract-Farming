import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import RequirementForm from "./RequirementForm";
import RequirementsList from "./RequirementsList";
import ContractsList from "./ContractsList";

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
        {tab === 2 && <RequirementForm />}
      </Box>
    </Box>
  );
}

export default BuyerDashboard;
