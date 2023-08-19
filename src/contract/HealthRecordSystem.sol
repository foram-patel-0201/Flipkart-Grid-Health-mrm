// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Define the contract
contract HealthRecordSystem {
    struct User {
        string role;
        string passwordHash;
        string name;
    }

    mapping(string => User) private users; // Map Abha ID to user info

    function addUser(
        string memory abhaId,
        string memory role,
        string memory passwordHash,
        string memory name
    ) public {
        users[abhaId] = User(role, passwordHash, name);
    }

    function verifyPassword(
        string memory abhaId,
        string memory password
    ) public view returns (string[2] memory) {
        if (
            keccak256(bytes(users[abhaId].passwordHash)) ==
            keccak256(bytes(password))
        ) {
            string memory name_ = users[abhaId].name;
            string memory role_ = users[abhaId].role;
            return [name_, role_];
        } else {
            return ["", ""];
        }
    }

    // Struct to represent a medical record
    struct MedicalRecord {
        string abhaID;
        string patientName;
        string doctor;
        string documentType;
        string hospitalName;
        string date; // Using string date instead of timestamp
        string documentHash; // Using string for document hash
    }

    // Mappings to store medical records for search by specific criteria
    mapping(string => MedicalRecord[]) private medicalRecords;
    mapping(string => MedicalRecord[]) private recordsByDoctor;
    mapping(string => MedicalRecord[]) private recordsByDocumentType;
    mapping(string => MedicalRecord[]) private recordsByHospitalName;
    mapping(string => MedicalRecord[]) private recordsByDate;

    MedicalRecord[] private allRecords;

    // Function to add a new medical record
    function addMedicalRecord(
        string memory abhaID,
        string memory patientName,
        string memory doctor,
        string memory documentType,
        string memory hospitalName,
        string memory date,
        string memory documentHash
    ) public {
        MedicalRecord memory newRecord = MedicalRecord({
            abhaID: abhaID,
            patientName: patientName,
            doctor: doctor,
            documentType: documentType,
            hospitalName: hospitalName,
            date: date,
            documentHash: documentHash
        });
        allRecords.push(newRecord);
        medicalRecords[abhaID].push(newRecord);
        recordsByDoctor[doctor].push(newRecord);
        recordsByDocumentType[documentType].push(newRecord);
        recordsByHospitalName[hospitalName].push(newRecord);
        recordsByDate[date].push(newRecord);
    }

    // Function to retrieve all medical records for a patient name
    function getMedicalRecords(
        string memory abhaID
    ) public view returns (MedicalRecord[] memory) {
        return medicalRecords[abhaID];
    }

    // Function to search for medical records by doctor
    function searchByDoctor(
        string memory doctor
    ) public view returns (MedicalRecord[] memory) {
        return recordsByDoctor[doctor];
    }

    // Function to search for medical records by document type
    function searchByDocumentType(
        string memory documentType
    ) public view returns (MedicalRecord[] memory) {
        return recordsByDocumentType[documentType];
    }

    // Function to search for medical records by hospital name
    function searchByHospitalName(
        string memory hospitalName
    ) public view returns (MedicalRecord[] memory) {
        return recordsByHospitalName[hospitalName];
    }

    // Function to search for medical records by date
    function searchByDate(
        string memory date
    ) public view returns (MedicalRecord[] memory) {
        return recordsByDate[date];
    }
}
