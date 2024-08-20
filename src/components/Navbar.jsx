import React, { useEffect, useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme } from "styled-components";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  width:100%
  align-items: center;
  justify-content: space-around;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    padding: 0 10px;
  }
`;

const NavbarContainer = styled.div`
  width:100%;
  max-width: 2400px;
  min-width: 1800px;
  padding: -8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.4rem;
`;

const Title = styled(LinkR)`
  width: 100%;
  max-width:2800;
  padding: 0 60px;
  margin-right:-100px;
  font-weight: 700;
  font-size: 40px;
  text-decoration: none;
  color: inherit;
   display: flex;
    white-space: nowrap;

    @media screen and (max-width: 1200px) {
    font-size: 30px;
  }

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }

  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  scroll-behaviour:smooth;
  padding: 0 121px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 -10px;
  
  @media screen and (max-width: 768px) {
    flex-grow: 1;
    justify-content: flex-end;
  }
`;

const ConnectButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
   list-style: none;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 32px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: white;
    color: ${({ theme }) => theme.text_primary};
  }
`;

const ConnectedButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
`;





const Navbar = () => {

  const theme = useTheme();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const isConnected = sessionStorage.getItem('IsConnected') === 'true';
    const walletAddress = sessionStorage.getItem('WalletAddress');
    if(walletAddress!=null || walletAddress!=undefined){
    setWalletAddress(walletAddress);
  }
    setIsConnected(isConnected);
  }, []);

  useEffect(() => {
    // Scroll to the Dashboard section on component mount
    const dashboardSection = document.getElementById("Dashboard");
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);


  const connectWallet = async () => {
  try {
    if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setIsConnected(true);
    sessionStorage.setItem('IsConnected', 'true');
    sessionStorage.setItem('WalletAddress', accounts[0]);
    setWalletAddress(accounts[0]); 
    } else {
    console.error('MetaMask is not installed');
    }
  } catch (error) {
      console.error('Error connecting to wallet:', error);
  }
   };



  return (
    <Nav>
      <NavbarContainer>
        <Title to="/">Crypto-Portfolio</Title>
        <NavItems>
          <NavLink href="#Dashboard">Deploy</NavLink>
          <NavLink href="#Register">Register</NavLink>
          <NavLink href="#AddTokens">AddTokens</NavLink>
          <NavLink href="#TransferToken">Transfer</NavLink>
          <NavLink href="#GiveAllowance">GiveAllowance</NavLink>
          <NavLink href="#TokenBalance">TokenBalance</NavLink>
          <NavLink href="#BalanceByDate">History</NavLink>
          
        </NavItems>


        <ButtonContainer>
          {isConnected ? (
               <ConnectedButton>
          <p>Connected</p>
          </ConnectedButton>
        ) : (
          <ConnectButton>
          <button  style={{width:"120px",marginRight:"20px", background: 'transparent', border: 'none', color: `#854CE6`,fontSize:'18px'}} onClick={connectWallet}>Connect</button>
          </ConnectButton>
        )}
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;