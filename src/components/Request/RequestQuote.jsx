import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faTruckLoading,
  faBus,
  faShip,
} from "@fortawesome/free-solid-svg-icons";
import FullTruckloadForm from "./FullTruckloadForm"; // Import FullTruckloadForm

function RequestQuoteApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullTruckloadModalOpen, setIsFullTruckloadModalOpen] =
    useState(false); // Track full truckload modal
  const [setSelectedQuoteType] = useState(""); // Correct state initialization

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuoteType(""); // Reset selected quote type when modal is closed
  };

  const handleFullTruckloadModalOpen = () => {
    setIsFullTruckloadModalOpen(true); // Open the full truckload modal
  };

  const handleFullTruckloadModalClose = () => {
    setIsFullTruckloadModalOpen(false); // Close the full truckload modal
  };

  return (
    <div style={styles.appContainer}>
      {/* Main Button to Open Request a Quote Modal */}
      <button style={styles.requestButton} onClick={handleOpenModal}>
        REQUEST A QUOTE
      </button>

      {/* Request Quote Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            {/* Close Button */}
            <div style={styles.closeButton} onClick={handleCloseModal}>
              ✖
            </div>

            <h2 style={styles.header}>REQUEST A QUOTE</h2>

            {/* Quote Options */}
            <div style={styles.buttonContainer}>
              <button
                style={styles.button}
                onClick={handleFullTruckloadModalOpen} // Open the full truckload form modal
              >
                <FontAwesomeIcon icon={faTruck} style={styles.icon} /> FULL
                TRUCKLOAD
              </button>

              <button
                style={styles.button}
                // onClick={() => handleButtonClick("LESS THAN TRUCKLOAD")}
              >
                <FontAwesomeIcon icon={faTruckLoading} style={styles.icon} />{" "}
                LESS THAN TRUCKLOAD
              </button>

              <button
                style={styles.button}
                // onClick={() => handleButtonClick("INTERMODAL")}
              >
                <FontAwesomeIcon icon={faBus} style={styles.icon} /> INTERMODAL
              </button>

              <button
                style={styles.button}
                // onClick={() => handleButtonClick("DRAYAGE")}
              >
                <FontAwesomeIcon icon={faShip} style={styles.icon} /> DRAYAGE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Truckload Form Modal */}
      {isFullTruckloadModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            {/* Close Button */}
            <div
              style={styles.closeButton}
              onClick={handleFullTruckloadModalClose}
            >
              ✖
            </div>

            {/* Full Truckload Form */}
            <FullTruckloadForm />
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
    backgroundColor: "#000", // Black button background
    color: "#fff", // White text
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
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black overlay
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "400px",
    padding: "40px",
    borderRadius: "15px",
    backgroundColor: "#fff", // White modal background
    position: "relative",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  closeButton: {
    position: "absolute",
    top: "55px",
    right: "50px",
    fontSize: "28px",
    cursor: "pointer",
    color: "#000", // Black close button
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#000", // Black text
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  button: {
    padding: "10px 20px", // Adjust padding for better alignment
    fontSize: "16px",
    border: "1px solid #000", // Black border
    borderRadius: "5px",
    backgroundColor: "#fff", // White background
    cursor: "pointer",
    color: "#000", // Black text
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start", // Align icon and text inline left
    gap: "10px", // Space between icon and text
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },

  icon: {
    fontSize: "30px", // Font Awesome icon size
    color: "#000", // Black icon
  },
};

export default RequestQuoteApp;