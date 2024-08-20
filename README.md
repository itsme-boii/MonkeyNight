Crypto Portfolio App
Overview
The Crypto Portfolio App is a decentralized application (DApp) designed to allow users to mint and manage their own tokens on the Sepolia testnet. This project utilizes A2Solidity smart contracts, including a Token Manager contract and a User Storage contract.

Key Features
-Token Minting: Users can mint their own tokens with a custom name and symbol.
-Token Management: Users can transfer tokens, give allowances to smart contracts, and check allowances.
-User Storage: A smart contract to maintain user-specific data and token registrations.
-Token Balance Tracking: Visual representation of token balances over time using bar graphs.

Installation
`Follow these steps to set up and run the Crypto Portfolio App locally.

git clone https://github.com/yourusername/crypto-portfolio-app.git
cd crypto-portfolio-app
npm install
npm run start


Usage
-Connecting Your Wallet
-Connect Wallet: The application requires a web3-enabled wallet such as MetaMask. Ensure your wallet is connected to the Sepolia testnet.

Token Manager
-Deploy Token Manager:
      Enter the desired token name and symbol in the application interface.
      Click on "Deploy" to deploy your Token Manager contract.
-Register Your Token:
      After deployment, register your token in the User Storage contract.
-Mint Tokens:
      Mint an initial balance of 1000 tokens.
-Transfer Tokens:
      Provide the recipient’s address and the amount to transfer.
-Give Allowance:
      Click on "Give Allowance" to allow a smart contract to spend tokens on your behalf.
      Check the current allowance at any time.
-View Token Balance:
      Track your token balance over time with a bar graph that shows the balance on each date.
      
Smart Contracts
-Token Manager
   Minting: Allows users to mint tokens.
   Transfers: Facilitates the transfer of tokens between addresses.
   Allowance: Users can grant and check allowances for smart contracts.
-User Storage
   Registration: Keeps track of user-specific token registrations and balances.


