
const Home = () => {
  const role = localStorage.getItem("role") || "";
  return (
    <div>
      <h1>Home</h1>
      <br /><br />
      {role == "Farmer" && (
        <>
          <h2>Buyers Requirements</h2>
         
        </>
      )}
    </div>
  );
};

export default Home;
