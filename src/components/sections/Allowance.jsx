import Web3 from 'web3';
import React,{ useState } from "react";
import styled from "styled-components";
import { Tilt } from "react-tilt";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contnet: center;
  position: relative;
   padding: 150px 0;
  top:-20px;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const Title = styled.div`
  font-size: 58px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;
const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TokenContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 50px;
  justify-content: center;
`;

const Token = styled.div`
   width: 500px;
  height:230px;
  max-width: 500px;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 18px 36px;
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 10px 36px;
  }

  @media (max-width: 500px) {
    max-width: 330px;
    padding: 10px 36px;
  }
`;

const TokenTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
`;

const TokenList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;
const TokenItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 80};
  border: 1px solid ${({ theme }) => theme.text_primary + 80};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

const AllotAllowance = () => {
  const [amountToSend, setAmountToSend] = useState(0);
  const [allowanceReturn, setallowanceReturn] = useState(0);

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
  const handleGiveAllowance =async()=>{
		if (amountToSend) {
			allowAllowance(amountToSend);
		} else {
			alert('Please enter amount');
		}
	};


     

  const tokenManagerAbi =[
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
          "indexed": false,
          "internalType": "address",
          "name": "tokenaddress",
          "type": "address"
        }
      ],
      "name": "TokenAdded",
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
          "indexed": true,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Transfered",
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
    }
  ];

  const web3 = new Web3(Web3.givenProvider || 'https://sepolia.drpc.org');

  
  async function getAllowanceAmount(){
		try {
			const tokenAddress =  await handleTokenPromise();	
    
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

  async function allowAllowance(amountToSend){
		try {
			const tokenAddress =  await handleTokenPromise();
			console.log(tokenAddress);
			const tokenManagerInstance = new web3.eth.Contract(tokenManagerAbi, tokenAddress);
		
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			if (accounts.length === 0) {
				throw new Error('Accounts not found');
			};
			const gasEstimate = await tokenManagerInstance.methods.approveOthers(amountToSend).estimateGas({ from: accounts[0] });
			console.log("Gas estimation is:", gasEstimate);
	
			const transactionParameters = {
				from: accounts[0],
				to: tokenAddress,
				data: tokenManagerInstance.methods.approveOthers(amountToSend).encodeABI(),
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

 
  return (
    <Container id="GiveAllowance">
      <Wrapper>
        <Title>Allowance</Title>
        <Desc
          style={{
            marginBottom: "40px",
          }}
        >
           Here Your Can Allot a specific amount to smartcontract so that smartcontract can soend on your behalf when needed
        </Desc>

        <TokenContainer>
          
            <Tilt>
              <Token>
                <TokenTitle>Approve Allowance</TokenTitle>

                <TokenList>
                <form>
    <div className="grid w-full items-center gap-4" >
    <div
  className="flex flex-col space-y-2 p-4 rounded-lg shadow-lg py-8"
  style={{ background: "transparent", border: "1.6px solid #6B4DBF",borderRadius: "8px", borderBottomLeftRadius:"17px", borderTopRightRadius:"6px",width:"307x", paddingBottom: "2px",}}
>
 
  <input
    placeholder="amount"
    type="integer"
    id="TokenName"
    value={amountToSend}
    onChange={(e) => setAmountToSend(e.target.value)}
    className="p-2 rounded-md border focus:outline-none focus:ring-0  "
    style={{color:"#854CE6",width: "250px",width:"240px",background:"transparent",border:"none",paddingLeft: "82px",paddingBottom: "8px",border:"none", boxShadow: "none", outline:"none"}}
  />
</div>
    </div>
  </form>
                    <TokenItem style={{marginTop:"20px"}}>
                    <button style={{background:"none",border:"none",color:"#854CE6"}} onClick={handleGiveAllowance}>Approve Allowance</button>
                   
                    
                    
                    </TokenItem>

                </TokenList>
              </Token>
            </Tilt>
            <Tilt>
              <Token>
                <TokenTitle>Get Allowance Amount</TokenTitle>

                <TokenList >
                  
                    <TokenItem style={{marginTop:"20px"}}>
                    <button style={{background:"none",border:"none",color:"#854CE6"}} onClick={getAllowanceAmount}>Get Amount</button>

                    </TokenItem>
                    <Title  >
                      {
                      allowanceReturn!=null && `${allowanceReturn}`
                    }
                    </Title>
                </TokenList>
              </Token>
            </Tilt>

        </TokenContainer>
      </Wrapper>
    </Container>
  );
};

export default AllotAllowance;
