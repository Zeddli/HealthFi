
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./HealthRecord.sol";

contract HealthRecordFactory {
    address[] public deployedRecords;

    event RecordCreated(
        address recordContract,
        string patientNric,
        string diagnosis,
        string description,
        string date,
        string treatment,
        string hospitalisation,
        address indexed submittedBy,
        uint256 timestamp
    );

    function createRecord(
        string memory _patientNric,
        string memory _diagnosis,
        string memory _description,
        string memory _date,
        string memory _treatment,
        string memory _hospitalisation
    ) public {
        HealthRecord newRecord = new HealthRecord(
            _patientNric,
            _diagnosis,
            _description,
            _date,
            _treatment,
            _hospitalisation,
            msg.sender
        );
        deployedRecords.push(address(newRecord));
        emit RecordCreated(address(newRecord), _patientNric, _diagnosis, _description, _date, _treatment, _hospitalisation, msg.sender, block.timestamp);
    }

    function getDeployedRecords() public view returns (address[] memory) {
        return deployedRecords;
    }
}
