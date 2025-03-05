// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HealthRecordContract {
    struct HealthRecord {
        string recordHash;  // e.g., a hash or pointer to the actual record
        uint256 timestamp;
        address submittedBy;
    }
    
    // Mapping from patient NRIC to an array of health records
    mapping(string => HealthRecord[]) private records;

    // Event emitted when a new record is added
    event RecordAdded(
        string indexed nric,
        address indexed submittedBy,
        uint256 timestamp,
        string recordHash
    );

    // Add a new health record for a given patient NRIC
    function addRecord(string memory _nric, string memory _recordHash) public {
        HealthRecord memory newRecord = HealthRecord({
            recordHash: _recordHash,
            timestamp: block.timestamp,
            submittedBy: msg.sender
        });
        records[_nric].push(newRecord);
        emit RecordAdded(_nric, msg.sender, block.timestamp, _recordHash);
    }

    // Retrieve all health records for a given patient NRIC
    function getRecords(string memory _nric) public view returns (HealthRecord[] memory) {
        return records[_nric];
    }
}
