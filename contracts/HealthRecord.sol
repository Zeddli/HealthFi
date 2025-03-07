
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HealthRecord {
    string public patientNric;
    string public diagnosis;
    string public description;
    string public date;           
    string public treatment;
    string public hospitalisation;
    uint256 public timestamp;
    address public submittedBy;

    constructor(
        string memory _patientNric,
        string memory _diagnosis,
        string memory _description,
        string memory _date,
        string memory _treatment,
        string memory _hospitalisation,
        address _submittedBy
    ) {
        patientNric = _patientNric;
        diagnosis = _diagnosis;
        description = _description;
        date = _date;
        treatment = _treatment;
        hospitalisation = _hospitalisation;
        submittedBy = _submittedBy;
        timestamp = block.timestamp;
    }
}
