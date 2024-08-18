import React, { useState } from 'react';
import Web3 from 'web3';

import { Card, CardContent } from "./component/card"

import { Button } from './component/button';
import { Input } from './component/input';
import { Spinner } from '@chakra-ui/react';



const TokenFunctions = ({deployed, setDeployed, loading, setLoading})=>{


	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [seconds, setSeconds] = useState('0');
	const [balance, setBalance] = useState(0);
	const [toAddress, setToAddress] = useState('');
	const [amountToSend, setAmountToSend] = useState(0);
    const [allowanceAmount, setAllowanceAmount] = useState(0);
    const [allowanceReturn, setallowanceReturn] = useState(0);
	const [addedUserToken, setAddedUserToken] = useState(false);
	const [addedWatchlistToken, setAddedWatchlistToken] = useState(false);
    const [selectedAction, setSelectedAction] = useState('');



      
  	const userStorageAddress = "0x1FD7e13000c9A5Db3c415c552fE6f46f0EceA37D";
  	const userStorageABI = [{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"addTokenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTokenCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenCollection","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
  	const tokenManagerAbi =[
		{
			"inputs": [
				
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "allowance",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "needed",
					"type": "uint256"
				}
			],
			"name": "ERC20InsufficientAllowance",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "balance",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "needed",
					"type": "uint256"
				}
			],
			"name": "ERC20InsufficientBalance",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "approver",
					"type": "address"
				}
			],
			"name": "ERC20InvalidApprover",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "receiver",
					"type": "address"
				}
			],
			"name": "ERC20InvalidReceiver",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "ERC20InvalidSender",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "ERC20InvalidSpender",
			"type": "error"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "addToken",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "approveOthers",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transferAmount",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "symbol",
					"type": "string"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "allowance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "checkAllowance",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint256",
							"name": "allowance",
							"type": "uint256"
						}
					],
					"internalType": "struct TokenManager.AllowanceAmount",
					"name": "",
					"type": "tuple"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "decimals",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getBalanceHistory",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint256",
							"name": "timestamp",
							"type": "uint256"
						},
						  
						{
							"internalType": "uint256",
							"name": "balance",
							"type": "uint256"
						}
					],
					"internalType": "struct TokenManager.BalanceHistory[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "date",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "time",
					"type": "uint256"
				}
			],
			"name": "getBalanceOnDate",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]

  	const web3 = new Web3(Web3.givenProvider || 'https://sepolia.drpc.org');
  	const userStorageContract = new web3.eth.Contract(userStorageABI, userStorageAddress);

    const handleActionChange = (e) => {
        setSelectedAction(e.target.value);
    };

	//Handle Balance With Date Function
	const handleCheckBalance = () => {
		if (date && time) {
			getBalanceOnDate(date, time, seconds);
		} else {
			alert('Please enter date and time.');
		}
	};

	//handle Tansfer of Tokens 
   	const handleToTransfer =async()=>{
		if (toAddress && amountToSend) {
			transferTo(toAddress, amountToSend);
		} else {
			alert('Please enter date and time.');
		}
	};
	const handleGiveAllowance =async()=>{
		if (allowanceAmount) {
			allowAllowance(allowanceAmount);
		} else {
			alert('Please enter amount');
		}
	};

	// Conversion of Date to Unix
	function convertDateToUnix(datee) {
		const dateTimeString = `${datee}`;
		console.log(dateTimeString);
		const date = new Date(datee);
		console.log(date);
		const timestamp = Math.floor(date.getTime() / 1000)
		console.log(timestamp)
		return timestamp;
	}

	//Get the TokenAddress Promise
	function handleTokenPromise() {
		return new Promise((resolve, reject) => {
			const tokenAddress = sessionStorage.getItem("tokenAddress");
			if (tokenAddress !== null && tokenAddress !== "") {
				resolve(tokenAddress);
			} else {
				reject(new Error('Token address not found in sessionStorage.'));
			}
		});
	}

    //Add TokenAddress to User
   	async function addTokenToUser() {
    	try {
        	const tokenAddress =  await handleTokenPromise();
        	console.log("Retrieved token address: ", tokenAddress);


        	const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        	if (accounts.length === 0) {
            	throw new Error('Accounts not found Check Metamask');
        	}

        	const gasEstimate = await userStorageContract.methods.addTokenAddress(tokenAddress).estimateGas({ from: accounts[0] });
        	console.log("Gas estimation: ", gasEstimate);

        	const transactionParameters = {
            	from: accounts[0],
            	to: userStorageAddress,
            	data: userStorageContract.methods.addTokenAddress(tokenAddress).encodeABI(),
				gas:String(gasEstimate),
            	gasPrice: '800000',
        	};

			setLoading(true);
        	const txHash = await window.ethereum.request({
            	method: 'eth_sendTransaction',
            	params: [transactionParameters],
        	});
        	console.log("Transaction successful with hash: ", txHash);

			let receipt = null;
			while (receipt === null) {
				receipt = await window.ethereum.request({
					method: 'eth_getTransactionReceipt',
					params: [txHash],
				});
				console.log(receipt)
	
				if (receipt !== null) {
					console.log("Transaction successful with receipt: ", receipt);
					setLoading(false);
				
				} else {
					console.log("Waiting for transaction to be mined...");
					await new Promise((resolve) => setTimeout(resolve, 2000));
				}
			}
			setAddedUserToken(true);
		} 
		catch (error) {
        		console.error("Error during addTokenToUser operation: ", error.message);
        		if (error.data) {
            		console.error("Error details: ", error.data);
        		}
    	}
	}

	//Add token to Watchlist
	async function addTokenToWatchlist(){
		try {
        	const tokenAddress =  await handleTokenPromise();
        	console.log(tokenAddress);

			const tokenManagerInstance = new web3.eth.Contract(tokenManagerAbi, tokenAddress);
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			if (accounts.length === 0) {
				throw new Error('Accounts not found');
			};
			const gasEstimate = await tokenManagerInstance.methods.addToken().estimateGas({ from: accounts[0] });
			console.log("Gas estimation is:", gasEstimate);
		
			const transactionParameters = {
				from: accounts[0],
				to: tokenAddress,
				data: tokenManagerInstance.methods.addToken().encodeABI(),
				gas: String(gasEstimate),
				gasPrice: '800000', 
			};

			setLoading(true);
			const txHash = await window.ethereum.request({
				method: 'eth_sendTransaction',
				params: [transactionParameters],
			})

			let receipt = null;
			while (receipt === null) {
				receipt = await window.ethereum.request({
					method: 'eth_getTransactionReceipt',
					params: [txHash],
				});
				console.log(receipt)
	
				if (receipt !== null) {
					console.log("Transaction successful with receipt: ", receipt);
					setLoading(false);
				
				} else {
					console.log("Waiting for transaction to be mined...");
					await new Promise((resolve) => setTimeout(resolve, 2000)); // Poll every 2 seconds
				}
			}
			setAddedWatchlistToken(true);
			console.log('TokenAdded',txHash);

    	} catch (error) {
        	console.error("Error getting contract address:", error);
    	}
   	};

   // Transfer token to other address
   	async function transferTo(toAddress,amountToSend){
		try {
			const tokenAddress =  await handleTokenPromise();
			console.log(tokenAddress);
			const tokenManagerInstance = new web3.eth.Contract(tokenManagerAbi, tokenAddress);

		
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			if (accounts.length === 0) {
				throw new Error('Accounts not found');
			};
			
			const gasEstimate = await tokenManagerInstance.methods.transferAmount(toAddress,amountToSend).estimateGas({ from: accounts[0] });
			console.log("Gas estimation is:", gasEstimate);
	
			const transactionParameters = {
				from: accounts[0],
				to: tokenAddress,
				data: tokenManagerInstance.methods.transferAmount(toAddress,amountToSend).encodeABI(),
				gas: String(gasEstimate),
				gasPrice: '800000', 
			};
			setLoading(true);
			const txHash = await window.ethereum.request({
				method: 'eth_sendTransaction',
				params: [transactionParameters],
			})
			let receipt = null;
			while (receipt === null) {
				receipt = await window.ethereum.request({
					method: 'eth_getTransactionReceipt',
					params: [txHash],
				});
				console.log(receipt)
	
				if (receipt !== null) {
					console.log("Transaction successful with receipt: ", receipt);
					setLoading(false);
				
				} else {
					console.log("Waiting for transaction to be mined...");
					await new Promise((resolve) => setTimeout(resolve, 2000)); // Poll every 2 seconds
				}
			}
			console.log('Transfered',txHash);
		} catch (error) {
			console.error("Error getting contract address:", error);
		}
   	};


   //Get Token Balance On Date
    async function getBalanceOnDate(datee, time) {
    	try {
        	const tokenAddress =  await handleTokenPromise();

        	const tokenManagerInstance = new web3.eth.Contract(tokenManagerAbi, tokenAddress);
        	const balanceHistory = await tokenManagerInstance.methods.getBalanceHistory().call();
        	console.log("Balance History:", balanceHistory);

        	const unixInputDate = convertDateToUnix(datee, time);
        	console.log("Input Date (Unix):", unixInputDate);

        	// Search for the balance corresponding to the input date
        	let balanceOnDate = null;
        	for (let i = 0; i < balanceHistory.length; i++) {
            	const record = balanceHistory[i];
            	const recordDate = record[0];
            	const recordBalance = record[1];

            // Check if the input date matches the record date
            if (recordDate == unixInputDate) {
                balanceOnDate = recordBalance;
                break;
            }
        	}

        	if (balanceOnDate !== null) {
            	console.log(`Balance on ${datee} is:`, balanceOnDate.toString());
        	} else {
            	console.log("No balance found for the given date.");
       		}

    	} catch (error) {
        	console.error("Error retrieving balance:", error);
    	}	
	}
	async function allowAllowance(allowanceAmount){
		try {
			const tokenAddress =  await handleTokenPromise();
			console.log(tokenAddress);
			const tokenManagerInstance = new web3.eth.Contract(tokenManagerAbi, tokenAddress);
		
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			if (accounts.length === 0) {
				throw new Error('Accounts not found');
			};
			const gasEstimate = await tokenManagerInstance.methods.approveOthers(allowanceAmount).estimateGas({ from: accounts[0] });
			console.log("Gas estimation is:", gasEstimate);
	
			const transactionParameters = {
				from: accounts[0],
				to: tokenAddress,
				data: tokenManagerInstance.methods.approveOthers(allowanceAmount).encodeABI(),
				gas: String(gasEstimate),
				gasPrice: '800000', 
			};

		
			const txHash = await window.ethereum.request({
				method: 'eth_sendTransaction',
				params: [transactionParameters],
			})
			let receipt = null;
			while (receipt === null) {
				receipt = await window.ethereum.request({
					method: 'eth_getTransactionReceipt',
					params: [txHash],
				});
				console.log(receipt)
	
				if (receipt !== null) {
					console.log("Transaction successful with receipt: ", receipt);
					// setLoading(false);
				
				} else {
					console.log("Waiting for transaction to be mined...");
					await new Promise((resolve) => setTimeout(resolve, 2000)); // Poll every 2 seconds
				}
			}
			console.log('Transfered',txHash);
		} catch (error) {
			console.error("Error getting contract address:", error);
		}
   	};

	async function getAllowanceAmount(){
		try {
			const tokenAddress =  await handleTokenPromise();	
			// const [date, setDate] = useState('');
			// const [time, setTime] = useState('');
			// const [seconds, setSeconds] = useState('0');
			// const [balance, setBalance] = useState(0);
			// const [toAddress, setToAddress] = useState('');
			// const [amountToSend, setAmountToSend] = useState(0);
			
			const tokenManagerInstance = new web3.eth.Contract(tokenManagerAbi, tokenAddress);
			console.log("token Address is: ",tokenAddress);
        	let aa = await tokenManagerInstance.methods.checkAllowance().call();
			console.log("allowance amount is: ",aa['allowance']);
			// console.log("balance is",balanceee[balanceee.length-1][1]);
			if (aa['allowance']!=undefined && aa['allowance']==null){
				setallowanceReturn(aa['allowance']);
			}
    	} catch (error) {
        	console.error("Error getting Allowance Amount:", error);
    	}
	};

    // Get Token Current Balance
	async function getTokenBalance(){
		try {
			const tokenAddress =  await handleTokenPromise();
			
			const tokenManagerInstance = new web3.eth.Contract(tokenManagerAbi, tokenAddress);
        	let balanceee = await tokenManagerInstance.methods.getBalanceHistory().call();
			// console.log("balance is",balanceee[balanceee.length-1][1]);
			if(balanceee.length!=0){
			if (balanceee[balanceee.length-1][1]!=undefined && balanceee[balanceee.length-1][1]!=null){
				setBalance(balanceee[balanceee.length-1][1]);
			}
		}
    	} catch (error) {
        	console.error("Error getting Token Balance:", error);
    	}
	};

    return (
        <div>
        <div>
          <label>Select an Action: </label>
          <select value={selectedAction} onChange={handleActionChange}>
            <option value="">--Select--</option>
            <option value="addToken">Add Token</option>
            <option value="watchlist">Add to Watchlist</option>
            <option value="transfer">Transfer Token</option>
          </select>
        </div>
  
        {selectedAction === 'addToken' && (
          <Card>
            <CardContent>
              <h3>Add Token</h3>
              <Button onClick={addTokenToUser}>Add Token</Button>
              {loading && <Spinner />}
              {addedUserToken && <p>Token successfully added!</p>}
            </CardContent>
          </Card>
        )}
  
        {selectedAction === 'watchlist' && (
          <Card>
            <CardContent>
              <h3>Add Token to Watchlist</h3>
              <Button onClick={addTokenToWatchlist}>Add to Watchlist</Button>
              {loading && <Spinner />}
              {addedWatchlistToken && <p>Token successfully added to watchlist!</p>}
            </CardContent>
          </Card>
        )}
  
        {selectedAction === 'transfer' && (
          <Card>
            <CardContent>
              <h3>Transfer Token</h3>
              <Input placeholder="To Address" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
              <Input placeholder="Amount to Send" type="number" value={amountToSend} onChange={(e) => setAmountToSend(e.target.value)} />
              <Button onClick={handleToTransfer}>Transfer</Button>
              {loading && <Spinner />}
            </CardContent>
          </Card>
        )}
      </div>
    )
    }

	export default TokenFunctions;