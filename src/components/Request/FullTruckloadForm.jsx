import { useState } from "react";
import { FaArrowLeft, FaCheck, FaMinus, FaPlus, FaTimes } from "react-icons/fa";
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
    ItemDescription: "",
    PackagingType: "",
    ItemCondition: "",
    Length: "",
    Width: "",
    Height: "",
    Weight: "",
    NumPallets: "",
    items: [], // Items list
    editingIndex: null,
    editIndex: undefined,
    TrailerSize: "",
    Comment: "",
    CityPostalCode: "",
  });

  
  const navigate = useNavigate(); // Initialize navigate function


  const goToRequestQuote = () => {
    navigate("/"); // Adjust the path as per your routing setup
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [focusedInput, setFocusedInput] = useState("");
  const [openAccordion, setOpenAccordion] = useState("personalDetails");
  const [isTermsChecked, setIsTermsChecked] = useState(false); // Initialize the checkbox state
  const [error, setError] = useState(""); // Error message state

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

  const renderInput = (name, type = "text", label, icon = null) => (
    <div style={styles.inputGroup}>
      <label
        style={{
          ...styles.inputLabel,
          ...(isLabelFocused(name) ? styles.labelFocused : {}),
        }}
      >
        {label}
      </label>
      <div style={styles.inputWithIcon}>
        {icon && <div style={styles.icon}>{icon}</div>}
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
    </div>
  );

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

  const [editIndex, setEditIndex] = useState(null); // Track the item being edited

  // // Handle input changes
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };
  
  // Add or Update Item
  const handleAddAnotherItem = () => {
    if (editIndex !== null) {
      // Update the existing item
      const updatedItems = [...formData.items];
      updatedItems[editIndex] = {
        ItemDescription: formData.ItemDescription,
        PackagingType: formData.PackagingType,
        ItemCondition: formData.ItemCondition,
        Length: formData.Length,
        Width: formData.Width,
        Height: formData.Height,
        Weight: formData.Weight,
        NumPallets: formData.NumPallets,
      };
      setFormData((prev) => ({
        ...prev,
        items: updatedItems,
        ItemDescription: "",
        PackagingType: "",
        ItemCondition: "",
        Length: "",
        Width: "",
        Height: "",
        Weight: "",
        NumPallets: "",
      }));
      setEditIndex(null); // Exit edit mode
    } else {
      // Add a new item
      setFormData((prev) => ({
        ...prev,
        items: [
          ...prev.items,
          {
            ItemDescription: formData.ItemDescription,
            PackagingType: formData.PackagingType,
            ItemCondition: formData.ItemCondition,
            Length: formData.Length,
            Width: formData.Width,
            Height: formData.Height,
            Weight: formData.Weight,
            NumPallets: formData.NumPallets,
          },
        ],
        ItemDescription: "",
        PackagingType: "",
        ItemCondition: "",
        Length: "",
        Width: "",
        Height: "",
        Weight: "",
        NumPallets: "",
      }));
    }
  };
  
  // Edit Item
  const handleEditItem = (index) => {
    const itemToEdit = formData.items[index];
    setFormData((prev) => ({
      ...prev,
      ItemDescription: itemToEdit.ItemDescription,
      PackagingType: itemToEdit.PackagingType,
      ItemCondition: itemToEdit.ItemCondition,
      Length: itemToEdit.Length,
      Width: itemToEdit.Width,
      Height: itemToEdit.Height,
      Weight: itemToEdit.Weight,
      NumPallets: itemToEdit.NumPallets,
    }));
    setEditIndex(index); // Enter edit mode
  };
  
  // Remove Item
  const handleRemoveItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };



  // Remove an item from the list



  const handleInputChange3 = (e) => {
    const { name, value } = e.target;

    // Set default dimensions for specific pallet types
    if (name === "PackagingType") {
      if (value === "Pallet(48x40)") {
        setFormData((prev) => ({
          ...prev,
          PackagingType: value,
          Length: 48,
          Width: 40,
        }));
      } else if (value === "Pallet(48x48)") {
        setFormData((prev) => ({
          ...prev,
          PackagingType: value,
          Length: 48,
          Width: 48,
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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

      <form onSubmit={(e) => e.preventDefault()}>
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
            {renderInput("", "date", "Pickup Date")}
            {renderInput("", "time", "Pickup Time")}
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
            {renderInput("", "date", "Delivered Date")}
            {renderInput("", "time", "Delivered Time")}
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


            {formData.Equipment === "Dry Van" && (
              <div style={styles.dryVanContainer}>

                <label style={styles.dryVanLabel}>Item Description *</label>
                <input
                  type="text"
                  name="ItemDescription"
                  placeholder="Enter item description"
                  value={formData.ItemDescription || ""}
                  onChange={handleInputChange}
                  style={styles.dryVanInput}
                />

                <label style={styles.dryVanLabel}>Packaging Type *</label>
                <select
                  name="PackagingType"
                  value={formData.PackagingType || ""}
                  onChange={handleInputChange3}
                  style={styles.dryVanDropdown}
                >
                  <option value="">Select packaging type</option>
                  <option value="Pallet(48x40)">Pallet(48"x40")</option>
                  <option value="Pallet(48x48)">Pallet(48"x48")</option>
                  <option value="Pallet(Custom Dimensions)">Pallet(Custom Dimensions)</option>
                  <option value="Box">Box</option>
                  <option value="Crate">Crate</option>
                  <option value="Bundle">Bundle</option>
                  <option value="Drum">Drum</option>
                  <option value="Roll">Roll</option>
                  <option value="Bale">Bale</option>
                </select>

                {/* Render additional form fields for various Packaging Types */}
                {(
                  formData.PackagingType === "Box" ||
                  formData.PackagingType === "Crate" ||
                  formData.PackagingType === "Bundle" ||
                  formData.PackagingType === "Drum" ||
                  formData.PackagingType === "Roll" ||
                  formData.PackagingType === "Bale" ||
                  formData.PackagingType === "Pallet(48x40)" ||
                  formData.PackagingType === "Pallet(48x48)" ||
                  formData.PackagingType === "Pallet(Custom Dimensions)"
                ) && (
                    <div style={styles.palletForm}>
                      {/* Length for Pallet/Box/Crate/Bundle/Drum */}
                      <label style={styles.dryVanLabel}>Length *</label>
                      <input
                        type="number"
                        name="Length"
                        placeholder="Enter length in inches"
                        value={formData.Length || ""}
                        onChange={handleInputChange3}
                        style={styles.dryVanInput}
                      />

                      {/* Width for Pallet/Box/Crate/Bundle/Drum */}
                      <label style={styles.dryVanLabel}>Width *</label>
                      <input
                        type="number"
                        name="Width"
                        placeholder="Enter width in inches"
                        value={formData.Width || ""}
                        onChange={handleInputChange3}
                        style={styles.dryVanInput}
                      />

                      {/* Height for Pallet/Box/Crate/Bundle/Drum */}
                      <label style={styles.dryVanLabel}>Height *</label>
                      <input
                        type="number"
                        name="Height"
                        placeholder="Enter height in inches"
                        value={formData.Height || ""}
                        onChange={handleInputChange3}
                        style={styles.dryVanInput}
                      />

                      {/* Weight of 1 Pallet/Box/Crate/Bundle/Drum */}
                      <label style={styles.dryVanLabel}>Weight of 1 {formData.PackagingType} *</label>
                      <input
                        type="number"
                        name="Weight"
                        placeholder="Enter weight in pounds"
                        value={formData.Weight || ""}
                        onChange={handleInputChange3}
                        style={styles.dryVanInput}
                      />

                      {/* Number of Pallets/Boxes/Crates/Bundle/Drum */}
                      <label style={styles.dryVanLabel}>Number of {formData.PackagingType}s *</label>
                      <input
                        type="number"
                        name="NumPallets"
                        placeholder="Enter number"
                        value={formData.NumPallets || ""}
                        onChange={handleInputChange3}
                        style={styles.dryVanInput}
                      />

                      {/* Display total shipment weight */}
                      <div style={styles.totalWeight}>
                        Total shipment weight:{" "}
                        {formData.Weight && formData.NumPallets
                          ? formData.Weight * formData.NumPallets
                          : 0}{" "}
                        pounds
                      </div>
                    </div>
                  )}



                <div style={styles.dryVanRadioGroup}>
                  <label style={styles.dryVanRadioOption}>
                    <input
                      type="radio"
                      name="ItemCondition"
                      value="New"
                      checked={formData.ItemCondition === "New"}
                      onChange={handleInputChange}
                    />
                    New
                  </label>
                  <label style={styles.dryVanRadioOption}>
                    <input
                      type="radio"
                      name="ItemCondition"
                      value="Used"
                      checked={formData.ItemCondition === "Used"}
                      onChange={handleInputChange}
                    />
                    Used
                  </label>
                </div>

                {/* Button to add a new item */}
                <button
  type="button"
  onClick={handleAddAnotherItem}
  style={{
    ...styles.addItemButton,
    backgroundColor: formData.ItemDescription &&
      formData.PackagingType &&
      formData.ItemCondition
      ? "black"
      : "grey",
    cursor: formData.ItemDescription &&
      formData.PackagingType &&
      formData.ItemCondition
      ? "pointer"
      : "not-allowed",
  }}
  disabled={
    !(
      formData.ItemDescription &&
      formData.PackagingType &&
      formData.ItemCondition
    )
  }
>
  {editIndex !== null ? "Save Changes" : "+ Add Another Item"}
</button>


                {/* Display Added Items with Edit and Remove Buttons */}
                {formData.items.length > 0 && (
                  <div style={styles.itemList}>
                    <h4>Added Items:</h4>
                    {formData.items.map((item, index) => (
                      <div key={index} style={styles.item}>
                        {item.ItemDescription} - {item.PackagingType} - {item.ItemCondition}
                        <button
                          style={styles.editButton}
                          onClick={() => handleEditItem(index)}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.removeButton}
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}



              </div>
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

            {/* Trailer Size and Comment Inputs */}
            {/* {renderInput("TrailerSize", "text", "Trailer Size")}
            {renderInput("Comment", "text", "Comment")} */}

            {/* Navigation Buttons */}
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
                      <span style={styles.value}>{formData.TrailerSize}</span>
                    </div>
                    <div style={styles.inputGroupDetails}>
                      <label style={styles.label}>Comment</label>
                      <span style={styles.value}>{formData.Comment}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div style={styles.termsCheckboxContainer}>
              <input
                type="checkbox"
                id="terms"
                checked={isTermsChecked}
                onChange={() => setIsTermsChecked(!isTermsChecked)} // Toggle checkbox state
              />
              <label htmlFor="terms" style={styles.termsLabel}>
                I agree to the Terms and Conditions
              </label>
            </div>

            {/* Error Message */}
            {error && <p style={styles.errorMessage}>{error}</p>}

            {/* Confirm Button */}
            <button
              type="button"
              style={{
                ...styles.button1,
                ...(isTermsChecked ? {} : styles.button1Disabled), // Apply disabled style when not checked
              }}
              onMouseEnter={() => {
                if (!isTermsChecked) {
                  document.body.style.cursor = "not-allowed";
                }
              }}
              onMouseLeave={() => {
                document.body.style.cursor = "default";
              }}
              onClick={() => {
                if (!isTermsChecked) {
                  setError(
                    "You must agree to the terms and conditions to proceed."
                  );
                } else {
                  setError(""); // Clear error message
                  alert("Form Submitted!"); // Form submission logic
                }
              }}
              disabled={!isTermsChecked} // Disable if terms are not checked
            >
              Submit
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
    height: "calc(100vh - 20px)", // Adjust for padding
    margin: "0 auto",
    boxSizing: "border-box", // Ensure padding is included in the height calculation
  },

  formHeaderStyle: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
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
    top: "15px",
    left: "12px",
    fontSize: "16px",
    color: "#aaa",
    transition: "all 0.3s ease",
  },
  labelFocused: {
    top: "2px",
    fontSize: "12px",
    color: "#555",
  },

  input: {
    width: "100%",
    fontSize: "16px",
    padding: "15px",
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

  inputWithoutBorder: {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: "16px",
  },

  dropdown: {
    width: "100%",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor: "#fff",
  },

  temperatureContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  inputWithUnit: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginRight: "10px",
  },

  tempLabel: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
  },

  unit: {
    marginLeft: "5px",
    alignSelf: "center",
    fontSize: "16px",
    color: "#555",
  },

  inputWithIcon: {
    display: "flex",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  radioOption: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",
  },
  textarea: {
    width: "90%",
    height: "80px",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  infoBox: {
    marginTop: "2px",
    marginBottom: "15px",
    fontSize: "16px",
    color: "black",
  },


  dryVanLabel: {
    fontSize: "16px",
    color: "black",
    marginBottom: "5px",
    marginTop: "5px",
    display: "block", // Ensures label is on its own line
  },

  dryVanInput: {
    width: "100%",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "10px", // Space between inputs
    boxSizing: "border-box",
  },

  dryVanDropdown: {
    width: "100%",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",

    backgroundColor: "#fff",
    marginBottom: "15px", // Space between dropdown and other fields
  },

  dryVanRadioGroup: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    marginBottom: "15px", // Space between radio buttons and other fields
  },

  dryVanRadioOption: {
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    gap: "5px",
  },

  addItemButton: {
    backgroundColor: "black", // Blue button
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "1px",
    marginBottom: "15px",
    transition: "background-color 0.3s", // Smooth transition
  },

  addItemButtonHover: {
    backgroundColor: "#0056b3", // Darker blue on hover
  },

  item: {
    marginBottom: "18px",
    fontSize: "16px",
    color: "#333",
  },

  totalWeight: {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },

  editButton: {
    backgroundColor: "#5C5CFF",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "200px"
  },

  removeButton: {
    backgroundColor: "#FF5C5C",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "15px"
  },


  accordion: {
    marginTop: "10px",
  },

  accordionItem: {
    marginBottom: "10px",
  },

  accordionHeader: {
    backgroundColor: "#f1f1f1",
    padding: "10px",
    width: "100%",
    border: "1px solid #000",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "16px", // Optional: Add font size for the text
    fontWeight: "bold", // Optional: Add font weight for emphasis
    borderRadius: "5px", // Optional: Rounded corners for a cleaner look
  },

  accordionContent: {
    padding: "10px",
    border: "1px solid #000",
    backgroundColor: "#f9f9f9",
    marginTop: "10px", // Add margin for spacing between sections
    borderRadius: "5px", // Optional: Rounded corners
  },

  inputGroupDetails: {
    marginBottom: "10px", // Adds space between each input group
    fontSize: "14px", // Optional: Adds font size for better readability
  },

  icon: {
    marginRight: "10px",
    fontSize: "16px",
    color: "#000",
  },

  value: {
    fontSize: "14px",
    color: "#555", // Slightly muted color for values
  },

  termsCheckboxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0px", // Adds space between the checkbox and button
  },

  termsLabel: {
    fontSize: "14px",
    marginLeft: "8px", // Adds space between checkbox and label
    color: "#333", // Optional: Slightly darker color for better readability
  },

  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
    fontWeight: "bold", // Optional: Make the error message bold
  },

  button1: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
    marginTop: "20px", // Adds space between button and other elements
    transition: "background-color 0.3s", // Optional: Smooth transition on hover
  },

  button1Disabled: {
    backgroundColor: "#d3d3d3", // Greyed out when disabled
    cursor: "not-allowed", // Shows disabled cursor
  },

  suggestionsList: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
    zIndex: 10,
    maxHeight: "150px",
    overflowY: "auto",
  },
  suggestionItem: {
    padding: "0.5rem",
    cursor: "pointer",
  },

};

export default FullTruckloadForm;
