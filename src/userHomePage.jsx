//make a homepage in which uer has 2 main options add medical records and view medical records , both of these options are in the form of big boxes and have onclick which navigate them to different pages
import React from "react";
import "./userHomePage.css";
import { useContext, useState } from "react";
import HealthMrmContext from "./context/healthmrmContext";
import lighthouse from "@lighthouse-web3/sdk";
import { useNavigate } from "react-router-dom";
const UserHomePage = () => {
  const [abha, setAbha] = useState("");
  const [patientname, setPatientname] = useState("");
  const [doctor, setDoctor] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [date, setDate] = useState("");
  const [documentHash, setDocumentHash] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false); // Track whether to show the form
  const { addMedicalRecord, abhaID, role, name } = useContext(HealthMrmContext);
  const navigate = useNavigate(); // Get the navigate function from the hook

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    return percentageDone;
  };

  const uploadFile = async (file) => {
    const output = await lighthouse.upload(
      file,
      "b95457b5.34a70e096883424882b8cccc90da81c4",
      false,
      progressCallback
    );
    setDocumentHash(output.data.Hash);
  };

  async function sendData(e) {
    e.preventDefault();
    setMessage("Please wait for a moment...");
    console.log("hello");
    const res = await addMedicalRecord(
      abha,
      patientname,
      doctor,
      documentType,
      hospitalName,
      date,
      documentHash
    );
    console.log(res);
    if (res) {
      setMessage("Record added successfully!");
      setShowForm(false);
    }
    alert("Record added successfully!");
  }

  const handleSignUpClick = () => {
    setShowForm(true);
  };

  const handleViewRecords = () => {
    navigate("/viewMedicalRecords");
  };

  return (
    <div className="user-home-page">
      {!showForm && (
        // Show the "Sign Up" button when showForm is false
        <>
          <div
            className="user-home-page__add-medical-records"
            onClick={handleSignUpClick}
          >
            <div className="user-home-page__add-medical-records__text">
              Add Medical Records
            </div>
          </div>
          <div
            className="user-home-page__view-medical-records"
            onClick={handleViewRecords}
          >
            <div className="user-home-page__view-medical-records__text">
              View Medical Records
            </div>
          </div>
        </>
      )}

      {showForm && ( // Only show the form when showForm is true
        <>
          <div className="signup-container">
            {message && <div className="message">{message}</div>}
            <form onSubmit={sendData}>
              <div className="form-group">
                <label htmlFor="patientname">PatientName</label>
                <input
                  type="text"
                  id="patientname"
                  placeholder="Enter PatientName"
                  onChange={(e) => setPatientname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="abha">Abha ID</label>
                <input
                  type="text"
                  id="abha"
                  placeholder="Enter your Abha"
                  onChange={(e) => setAbha(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="doctor">Doctor</label>
                <input
                  type="text"
                  id="doctor"
                  placeholder="Enter your Doctor"
                  onChange={(e) => setDoctor(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="documentType">DocumentType</label>
                <input
                  type="text"
                  id="documentType"
                  placeholder="Enter your DocumentType"
                  onChange={(e) => setDocumentType(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hospitalName">HospitalName</label>
                <input
                  type="text"
                  id="hospitalName"
                  placeholder="Enter your HospitalName"
                  onChange={(e) => setHospitalName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  id="date"
                  placeholder="Enter your Date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="documentHash">Document</label>
                <input
                  type="file"
                  id="document"
                  placeholder="Upload your Documenth"
                  onChange={(e) => uploadFile(e.target.files)}
                />
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default UserHomePage;
