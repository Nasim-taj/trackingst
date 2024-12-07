import { useState } from "react";
import { FaArrowLeft, FaCheck, FaMinus, FaPlus, FaCalendarAlt, FaClock } from "react-icons/fa";

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
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [focusedInput, setFocusedInput] = useState("");

  const [openAccordion, setOpenAccordion] = useState("personalDetails");

  const toggleAccordion = (accordionId) => {
    setOpenAccordion(openAccordion === accordionId ? null : accordionId);
  };

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

  // const renderInputWithIcon = (name, type, label, icon) => (
  //   <div style={styles.inputGroupWithIcon}>
  //     <label style={styles.inputLabel}>{label}</label>
  //     <div style={styles.inputIconContainer}>
  //       <div style={styles.icon}>{icon}</div>
  //       <input
  //         type={type}
  //         name={name}
  //         style={styles.inputWithoutBorder}
  //         value={formData[name] || ""}
  //         onFocus={() => handleFocus(name)}
  //         onBlur={handleBlur}
  //         onChange={handleInputChange}
  //       />
  //     </div>
  //   </div>
  // );

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
                  backgroundColor:
                    currentStep > index + 1 ? "#28a745" : "#e0e0e0",
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
            <button
              type="button"
              style={styles.button}
              onClick={handleNextStep}
            >
              Next Step
            </button>
          </>
        )}

        {currentStep === 2 && (
          <>
            {renderInput("OriginZone", "text", "Zone")}
            {renderInput("OriginProvince", "text", "Province/State")}
            {renderInput("OriginCity", "text", "City")}
            {renderInput("OriginZipCode", "text", "ZIP Code")}
            {renderInput("", "date", "Pickup Date", <FaCalendarAlt />)}
            {renderInput("", "time", "Pickup Time", <FaClock />)}
            <div style={styles.buttonsContainer}>
              <button
                type="button"
                style={styles.smallButton}
                onClick={handleBackStep}
              >
                Previous
              </button>
              <button
                type="button"
                style={styles.smallButton}
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            {renderInput("DestZone", "text", "Zone")}
            {renderInput("DestProvince", "text", "Province/State")}
            {renderInput("DestCity", "text", "City")}
            {renderInput("DestZipCode", "text", "ZIP Code")}
            {renderInput("", "Date", "Pickup Date", <FaCalendarAlt />)}
            {renderInput("", "Time", "Pickup Time", <FaClock />)}
            <div style={styles.buttonsContainer}>
              <button
                type="button"
                style={styles.smallButton}
                onClick={handleBackStep}
              >
                Previous
              </button>
              <button
                type="button"
                style={styles.smallButton}
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Shipping Details */}
        {currentStep === 4 && (
          <>
            {renderInput("Equipment", "text", "Equipment")}
            {renderInput("TrailerSize", "text", "Trailer Size")}
            <div style={styles.inputGroup}>
              <label
                style={{
                  ...styles.inputLabel,
                  ...(isLabelFocused("Comment") ? styles.labelFocused : {}),
                }}
              >
                Comment
              </label>
              <textarea
                name="Comment"
                style={styles.textarea}
                value={formData["Comment"] || ""}
                onFocus={() => handleFocus("Comment")}
                onBlur={handleBlur}
                onChange={handleInputChange}
              />
            </div>

            <div style={styles.buttonsContainer}>
              <button
                type="button"
                style={styles.smallButton}
                onClick={handleBackStep}
              >
                Previous
              </button>
              <button
                type="button"
                style={styles.smallButton}
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Preview Section */}
        {currentStep === 5 && (
          <>
            <div style={styles.accordion}>
              {/* Personal Details Accordion */}
              <div style={styles.accordionItem}>
                <button
                  style={styles.accordionHeader}
                  onClick={() => toggleAccordion("personalDetails")}
                  type="button"
                >
                  Personal Details
                  <span style={styles.icon}>
                    {openAccordion === "personalDetails" ? (
                      <FaMinus />
                    ) : (
                      <FaPlus />
                    )}
                  </span>
                </button>
                {openAccordion === "personalDetails" && (
                  <div style={styles.accordionContent}>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>First Name:</label>
                      <span style={styles.value}>{formData.firstName}</span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Last Name:</label>
                      <span style={styles.value}>{formData.lastName}</span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Title:</label>
                      <span style={styles.value}>{formData.title}</span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Company:</label>
                      <span style={styles.value}>{formData.company}</span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Phone:</label>
                      <span style={styles.value}>{formData.phone}</span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Email:</label>
                      <span style={styles.value}>{formData.email}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Origin Details Accordion */}
              <div style={styles.accordionItem}>
                <button
                  style={styles.accordionHeader}
                  onClick={() => toggleAccordion("originDetails")}
                  type="button"
                >
                  Origin Details
                  <span style={styles.icon}>
                    {openAccordion === "originDetails" ? (
                      <FaMinus />
                    ) : (
                      <FaPlus />
                    )}
                  </span>
                </button>
                {openAccordion === "originDetails" && (
                  <div style={styles.accordionContent}>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Zone</label>
                      <span style={styles.value}>{formData.OriginZone}</span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>State/Province</label>
                      <span style={styles.value}>
                        {formData.OriginProvince}
                      </span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>City</label>
                      <span style={styles.value}>{formData.OriginCity}</span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>ZipCode</label>
                      <span style={styles.value}>{formData.OriginZipCode}</span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Pickup Date</label>
                      <span style={styles.value}>
                        {formData.OriginPickupDate}
                      </span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Pickup Time</label>
                      <span style={styles.value}>
                        {formData.OriginPickupTime}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Destination Details Accordion */}
              <div style={styles.accordionItem}>
                <button
                  style={styles.accordionHeader}
                  onClick={() => toggleAccordion("destinationDetails")}
                  type="button"
                >
                  Destination Details
                  <span style={styles.icon}>
                    {openAccordion === "destinationDetails" ? (
                      <FaMinus />
                    ) : (
                      <FaPlus />
                    )}
                  </span>
                </button>
                {openAccordion === "destinationDetails" && (
                  <div style={styles.accordionContent}>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Zone</label>
                      <span style={styles.value}>{formData.DestZone}</span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Province/State</label>
                      <span style={styles.value}>{formData.DestProvince}</span>
                    </div>

                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>City</label>
                      <span style={styles.value}>{formData.DestCity}</span>
                    </div>

                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>ZipCode</label>
                      <span style={styles.value}>{formData.DestZipCode}</span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Pickup Date</label>
                      <span style={styles.value}>
                        {formData.DestPickupDate}
                      </span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Pickup Time</label>
                      <span style={styles.value}>
                        {formData.DestPickupTime}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping Details Accordion */}
              <div style={styles.accordionItem}>
                <button
                  style={styles.accordionHeader}
                  onClick={() => toggleAccordion("shippingDetails")}
                  type="button"
                >
                  Shipping Details
                  <span style={styles.icon}>
                    {openAccordion === "shippingDetails" ? (
                      <FaMinus />
                    ) : (
                      <FaPlus />
                    )}
                  </span>
                </button>
                {openAccordion === "shippingDetails" && (
                  <div style={styles.accordionContent}>
                    {/* Add shipping details inputs */}
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Equipment</label>
                      <span style={styles.value}>{formData.Equipment}</span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Trailer Size</label>
                      <span style={styles.value}>
                        {formData.TrailerSize}
                      </span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Comment</label>
                      <span style={styles.value}>
                        {formData.Comment}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              style={styles.button}
              onClick={() => alert("Form Submitted!")}
            >
              Confirm <FaCheck />
            </button>
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

  //Button
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  // Small Button
  smallButton: {
    width: "20%",
    padding: "12px",
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

  accordion: {
    marginBottom: "20px",
  },
  accordionItem: {
    display: "flex",
    borderRadius: "5px",
    flexDirection: "column",
  },

  accordionHeader: {
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#d2d2d2",
    padding: "10px",
    marginBottom: "1px",
    cursor: "pointer",
    position: "sticky",
    top: "0", // Fix the header on top of the accordion
    zIndex: 10, // Ensure it's above the content
  },

  accordionContent: {
    display: "flex",
    flexDirection: "column", // Stacks items vertically
    padding: "10px",
    border: "2px solid #000",
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginBottom: "3px",
  },

  inputGroupDetails: {
    display: "flex", // Aligns label and input in the same line
    justifyContent: "space-between", // Space between label and value
    alignItems: "center", // Vertically centers the items
    marginBottom: "5px",
  },

  label: {
    flex: "1", // Label takes up 1 part of the space
    textAlign: "left", // Align label text to the left
    paddingRight: "10px", // Space between label and value
  },

  value: {
    flex: "2", // Value takes up the remaining space
    textAlign: "left", // Align value to the left
  },

  // icon: {
  //   fontSize: "18px",
  // },


};

export default FullTruckloadForm;