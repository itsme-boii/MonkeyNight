// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract User{

    mapping(address => address[]) private tokenCollection;
    mapping(address => mapping(address => bool)) private tokenExists;

    // this will map tokenaddress with user storage
    function addTokenAddress(address tokenAddress) public {
        address owner = msg.sender;
        require(!tokenExists[owner][tokenAddress], "Token already exists");
        tokenCollection[owner].push(tokenAddress);
        tokenExists[owner][tokenAddress] = true;
    }

    // in order to get total tokens being published
    function getTokenCount() public view returns (uint256) {
        return tokenCollection[msg.sender].length;

    }
     


}
