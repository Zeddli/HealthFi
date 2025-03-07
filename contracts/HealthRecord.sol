// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HealthRecord {
    string public patientNric;
    string public recordHash;
    uint256 public timestamp;
    address public submittedBy;

    constructor(
        string memory _patientNric,
        string memory _recordHash,
        address _submittedBy
    ) {
        patientNric = _patientNric;
        recordHash = _recordHash;
        submittedBy = _submittedBy;
        timestamp = block.timestamp;
    }
}
