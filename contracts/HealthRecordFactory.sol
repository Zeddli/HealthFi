// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./HealthRecord.sol";

contract HealthRecordFactory {
    address[] public deployedRecords;

    event RecordCreated(
        address recordContract,
        string patientNric,
        address indexed submittedBy,
        uint256 timestamp
    );

    function createRecord(string memory _patientNric, string memory _recordHash) public {
        HealthRecord newRecord = new HealthRecord(_patientNric, _recordHash, msg.sender);
        deployedRecords.push(address(newRecord));
        emit RecordCreated(address(newRecord), _patientNric, msg.sender, block.timestamp);
    }

    function getDeployedRecords() public view returns (address[] memory) {
        return deployedRecords;
    }
}
