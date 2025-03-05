// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract IdentityContract {
    // Define a structure to hold user information
    struct User {
        string nric;
        string fullName;
        string phone;
        string department;
        address wallet;
    }
    
    // Mapping from wallet address to User details
    mapping(address => User) public users;
    
    // Event to emit when a user is registered
    event UserRegistered(address indexed user, string nric);
    
    // Function to register a new user
    function registerUser(
        string memory _nric,
        string memory _fullName,
        string memory _phone,
        string memory _department
    ) public {
        // Ensure the user is not already registered
        require(bytes(users[msg.sender].nric).length == 0, "User already registered");
        
        // Store the user details
        users[msg.sender] = User(_nric, _fullName, _phone, _department, msg.sender);
        
        // Emit an event for audit trail purposes
        emit UserRegistered(msg.sender, _nric);
    }
    
    // Function to retrieve user details
    function getUser(address _user) public view returns (User memory) {
        return users[_user];
    }
}
