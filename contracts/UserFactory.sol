// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./User.sol";

contract UserFactory {
    address[] public deployedUsers;

    event UserCreated(
        address userContract,
        string nric,
        address indexed owner
    );

    function createUser(
        string memory _nric,
        string memory _fullName,
        string memory _phone,
        string memory _department
    ) public {
        // Deploy a new User contract
        User newUser = new User(_nric, _fullName, _phone, _department, msg.sender);
        deployedUsers.push(address(newUser));

        emit UserCreated(address(newUser), _nric, msg.sender);
    }

    function getDeployedUsers() public view returns (address[] memory) {
        return deployedUsers;
    }
}
