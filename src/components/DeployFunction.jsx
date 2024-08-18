

import React, { useState, useEffect } from 'react';
import { deployTokenManagerContract } from './deployTokenManagerContract.jsx'; 
import Web3 from 'web3';
import { Label } from "../ui/label.jsx"
import styled, { keyframes } from "styled-components";



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


function Dep() { 
  const [tokenName, setTokenName] = useState('');
	const [tokenSymbol, setTokenSymbol] = useState('');
  const [deployed, setDeployed] = useState(false);
  const [isdeploying,setIsDeploying] = useState(false);
  
  const web3 = new Web3(Web3.givenProvider || 'https://rpc2.sepolia.org/');


  useEffect(() => {
    const isDeployed = localStorage.getItem('deployed') === 'true';
    setDeployed(isDeployed);
    setIsDeploying(false);
    
  }, []);
  useEffect(() => {
    setIsDeploying(false);
    
  },[deployed]);

  const handleDeployContract = async () => {
    console.log('Deploying contract...');
    localStorage.setItem('tokenName', tokenName);
    localStorage.setItem('tokenSymbol', tokenSymbol);
    setTokenName("");
    setTokenSymbol("");
    

    try {
      setIsDeploying(true);
      const contractAddress = await deployTokenManagerContract(tokenName,tokenSymbol); 
      setDeployed(true);
      localStorage.setItem('deployed', 'true');

      console.log("deployed: ",deployed);

      console.log('TokenManager Address at:', contractAddress); 

    ;}catch (error) {
        console.error('Error deploying contract:', error.message);
    if (error.data) {
      console.error('Error details:', error.data);
    }
    }
  };
    
  return (
    
<div >
  { 
  
  !deployed ?(
  <form>
    <div className="grid w-full items-center gap-4" >
    <div
  className="flex flex-col space-y-2 p-4 rounded-lg shadow-lg py-8"
  style={{ background: "transparent", border: "1.6px solid #6B4DBF",borderRadius: "8px", borderBottomLeftRadius:"17px", borderTopRightRadius:"6px",width:"307x", paddingBottom: "2px",}}
>
  <Label
    htmlFor="tokenName"
    className="text-white text-sm font-semibold rounded-md px-2 py-3"
    style={{color:"#854CE6",fontSize: "19px" , fontWeight: "bold",paddingLeft: "2px"}}
  >
    Name 
  </Label>

  <input
    placeholder="Enter Token Name"
    type="text"
    id="TokenName"
    value={tokenName}
    onChange={(e) => setTokenName(e.target.value)}
    className="p-2 rounded-md border focus:outline-none focus:ring-0  "
    style={{color:"#854CE6",width: "250px",width:"240px",background:"transparent",border:"none",paddingLeft: "50px",paddingBottom: "8px",border:"none", boxShadow: "none", outline:"none"}}
  />
</div>
<div
  className="flex flex-col space-y-2 p-4 rounded-lg shadow-lg py-8"
  style={{ background: "transparent", border: "1.6px solid #6B4DBF",borderRadius: "8px", borderBottomLeftRadius:"17px", borderTopRightRadius:"6px",width:"307x", paddingBottom: "2px",}}
>
  <Label
    htmlFor="TokenSymbol"
    className="text-white text-sm font-semibold rounded-md px-2 py-3"
    style={{color:"#854CE6",fontSize: "19px" , fontWeight: "bold",paddingLeft: "2px"}}
  >
    Symbol 
  </Label>

  <input
    placeholder="Enter Token Symbol"
    type="text"
    id="tokenSymbol"
    value={tokenSymbol}
    onChange={(e) => setTokenSymbol(e.target.value)}
    className="p-2 rounded-md border focus:outline-none focus:ring-0  "
    style={{color:"#854CE6",width: "250px",width:"240px",background:"transparent",border:"none",paddingLeft: "25px",paddingBottom: "8px",border:"none", boxShadow: "none", outline:"none"}}
  />
</div>
    </div>
  </form>

):(
  <Label
  htmlFor="tokenName"
  className="text-white text-sm font-semibold rounded-md px-2 py-3"
  style={{color:"#854CE6",fontSize: "40px" , fontWeight: "bold",paddingLeft: "2px"}}
>
  Deployed 
</Label>
)
}

  {tokenName && tokenSymbol && (
    !isdeploying?(
        <button
          style={{ color: "#854CE6", fontSize: "19px", fontWeight: "bold", paddingLeft: "2px", background: "transparent", border: "none", paddingTop: "20px", paddingLeft: "100px" }}
          onClick={handleDeployContract}
        >
          Deploy
        </button>):
        (
          <Spinner/>
        )
      )}
{/* {
  deployed && 
<TokenFunctions deployed={deployed} setDeployed={setDeployed} loading={loading} setLoading={setLoading}/>
} */}
</div>

  );
}

export default Dep;
