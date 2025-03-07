// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract User {
    string public nric;
    string public fullName;
    string public phone;
    string public department;
    address public owner; // The address that deployed this user contract

    constructor(
        string memory _nric,
        string memory _fullName,
        string memory _phone,
        string memory _department,
        address _owner
    ) {
        nric = _nric;
        fullName = _fullName;
        phone = _phone;
        department = _department;
        owner = _owner;
    }
}
