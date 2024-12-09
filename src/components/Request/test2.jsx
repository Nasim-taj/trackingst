import { useState } from "react";
import { FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // React Router hook

function FullTruckloadForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    company: "",
    phoneNumber: "",
    email: "",
    OriginZone: "",
    OriginProvince: "",
    OriginCity: "",
    OriginZipCode: "",
    OriginPickupDate: "",
    OriginPickupTime: "",
    DestZone: "",
    DestProvince: "",
    DestCity: "",
    DestZipCode: "",
    DestPickupDate: "",
    DestPickupTime: "",
    Equipment: "",
    TrailerSize: "",
    Comment: "",
    CityPostalCode: "",
  });

  const navigate = useNavigate(); // Initialize navigate function

  const goToRequestQuote = () => {
    navigate("/"); // Adjust the path as per your routing setup
  };

  const [currentStep, setCurrentStep] = useState(4);
  const [focusedInput, setFocusedInput] = useState("");

  const handleNextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBackStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFocus = (inputName) => setFocusedInput(inputName);
  const handleBlur = () => setFocusedInput("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const stepHeaders = [
    "Personal",
    "Origin",
    "Destination",
    "Shipping",
    "Review",
  ];

  const isLabelFocused = (inputName) =>
    focusedInput === inputName ||
    (formData[inputName] && formData[inputName].length > 0);

  // Hardcoded list of cities and postal codes
  const citiesAndPostalCodes = [
    { city: "New York", postalCode: "10001" },
    { city: "Los Angeles", postalCode: "90001" },
    { city: "Chicago", postalCode: "60601" },
    { city: "Houston", postalCode: "77001" },
    { city: "Phoenix", postalCode: "85001" },
    { city: "Philadelphia", postalCode: "19102" },
    { city: "San Antonio", postalCode: "78201" },
    { city: "San Diego", postalCode: "92101" },
    // Add more cities and postal codes as needed
  ];

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange2 = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, CityPostalCode: value });

    if (value) {
      const filteredSuggestions = citiesAndPostalCodes.filter(
        (item) =>
          item.city.toLowerCase().includes(value.toLowerCase()) ||
          item.postalCode.startsWith(value)
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData({
      ...formData,
      CityPostalCode: `${suggestion.city}, ${suggestion.postalCode}`,
    });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.formHeaderStyle}>
        <button style={styles.backButtonStyle} onClick={handleBackStep}>
          <FaArrowLeft />
        </button>
        <h1 style={styles.headerTitleStyle}>FULL TRUCKLOAD</h1>
        <button style={styles.backButtonStyle} onClick={goToRequestQuote}>
          <FaTimes />
        </button>
      </div>

      <div style={styles.progressContainer}>
        {stepHeaders.map((header, index) => (
          <div key={index} style={styles.stepWrapper}>
            {/* Step Circle */}
            <div
              style={{
                ...styles.step,
                backgroundColor:
                  currentStep > index + 1
                    ? "#28a745"
                    : currentStep === index + 1
                    ? "#000"
                    : "#e0e0e0",
                color:
                  currentStep > index + 1 || currentStep === index + 1
                    ? "#fff"
                    : "#000",
              }}
            >
              {currentStep > index + 1 ? <FaCheck /> : index + 1}
            </div>

            {/* Step Label */}
            <span style={styles.stepLabel}>{header}</span>

            {/* Connecting Line (only if not the last step) */}
            {index < stepHeaders.length - 1 && (
              <div
                style={{
                  ...styles.stepLine,
                  backgroundColor:
                    currentStep > index + 1 ? "#28a745" : "#e0e0e0",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <form style={styles.form}>
        {currentStep === 4 && (
          <>
            {/* Equipment Dropdown */}
            <div style={styles.inputGroup}>
              <label
                style={{
                  ...styles.inputLabel,
                  ...(isLabelFocused("Equipment") ? styles.labelFocused : {}),
                }}
              ></label>
              <select
                name="Equipment"
                value={formData.Equipment}
                onFocus={() => handleFocus("Equipment")}
                onBlur={handleBlur}
                onChange={handleInputChange}
                style={styles.dropdown}
              >
                <option value="" disabled>
                  Select Equipment
                </option>
                <option value="Dry Van">Dry Van</option>
                <option value="Flatbed">Flatbed</option>
                <option value="Temperature Controlled">
                  Temperature Controlled
                </option>
              </select>
            </div>

            {/* Conditional Fields for Dry Van */}
            {formData.Equipment === "Dry Van" && (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}></label>
                  <div style={styles.radioGroup}>
                    <label style={styles.radioOption}>
                      <input
                        type="radio"
                        name="Country"
                        value="United States"
                        checked={formData.Country === "United States"}
                        onChange={handleInputChange}
                      />
                      <span role="img" aria-label="US Flag">
                        🇺🇸
                      </span>{" "}
                      I am shipping from the United States
                    </label>
                    <label style={styles.radioOption}>
                      <input
                        type="radio"
                        name="Country"
                        value="Canada"
                        checked={formData.Country === "Canada"}
                        onChange={handleInputChange}
                      />
                      <span role="img" aria-label="Canada Flag">
                        🇨🇦
                      </span>{" "}
                      I am shipping from Canada
                    </label>
                  </div>
                </div>

                {/* City and Postal Code Section */}
                <textarea
                  id="CityPostalCode"
                  name="CityPostalCode"
                  placeholder="Enter city or postal code"
                  value={formData.CityPostalCode || ""}
                  onChange={handleInputChange2}
                ></textarea>
                {showSuggestions && suggestions.length > 0 && (
                  <ul>
                    {suggestions.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(item)}
                      >
                        {item.city} ({item.postalCode})
                      </li>
                    ))}
                  </ul>
                )}

                {/* Info Box */}
                <div style={styles.infoBox}>
                  <span role="img" aria-label="Info Icon">
                    🏢
                  </span>{" "}
                  Truckload pickup location must be a business with a loading
                  dock or have a way to load the truck without a liftgate.
                </div>
              </>
            )}

            {/* Other Conditional Fields */}
            {formData.Equipment === "Flatbed" && (
              <div style={styles.inputGroup}>
                <label
                  style={{
                    ...styles.inputLabel,
                    ...(isLabelFocused("Tarps") ? styles.labelFocused : {}),
                  }}
                ></label>
                <select
                  name="Tarps"
                  value={formData.Tarps || ""}
                  onFocus={() => handleFocus("Tarps")}
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                  style={styles.dropdown}
                >
                  <option value="" disabled>
                    Select Tarps
                  </option>
                  <option value="No Tarp Required">No Tarp Required</option>
                  <option value="4 ft">4 ft</option>
                  <option value="6 ft">6 ft</option>
                  <option value="8 ft">8 ft</option>
                </select>
              </div>
            )}

            {formData.Equipment === "Temperature Controlled" && (
              <div style={styles.temperatureContainer}>
                <div style={styles.inputWithUnit}>
                  <label style={styles.tempLabel}>Minimum temperature *</label>
                  <div style={styles.inputWithIcon}>
                    <input
                      type="number"
                      name="MinTemp"
                      placeholder="Min Temp"
                      value={formData.MinTemp || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                    <span style={styles.unit}>°F</span>
                  </div>
                </div>

                <div style={styles.inputWithUnit}>
                  <label style={styles.tempLabel}>Maximum temperature *</label>
                  <div style={styles.inputWithIcon}>
                    <input
                      type="number"
                      name="MaxTemp"
                      placeholder="Max Temp"
                      value={formData.MaxTemp || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                    <span style={styles.unit}>°F</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Submit/Navigation Buttons */}
        <div style={styles.buttonGroup}>
          <button
            type="button"
            onClick={handleBackStep}
            style={styles.backButton}
          >
            Back
          </button>
          {currentStep === 5 ? (
            <button type="submit" style={styles.submitButton}>
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextStep}
              style={styles.nextButton}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  formHeaderStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  backButtonStyle: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  headerTitleStyle: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  progressContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  stepWrapper: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  step: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0 10px",
  },
  stepLabel: {
    fontSize: "14px",
  },
  stepLine: {
    width: "50px",
    height: "2px",
    marginTop: "15px",
  },
  form: {
    marginBottom: "30px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  inputLabel: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  labelFocused: {
    color: "#28a745",
  },
  dropdown: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  radioGroup: {
    display: "flex",
    justifyContent: "space-around",
  },
  radioOption: {
    fontSize: "14px",
  },
  infoBox: {
    backgroundColor: "#f1f1f1",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "14px",
    marginTop: "10px",
  },
  temperatureContainer: {
    display: "flex",
    flexDirection: "column",
  },
  inputWithUnit: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  inputWithIcon: {
    display: "flex",
    alignItems: "center",
  },
  tempLabel: {
    fontWeight: "bold",
  },
  unit: {
    marginLeft: "5px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  backButton: {
    backgroundColor: "#ccc",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
  nextButton: {
    backgroundColor: "#28a745",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
};

export default FullTruckloadForm;
