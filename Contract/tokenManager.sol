// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract TokenManager is ERC20{
    // this will store owner
    address owner;

    event TokenAdded(address tokenaddress);
    event Transfered(address indexed  from, address indexed to, uint indexed amount);
    
    //this will allocate name and symbol to the token
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        owner = msg.sender;
    }

    modifier onlyOwner{
        require(msg.sender==owner);
        _;
    }

    struct Token{
        address tokenAddress;
    }

    struct BalanceHistory {
        uint256 timestamp;
        uint256 balance;
    }

    struct AllowanceAmount{
        uint256 allowance;
    }

    //storage for Token
    Token token;

    //mapping for whether the token is created or not
    mapping(address => bool) private tokenCreated;

    //storage for allowance amount
    AllowanceAmount private allowanceAmount;

    //storage for balance history
    BalanceHistory[] private balanceHistory;

    // this fuction is to mint the tokens
    function mint(address to, uint256 amount) internal{
        _mint(to, amount);
    }

    // this function will call mint function
    function addToken() public onlyOwner {
        address tokenaddress = address(this);
        require(!tokenCreated[tokenaddress],"Token already created");
        mint(msg.sender,1000);
        token = Token({
            tokenAddress: tokenaddress
        });
        balanceHistory.push(BalanceHistory({
            timestamp: block.timestamp-(block.timestamp%86400),
            balance: balanceOf(msg.sender)
        }));
        tokenCreated[tokenaddress]=true;
        emit TokenAdded(tokenaddress);
    }

    // this function will transfer amount to other users
    function transferAmount(address to, uint amount) public onlyOwner {
        require(balanceOf(msg.sender) >= amount, "Not enough balance");
        _transfer(msg.sender, to, amount);
         balanceHistory.push(BalanceHistory({
            timestamp: block.timestamp-(block.timestamp%86400),
            balance: balanceOf(msg.sender)
        }));
        emit Transfered(msg.sender, to, amount);
    
    }

    // this is used to get the balance history
   function getBalanceHistory() external view returns (BalanceHistory[] memory)  {
        return balanceHistory;
    }

    // this will approve the smartcontract to spend on behalf of the user itself
    function approveOthers(uint256 amount) public returns (bool) {
        _approve(msg.sender, address(this), amount);
        allowanceAmount.allowance = allowance(msg.sender, address(this));
        return true;
    }

    // this will check allowance 
    function checkAllowance() external view returns(AllowanceAmount memory)  {
        return allowanceAmount;
    }
    
}