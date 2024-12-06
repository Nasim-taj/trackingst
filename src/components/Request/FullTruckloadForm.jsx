import { useState } from "react";
import { FaArrowLeft, FaCheck, FaCalendarAlt, FaClock  } from "react-icons/fa";

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
    "Origin",
    "Destination",
    "Shipping",
  ];

  const isLabelFocused = (inputName) =>
    focusedInput === inputName || (formData[inputName] && formData[inputName].length > 0);
  

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

  const renderInputWithIcon = (name, type, label, icon) => (
    <div style={styles.inputGroupWithIcon}>
      <label style={styles.inputLabel}>{label}</label>
      <div style={styles.inputIconContainer}>
        <div style={styles.icon}>{icon}</div>
        <input
          type={type}
          name={name}
          style={styles.inputWithoutBorder}
          value={formData[name] || ""}
          onFocus={() => handleFocus(name)}
          onBlur={handleBlur}
          onChange={handleInputChange}
        />
      </div>
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
            {renderInput("", "date", "Pickup Date",<FaCalendarAlt />)}
            {renderInput("", "time", "Pickup Time",<FaClock />)}
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

{currentStep === 3 && (
          <>
            {renderInput("zone", "text", "Zone")}
            {renderInput("province", "text", "Province/State")}
            {renderInput("city", "text", "City")}
            {renderInput("zipCode", "text", "ZIP Code")}
            {renderInput("", "date", "Pickup Date",<FaCalendarAlt />)}
            {renderInput("", "time", "Pickup Time",<FaClock />)}
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
    padding: "10px",
    backgroundColor: "#fff",
    color: "#000",
    maxWidth: "500px",
    margin: "0 auto",
  },
  formHeaderStyle: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
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
    width: "100%",
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
    marginBottom: "20px",
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
    top: "1px",
    fontSize: "12px",
    color: "#555",
  },
  input: {
    width: "90%",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonsContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  // Existing styles...
  inputGroupWithIcon: {
    marginBottom: "15px",
  },
  inputIconContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
  },
  icon: {
    marginRight: "10px",
    fontSize: "16px",
    color: "#888",
  },
  inputWithoutBorder: {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: "16px",
  },
};

export default FullTruckloadForm;
