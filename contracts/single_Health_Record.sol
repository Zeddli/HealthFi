// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract single_Health_Record {
    string public patientNric;
    string public recordHash; // e.g., a pointer or hash of the record stored off-chain
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
