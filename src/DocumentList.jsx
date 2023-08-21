//code a react page that sowhs a list of medical record documents with - patientname, abhaid, doctor, documenttype, hospitalname, also implement only a searchbar and filter button that can search by patientname, abhaid, doctor, documenttype, hospitalname, but do not add - add, edit or delete document button;use states and other needed react concepts
import { useContext, useState, useEffect } from "react";
import HealthMrmContext from "./context/healthmrmContext";
import "./DocumentList.css";

const DocumentList = () => {
  const [showForm, setShowForm] = useState(false);
  const [patientname, setPatientname] = useState("");
  const [abha, setAbha] = useState("");
  const [doctor, setDoctor] = useState("");
  const [documenttype, setDocumenttype] = useState("");
  const [hospitalname, setHospitalname] = useState("");
  const [message, setMessage] = useState("");
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [filter, setFilter] = useState("");

  const {
    allRecords,
    recordsForPatient,
    recordsForDoctor,
    recordsForType,
    recordsForHospital,
    recordsForDate,
    role,
    abhaID,
    name,
  } = useContext(HealthMrmContext);

  useEffect(() => {
    console.log("sdad", role, abhaID, name);
    const getDocuments = async () => {
      const documentsFromContract = await fetchDocuments();
      console.log("weeeee", documentsFromContract);
      setFilteredDocuments(documentsFromContract);
      setDocuments(documentsFromContract);
    };

    getDocuments();
  }, []);

  const fetchDocuments = async () => {
    switch (role) {
      case "patient":
        return await recordsForPatient(abhaID);
      case "doctor":
        return await recordsForDoctor(name);
      case "hospital":
        return await recordsForHospital(name);
      case "clinic":
        return await allRecords();
      case "diagnostics":
        return await allRecords();
      default:
        return [];
    }
  };

  useEffect(() => {
    console.log(filter);

    if (filter == "patientname") {
      setFilteredDocuments(
        documents?.filter((document) => {
          return document.pateintName
            .toLowerCase()
            .includes(search.toLowerCase());
        })
      );
    } else if (filter == "abha") {
      setFilteredDocuments(
        documents?.filter((document) => {
          return document.abhaID.toLowerCase().includes(search.toLowerCase());
        })
      );
    } else if (filter == "doctor") {
      setFilteredDocuments(
        documents?.filter((document) => {
          return document.doctor.toLowerCase().includes(search.toLowerCase());
        })
      );
    } else if (filter == "documenttype") {
      setFilteredDocuments(
        documents?.filter((document) => {
          return document.documentType
            .toLowerCase()
            .includes(search.toLowerCase());
        })
      );
    } else if (filter == "hospitalname") {
      setFilteredDocuments(
        documents?.filter((document) => {
          return document.hospitalName
            .toLowerCase()
            .includes(search.toLowerCase());
        })
      );
    } else {
      setFilteredDocuments(
        filteredDocuments?.filter((document) => {
          return (
            document.pateintName.toLowerCase().includes(search.toLowerCase()) ||
            document.abhaID.toLowerCase().includes(search.toLowerCase()) ||
            document.doctor.toLowerCase().includes(search.toLowerCase()) ||
            document.documentType
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            document.hospitalName.toLowerCase().includes(search.toLowerCase())
          );
        })
      );
    }
  }, [filter, search]);

  useEffect(() => {
    console.log("refresh");
  }, [filteredDocuments]);
  // make the react page return section with based on documnets array, display a list of documents with each document shown in a card with image and details and a searchbar and filter button , make a

  return (
    <div className="document-list">
      <div className="document-list__search">
        <div></div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option value="">Filter</option>
          <option value="patientname">Patient Name</option>
          <option value="abha">Abha</option>
          <option value="doctor">Doctor</option>
          <option value="documenttype">Document Type</option>
          <option value="hospitalname">Hospital Name</option>
        </select>
      </div>
      <div className="document-list__cards">
        {console.log("yeahhhhhhuuuuuu", filteredDocuments)}
        {filteredDocuments?.map((document) => (
          // <DocumentCard key={document.id} document={document} />
          // write the documentcard here itself , have space for image and the rest of the data : patientname, abhaid, doctor, documenttype, hospitalname
          <div className="document-card">
            <div className="document-card__image">
              <img
                src={`https://gateway.lighthouse.storage/ipfs/${document.documentHash}`}
                alt="document"
              />
            </div>
            <div className="document-card__details">
              <div className="document-card__details--patientname">
                <h3>Patient Name</h3>
                <p>{document.pateintName}</p>
              </div>
              <div className="document-card__details--abha">
                <h3>Abha</h3>
                <p>{document.abhaID}</p>
              </div>
              <div className="document-card__details--doctor">
                <h3>Doctor</h3>
                <p>{document.doctor}</p>
              </div>
              <div className="document-card__details--documenttype">
                <h3>Document Type</h3>
                <p>{document.documentType}</p>
              </div>
              <div className="document-card__details--hospitalname">
                <h3>Hospital Name</h3>
                <p>{document.hospitalName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
