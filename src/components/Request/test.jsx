import { useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

function FullTruckloadForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    company: "",
    phoneNumber: "",
    email: "",
    zone: "",
    province: "",
    city: "",
    zipCode: "",
    pickupDate: "",
    pickupTime: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [focusedInput, setFocusedInput] = useState("");

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
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
    "Shipment",
    "Contact",
    "Review",
  ];

  const isLabelFocused = (inputName) =>
    focusedInput === inputName || formData[inputName].length > 0;

  const renderInput = (name, type = "text", label) => (
    <div style={styles.inputGroup}>
      <label
        style={{
          ...styles.inputLabel,
          ...(isLabelFocused(name) ? styles.labelFocused : {}),
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        style={styles.input}
        value={formData[name] || ""}
        onFocus={() => handleFocus(name)}
        onBlur={handleBlur}
        onChange={handleInputChange}
      />
    </div>
  );

  return (
    <div style={styles.formContainer}>
      <div style={styles.formHeaderStyle}>
        <button style={styles.backButtonStyle} onClick={handleBackStep}>
          <FaArrowLeft />
        </button>
        <h1 style={styles.headerTitleStyle}>FULL TRUCKLOAD</h1>
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
                  backgroundColor: currentStep > index + 1 ? "#28a745" : "#e0e0e0",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <form style={styles.form}>
        {currentStep === 1 && (
          <>
            {renderInput("firstName", "text", "First Name")}
            {renderInput("lastName", "text", "Last Name")}
            {renderInput("title", "text", "Title")}
            {renderInput("company", "text", "Company")}
            {renderInput("phoneNumber", "text", "Phone Number")}
            {renderInput("email", "email", "Email")}
            <button type="button" style={styles.button} onClick={handleNextStep}>
              Next Step
            </button>
          </>
        )}

        {currentStep === 2 && (
          <>
            {renderInput("zone", "text", "Zone")}
            {renderInput("province", "text", "Province/State")}
            {renderInput("city", "text", "City")}
            {renderInput("zipCode", "text", "ZIP Code")}
            {renderInput("pickupDate", "date", "Pickup Date")}
            
            {/* Pickup Time with AM/PM format */}
            <div style={styles.inputGroup}>
              <label
                style={{
                  ...styles.inputLabel,
                  ...(isLabelFocused("pickupTime") ? styles.labelFocused : {}),
                }}
              >
                Pickup Time
              </label>
              <input
                type="text"
                name="pickupTime"
                style={styles.input}
                value={formData.pickupTime || ""}
                onFocus={() => handleFocus("pickupTime")}
                onBlur={handleBlur}
                onChange={handleInputChange}
                placeholder="hh:mm AM/PM"
              />
            </div>

            <div style={styles.buttonsContainer}>
              <button
                type="button"
                style={styles.button}
                onClick={handleBackStep}
              >
                Previous
              </button>
              <button
                type="button"
                style={styles.button}
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    padding: "20px",
    backgroundColor: "#fff",
    color: "#000",
    maxWidth: "500px",
    margin: "0 auto",
  },
  formHeaderStyle: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  backButtonStyle: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
  },
  headerTitleStyle: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },

  progressContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "110%",
    marginBottom: "30px",
  },
  stepWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    flex: 1,
  },
  step: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    zIndex: 2,
  },
  stepLabel: {
    fontSize: "15px",
    textAlign: "center",
    marginTop: "8px",
  },
  stepLine: {
    position: "absolute",
    top: "30%",
    left: "100%",
    width: "100%",
    height: "4px",
    transform: "translateX(-50%)",
    zIndex: 1,
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
    position: "relative",
  },
  inputLabel: {
    position: "absolute",
    top: "10px",
    left: "12px",
    fontSize: "16px",
    color: "#aaa",
    transition: "all 0.3s ease",
  },
  labelFocused: {
    top: "-15px",
    fontSize: "12px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "105%",
    padding: "10px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default FullTruckloadForm;
