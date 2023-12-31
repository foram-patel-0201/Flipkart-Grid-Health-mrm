import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Healthmrm from "./healthmrm.json";

export const HealthMrmContext = createContext();

const contractAddress = "0x248648a3F17B52572EF1bc6473a9F9149002902E";
const contractAbi = Healthmrm.abi;

export const HealthMrmProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [userdata, setUserdata] = useState({});
  const [validMedicalRecords, setValidMedicalRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {})();
  }, []);

  const addUser = async (abhaId, role, passwordHash, name) => {
    let user;
    try {
      if (window.ethereum) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        // if (ethereum.isConnected()) {
        //   const accounts = await window.ethereum.request({
        //     method: "eth_accounts",
        //   });
        //   console.log(accounts[0]);
        //   user = accounts[0];
        // }

        const txRes = await contract.addUser(abhaId, role, passwordHash, name, {
          gasLimit: 500000,
        });
        setIsLoading(true);
        await txRes.wait(1);
        setIsLoading(false);
        console.log("New user: ", txRes);
        return true;
      }
    } catch (error) {
      console.log(error);
      alert("Error while approving!");
    }
  };

  const verifyPassword = async (abhaId, password) => {
    let userdata_ = [];
    let userAddress;
    try {
      if (window.ethereum) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          provider
        );

        // if (ethereum.isConnected()) {
        //   const accounts = await window.ethereum.request({
        //     method: "eth_accounts",
        //   });
        //   console.log(accounts[0]);
        //   userAddress = accounts[0];
        // }

        const txRes = await contract.addUser(abhaId, password);
        console.log("user data: ", txRes);

        userdata_ = {
          name: txRes[0],
          role: txRes[1],
        };
        setUserdata(userdata_);
      }
    } catch (error) {
      console.log(error);
      alert("Error while approving!");
    }
  };

  const addMedicalRecord = async (
    abhaID,
    patientName,
    doctor,
    documentType,
    hospitalName,
    date,
    documentHash
  ) => {
    let user;

    try {
      if (window.ethereum) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        // if (ethereum.isConnected()) {
        //   const accounts = await window.ethereum.request({
        //     method: "eth_accounts",
        //   });
        //   console.log(accounts[0]);
        //   user = accounts[0];
        // }

        const txRes = await contract.addMedicalRecord(
          abhaID,
          patientName,
          doctor,
          documentType,
          hospitalName,
          date,
          documentHash,
          {
            gasLimit: 5000000,
          }
        );
        setIsLoading(true);
        await txRes.wait(1);
        setIsLoading(false);
        console.log("New medical record: ", txRes);
        return true;
      }
    } catch (error) {
      console.log(error);
      alert("Error while approving!");
    }
  };

  const recordsForPatient = async (abhaID) => {
    let records_ = [],
      record;
    let userAddress;

    try {
      if (window.ethereum) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          provider
        );

        // if (ethereum.isConnected()) {
        //   const accounts = await window.ethereum.request({
        //     method: "eth_accounts",
        //   });
        //   console.log(accounts[0]);
        //   userAddress = accounts[0];
        // }

        const txRes = await contract.getMedicalRecords(abhaID);
        console.log("records: ", txRes);

        txRes.map((details, index) => {
          record = {
            abhaID: details.abhaID,
            pateintName: details.pateintName,
            doctor: details.doctor,
            documentType: details.documentType,
            hospitalName: details.hospitalName,
            date: details.date,
            documentHash: details.documentHash,
          };

          records_.push(record);
          record = {};
          return true;
        });

        setValidMedicalRecords(records_);
      }
    } catch (error) {
      console.log(error);
      alert("Error while approving!");
    }
  };

  const recordsForDoctor = async (doctor) => {
    let records_ = [],
      record;
    let userAddress;

    try {
      if (window.ethereum) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          provider
        );

        // if (ethereum.isConnected()) {
        //   const accounts = await window.ethereum.request({
        //     method: "eth_accounts",
        //   });
        //   console.log(accounts[0]);
        //   userAddress = accounts[0];
        // }

        const txRes = await contract.searchByDoctor(doctor);
        console.log("records: ", txRes);

        txRes.map((details, index) => {
          record = {
            abhaID: details.abhaID,
            pateintName: details.pateintName,
            doctor: details.doctor,
            documentType: details.documentType,
            hospitalName: details.hospitalName,
            date: details.date,
            documentHash: details.documentHash,
          };

          records_.push(record);
          record = {};
          return true;
        });

        setValidMedicalRecords(records_);
      }
    } catch (error) {
      console.log(error);
      alert("Error while approving!");
    }
  };

  const recordsForType = async (documentType) => {
    let records_ = [],
      record;
    let userAddress;

    try {
      if (window.ethereum) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          provider
        );

        // if (ethereum.isConnected()) {
        //   const accounts = await window.ethereum.request({
        //     method: "eth_accounts",
        //   });
        //   console.log(accounts[0]);
        //   userAddress = accounts[0];
        // }

        const txRes = await contract.searchByDocumentType(documentType);
        console.log("records: ", txRes);

        txRes.map((details, index) => {
          record = {
            abhaID: details.abhaID,
            pateintName: details.pateintName,
            doctor: details.doctor,
            documentType: details.documentType,
            hospitalName: details.hospitalName,
            date: details.date,
            documentHash: details.documentHash,
          };

          records_.push(record);
          record = {};
          return true;
        });

        setValidMedicalRecords(records_);
      }
    } catch (error) {
      console.log(error);
      alert("Error while approving!");
    }
  };

  const recordsForHospital = async (hospitalName) => {
    let records_ = [],
      record;
    let userAddress;

    try {
      if (window.ethereum) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          provider
        );

        // if (ethereum.isConnected()) {
        //   const accounts = await window.ethereum.request({
        //     method: "eth_accounts",
        //   });
        //   console.log(accounts[0]);
        //   userAddress = accounts[0];
        // }

        const txRes = await contract.searchByHospitalName(hospitalName);
        console.log("records: ", txRes);

        txRes.map((details, index) => {
          record = {
            abhaID: details.abhaID,
            pateintName: details.pateintName,
            doctor: details.doctor,
            documentType: details.documentType,
            hospitalName: details.hospitalName,
            date: details.date,
            documentHash: details.documentHash,
          };

          records_.push(record);
          record = {};
          return true;
        });

        setValidMedicalRecords(records_);
      }
    } catch (error) {
      console.log(error);
      alert("Error while approving!");
    }
  };

  const recordsForDate = async (date) => {
    let records_ = [],
      record;
    let userAddress;

    try {
      if (window.ethereum) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          provider
        );

        // if (ethereum.isConnected()) {
        //   const accounts = await window.ethereum.request({
        //     method: "eth_accounts",
        //   });
        //   console.log(accounts[0]);
        //   userAddress = accounts[0];
        // }

        const txRes = await contract.searchByDate(date);
        console.log("records: ", txRes);

        txRes.map((details, index) => {
          record = {
            abhaID: details.abhaID,
            pateintName: details.pateintName,
            doctor: details.doctor,
            documentType: details.documentType,
            hospitalName: details.hospitalName,
            date: details.date,
            documentHash: details.documentHash,
          };

          records_.push(record);
          record = {};
          return true;
        });

        setValidMedicalRecords(records_);
      }
    } catch (error) {
      console.log(error);
      alert("Error while approving!");
    }
  };

  //wallet

  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");
    // Fetch all the eth accounts
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    checkIfWalletIsConnect();
    if (!window.ethereum) return alert("Please install MetaMask.");
    // Fetch all the eth accounts
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // Connecting account if exists
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  };

  return (
    <HealthMrmContext.Provider
      value={{
        currentAccount,
        setCurrentAccount,
        addUser,
        verifyPassword,
        addMedicalRecord,
        recordsForPatient,
        recordsForDoctor,
        recordsForType,
        recordsForHospital,
        recordsForDate,
        userdata,
        validMedicalRecords,
        connectWallet,
        checkIfWalletIsConnect,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </HealthMrmContext.Provider>
  );
};

export default HealthMrmContext;
