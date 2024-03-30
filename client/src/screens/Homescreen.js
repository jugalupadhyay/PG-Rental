import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPgs } from "../actions/pgActions";
import Select from "react-select";
import PG from "../components/PG";
import Search from "../components/Search";
import { useTransition, animated, config } from "react-spring";
const options = [
  { value: "laundry", label: "Laundry" },
  { value: "food", label: "Mess/Canteen" },
  { value: "parking", label: "Vehicle Parking" },
  { value: "wifi", label: "Wifi" },
  { value: "refrigerator", label: "Refrigerator" },
  { value: "hotWater", label: "Hot Water Provision" },
];

export default function Homescreen() {
  const [selectedFacility, setSelectedFacility] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortByPrice, setSortByPrice] = useState(null); 
  const [darkMode, setDarkMode] = useState(false); 
  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerImages] = useState([
    "url('')", //write image url
    "url('')", //write image url
  ]);
  const [progress, setProgress] = useState(0);

  const pgsState = useSelector((state) => state.getAllPgsReducer);
  const { pgs, error, loading } = pgsState;
  const dispatch = useDispatch();
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedFacilities(selectedOptions.map((option) => option.value));
  };

  useEffect(() => {
    dispatch(getAllPgs());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the banner index circularly
      setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
      setProgress(0); // Reset progress bar
    }, 5000); // Change banner image every 5 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [bannerImages.length]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        searchTerm.trim() !== ""
          ? `/search/${searchTerm}`
          : "/api/pgs/getallpgs"
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const filteredPgs = pgs.filter((pg) => {
    const matchesSearchTerm =
      searchTerm.trim() === "" ||
      pg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pg.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      pg.catagory.toLowerCase() === selectedCategory;

    const matchesFacility =
      selectedFacilities.length === 0 ||
      selectedFacilities.every((facility) =>
        pg.otherfacilities.some((otherFacility) => otherFacility[facility])
      );

    return matchesSearchTerm && matchesCategory && matchesFacility;
  });

  // Sorting logic based on selected option
  const sortedPgs = [...filteredPgs].sort((a, b) => {
    const getPrice = (pg) => {
      // Find the price for the first variant
      const variant = Object.keys(pg.prices[0])[0];
      return parseFloat(pg.prices[0][variant]) || 0;
    };

    if (sortByPrice === "highToLow") {
      return getPrice(b) - getPrice(a);
    } else if (sortByPrice === "lowToHigh") {
      return getPrice(a) - getPrice(b);
    } else {
      return 0;
    }
  });

  // React Spring transitions
  const transitions = useTransition(sortedPgs, {
    key: (pg) => pg._id,
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-40px,0)" },
  });

  // Function to determine text color based on background brightness
  const getTextColor = (backgroundColor) => {
    if (!backgroundColor) return "#000"; // Default to black if background color is not provided
    const rgb = backgroundColor.match(/\d+/g);
    if (!rgb || rgb.length !== 3) return "#000"; // Default to black if RGB values are not available
    const brightness =
      (parseInt(rgb[0]) * 299 +
        parseInt(rgb[1]) * 587 +
        parseInt(rgb[2]) * 114) /
      1000;

    // Choose black or a purplish shade based on brightness
    return brightness >= 128 ? "#000" : "rgba(75, 0, 130, 1)"; // If brightness is high, return black, otherwise return a purplish shade
  };

  // Text animations
  const textTransitions = useTransition(true, {
    from: { opacity: 0, transform: "translateY(-20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    delay: 500, // Delay the animation
  });

  const nextBanner = () => {
    setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    setProgress(0); // Reset progress bar
  };

  const prevBanner = () => {
    setBannerIndex(
      (prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length
    );
    setProgress(0); // Reset progress bar
  };

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 1);
    }, 50); // Update progress bar every 50 milliseconds

    return () => clearInterval(progressInterval); // Clear the interval on component unmount
  }, []);

  return (
    <div>
      {/* Cover Photo Banner */}
      <div
        style={{
          backgroundImage: bannerImages[bannerIndex],
          backgroundSize: "cover",
          height: "300px",
          position: "relative",
        }}
      >
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", height: "100%" }}>
          {/* Banner content with animation */}
          {textTransitions((styles, item) =>
            item ? (
              <animated.div style={styles}>
                <h1
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    paddingTop: "100px",
                  }}
                >
                  PG-Rental : Your Rental Destination
                </h1>
              </animated.div>
            ) : null
          )}
          {/* Side buttons for next/previous banner */}
          <button
            style={{
              position: "absolute",
              top: "50%",
              left: "20px",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={prevBanner}
          >
            ❮
          </button>
          <button
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={nextBanner}
          >
            ❯
          </button>
          {/* Progress bar */}
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "100%",
              height: "2px",
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          >
            <animated.div
              style={{
                width: `${(progress / 100) * 100}%`,
                height: "100%",
                backgroundColor: "#007bff",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          background: darkMode ? "#333" : "#fff",
          color: getTextColor(darkMode ? "#333" : "#fff"),
        }}
      >
        <nav style={{ backgroundColor: darkMode ? "#444" : "#f4f4f4" }}>
          {/* Navbar content */}
        </nav>
        <div
          style={{
            margin: "30px 0",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
              margin: "10px auto",
              maxWidth: "1100px",
            }}
          >
            {/* Search bar */}
            <input
              type="text"
              value={searchTerm}
              placeholder="Search PG"
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: window.innerWidth <= 768 ? "100%" : "30%",
                width: "40%",
                padding: "10px",
                fontSize: "16px",
                border: "3px solid #ccc",
                borderRadius: "50px",
              }}
            />
            {/* Category dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                marginLeft: "10px",
                padding: "10px",
                fontSize: "16px",
                border: "3px solid #ccc",
                borderRadius: "50px",
              }}
            >
              <option value="all">All</option>
              <option value="girlspg">Girls PG</option>
              <option value="boyspg">Boys PG</option>
            </select>

            {/* Facility dropdown */}
            <div>
              <Select
                isMulti
                value={options.filter((option) =>
                  selectedFacilities.includes(option.value)
                )}
                onChange={handleChange}
                options={options}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    borderRadius: "50px",
                    width: "200px",
                  }),
                }}
              />
            </div>

            {/* Sort by price dropdown */}
            <select
              value={sortByPrice}
              onChange={(e) => setSortByPrice(e.target.value)}
              style={{
                marginLeft: "10px",
                padding: "10px",
                fontSize: "16px",
                border: "3px solid #ccc",
                borderRadius: "50px",
              }}
            >
              <option value={null}>Sort by Price</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="lowToHigh">Price: Low to High</option>
            </select>

            {/* Dark mode toggle button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                marginLeft: "10px",
                padding: "10px",
                fontSize: "16px",
                border: "3px solid #ccc",
                borderRadius: "50px",
                backgroundColor: darkMode ? "#333" : "#fff",
                color: darkMode ? "#fff" : getTextColor("#fff"),
              }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        <div className="row justify-content-center">
          {loading ? (
            <h1>Loading</h1>
          ) : error ? (
            <h1>Something went wrong</h1>
          ) : searchResults.length > 0 ? (
            <Search data={searchResults} />
          ) : (
            transitions((styles, pg) => (
              <animated.div
                style={styles}
                key={pg._id}
                className="col-md-3 m-3"
              >
                <div>
                  <PG pg={pg} />
                </div>
              </animated.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
