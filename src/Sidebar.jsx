import React, { useState } from 'react';
import { ethers } from 'ethers';  // Correct import

function Sidebar() {
  const [walletAddress, setWalletAddress] = useState(''); // State for wallet address

  // Function to connect wallet
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {  // Check if MetaMask is installed
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);  // Correct way to create provider
        await provider.send('eth_requestAccounts', []); // Request accounts from MetaMask
        const signer = await provider.getSigner();
        const address = await signer.getAddress(); // Get wallet address
        setWalletAddress(address); // Set the wallet address state
        console.log('Wallet connected: ', address);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full">
            <img src="user.png" alt="" />
          </div>
          <span>User Name</span>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <button className="block w-full text-left p-2 bg-blue-800 rounded-md">
                Dashboard
              </button>
            </li>
            <li>
              <button className="block w-full text-left p-2 hover:bg-blue-700 rounded-md">
                Shared files
              </button>
            </li>
            <li>
              <button className="block w-full text-left p-2 hover:bg-blue-700 rounded-md">
                Favorites
              </button>
            </li>
            <li>
              <button className="block w-full text-left p-2 hover:bg-blue-700 rounded-md">
                Upload files
              </button>
            </li>
            <li>
              {/* Connect Wallet */}
              <button
                onClick={connectWallet}
                className="block w-full text-left p-2 hover:bg-blue-700 rounded-md Wallet-btn"
              >
                {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <button className="block w-full text-left p-2 hover:bg-blue-700 rounded-md">
          Settings
        </button>
        <button className="block w-full text-left p-2 hover:bg-blue-700 rounded-md">
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
