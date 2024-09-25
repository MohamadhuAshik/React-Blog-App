import React, { useContext } from "react";
import Feed from "./Feed";
import DataContext from "./context/DataContext";
import Loder from "./component/Loder";




const Home = () => {
  const { searchResults, isLoading } = useContext(DataContext)

  return (
    <main className="Home">

      {isLoading && <div style={{ height: "100%" }} className="d-flex  align-items-center justify-content-center"><Loder /></div>}
      {/*  {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )} */}
      {!isLoading &&
        /*     !fetchError && */
        (searchResults.length ? (
          <Feed posts={searchResults} />
        ) : (
          <p className="statusMsg d-flex justify-content-center align-items-center">No Posts To Display</p>
        ))}
    </main>
  );
};

export default Home;
