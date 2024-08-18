import Web3 from 'web3';
import React,{ useState, useEffect} from "react";
import styled, { keyframes } from "styled-components";
import { Tilt } from "react-tilt";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
  margin-left: 30px;
`;


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
  font-size: 52px;
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

const TokensContainer = styled.div`
  width: 150px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 50px;
  justify-content: center;
`;

const Token = styled.div`
  width: 100%;
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
const TokenImage = styled.img`
  width: 24px;
  height: 24px;
`;

const Register = () => {
  const [addedUserToken, setAddedUserToken] = useState(false);
  const [isRegistered,setIsRegistered] = useState(false);
  const [isRegistering,setIsRegistering]= useState(false);

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

  // check whether the tokenmanager is registerd or not
  useEffect(()=>{
    const isregistered = sessionStorage.getItem('Registerd')==='true';
    setIsRegistered(isregistered);
  },[])

     
  const userStorageAddress = "0x111f9209d02Df2669CE8bBdE5e52Cb09340f5697";
  const userStorageABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        }
      ],
      "name": "addTokenAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTokenCount",
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
  ];

  const web3 = new Web3(Web3.givenProvider || 'https://sepolia.drpc.org');
  const userStorageContract = new web3.eth.Contract(userStorageABI, userStorageAddress);

  //this function will add token to the user  
  async function addTokenToUser() {
    try {
      setIsRegistering(true);
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

    // setLoading(true);
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
        setIsRegistered(true);
        setIsRegistering(false);
        sessionStorage.setItem('Registerd',true);
      
      } else {
        console.log("Waiting for transaction to be mined...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
    setAddedUserToken(true);
  } 
  catch (error) {
          console.error("Error during Register: ", error.message);
          if (error.data) {
              console.error("Error details: ", error.data);
          }
    }
    finally {
      setIsRegistering(false)
    }
  }

 
  return (
    <Container id="Register">
      <Wrapper>
        <Title>Register To Pool</Title>
        <Desc
          style={{
            marginBottom: "40px",
          }}
        >
          Click the button below to register in UserPool and create your token collection!
        </Desc>

        <TokensContainer>
          
            <Tilt>
              <Token>
                <TokenTitle>Register</TokenTitle>

                <TokenList>
                    <TokenItem>
                    {!isRegistered ? (
                    isRegistering ? (
                      <>
                        Registering
                        <Spinner />
                      </>
                    ) : (
                      <button
                        style={{ background: "none", border: "none", color: "#854CE6" }}
                        onClick={addTokenToUser}
                      >
                        Add To Pool
                      </button>
                    )
                  ) : (
                    <button
                      style={{ background: "none", border: "none", color: "#854CE6" }}
                      disabled
                    >
                      Registered
                    </button>
                  )}
                    </TokenItem>
                </TokenList>
              </Token>
            </Tilt>

        </TokensContainer>
      </Wrapper>
    </Container>
  );
};

export default Register;
