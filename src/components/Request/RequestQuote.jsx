import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faTruckLoading,
  faBus,
  faShip,
} from "@fortawesome/free-solid-svg-icons";
import FullTruckLoadForm from "./FullTruckloadForm"; // Import the new component

function RequestQuoteApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuoteType, setSelectedQuoteType] = useState("");
  const navigate = useNavigate(); // Hook to navigate to other routes

  const handleQuoteSelection = (type) => {
    setSelectedQuoteType(type);
    if (type === "FULL_TRUCKLOAD") {
      navigate("/full-truckload-form"); // Navigate to the FullTruckLoadForm component
    }
    // You can add other conditions for other quote types if needed
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuoteType("");
  };

  return (
    <div style={styles.appContainer}>
      <button style={styles.requestButton} onClick={handleOpenModal}>
        REQUEST A QUOTE
      </button>

      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            style={styles.modalContainer}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal on content click
          >
            <div style={styles.closeButton} onClick={handleCloseModal}>
              ✖
            </div>

            <h2 style={styles.header}>REQUEST A QUOTE</h2>

            <div style={styles.buttonContainer}>
              <button
                style={styles.button}
                onClick={() => handleQuoteSelection("FULL_TRUCKLOAD")}
              >
                <FontAwesomeIcon icon={faTruck} style={styles.icon} /> FULL
                TRUCKLOAD
              </button>

              <button
                style={styles.button}
                onClick={() => handleQuoteSelection("LESS_THAN_TRUCKLOAD")}
              >
                <FontAwesomeIcon icon={faTruckLoading} style={styles.icon} />
                LESS THAN TRUCKLOAD
              </button>

              <button
                style={styles.button}
                onClick={() => handleQuoteSelection("INTERMODAL")}
              >
                <FontAwesomeIcon icon={faBus} style={styles.icon} /> INTERMODAL
              </button>

              <button
                style={styles.button}
                onClick={() => handleQuoteSelection("DRAYAGE")}
              >
                <FontAwesomeIcon icon={faShip} style={styles.icon} /> DRAYAGE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  appContainer: {
    textAlign: "center",
    marginTop: "50px",
  },
  requestButton: {
    padding: "15px 30px",
    fontSize: "16px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "400px",
    padding: "40px",
    borderRadius: "15px",
    backgroundColor: "#fff",
    position: "relative",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "20px",
    cursor: "pointer",
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "1px solid #000",
    borderRadius: "5px",
    backgroundColor: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
    transition: "background-color 0.3s ease",
  },
  icon: {
    fontSize: "24px",
  },
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequestQuoteApp />} />
        <Route path="/full-truckload-form" element={<FullTruckLoadForm />} />
      </Routes>
    </Router>
  );
}

export default App;