import { useState } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar.jsx"
import Cards from "./Cards/Cards.jsx";
import './App.css';
import { data } from './data.js'

function App() {
  const [proData, setProData] = useState(data);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState({
    pType: "All",
    moveInDate: new Date(),
    priceRange: [600, 3600],
    location: "All"
  })

  function resetFilters() {
    setFilterData({
      pType: "All",
      moveInDate: new Date(),
      priceRange: [600, 3600],
      location: "All"
    })
    setProData(data)
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && search !== "") {
      const newProData = proData.filter((item) => (Object.values(item)
        .join("")
        .toLowerCase()
        .includes(search.toLowerCase())
      ));
      setProData(newProData);
    } else {
      setProData(data);
    }
  }

  function handleFilter() {
    setProData(data)
    let newProData = proData;
    // Fitering for location
    if (filterData.location !== "All") {
      newProData = newProData.filter((item) => (
        (item.location === filterData.location)
      ))
    } else newProData = data

    // Filtering by move In date
    if (filterData.moveInDate !== (new Date()).toISOString().split('T')[0]) {
      newProData = newProData.filter((item) => {
        let itemDate = item.move_in_date;
        let difference = filterData.moveInDate.getTime() - itemDate.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays >= 0;
      })
    }

    // Fitering for price range
    newProData = newProData.filter((item) => (
      (item.rent > filterData.priceRange[0] && item.rent < filterData.priceRange[1])
    ))

    // Fitering for Property type
    if (filterData.pType !== "All") {
      newProData = newProData.filter((item) => (
        (item.type === filterData.pType)
      ))
    }

    setProData(newProData);
  }

  return (
    <div className="App">
      <Header
        setSearch={setSearch}
        searchValue={search}
        handleKeyPress={handleKeyPress} />
      <FilterBar
        filterData={filterData}
        handleFilter={handleFilter}
        setFilterData={setFilterData}
        resetFilters={resetFilters}
      />
      <Cards
        proData={proData}
        setProData={setProData}
      />
    </div>
  );
}
export default App;
