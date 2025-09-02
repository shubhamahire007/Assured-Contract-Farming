import OffersList from "../../../components/Offer/OffersList";
import RequirementsList from "../../../components/Requirement/RequirementsList";
import UsersList from "./UsersList";
import ContractsList from "../../../components/Contract/ContractsList";
import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

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

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ width: "80%", mx: "auto", mt: 4 }}>
      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        centered
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#16a34a",
          },
        }}
      >
        <Tab label="Farmers" sx={tabStyle} />
        <Tab label="Buyers" sx={tabStyle} />
        <Tab label="Requirements" sx={tabStyle} />
        <Tab label="Offers" sx={tabStyle}/>
        <Tab label="Contracts" sx={tabStyle} />
      </Tabs>

      {tab === 0 && <UsersList role="Farmer" />}
      {tab === 1 && <UsersList role="Buyer" />}
      {tab === 2 && <RequirementsList />}
      {tab === 3 && <OffersList />}
      {tab === 4 && <ContractsList />}
    </Box>
  );
};

export default AdminDashboard;
