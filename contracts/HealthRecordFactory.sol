// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./single_Health_Record.sol";

contract HealthRecordFactory {
    // Array to store addresses of all deployed record contracts
    address[] public deployedRecords;
    
    event RecordCreated(
        address recordAddress, 
        string patientNric, 
        address submittedBy, 
        uint256 timestamp
    );
    
    function createRecord(string memory _patientNric, string memory _recordHash) public {
        single_Health_Record newRecord = new single_Health_Record(_patientNric, _recordHash, msg.sender);
        deployedRecords.push(address(newRecord));
        emit RecordCreated(address(newRecord), _patientNric, msg.sender, newRecord.timestamp());
    }
    
    function getDeployedRecords() public view returns (address[] memory) {
        return deployedRecords;
    }
}
