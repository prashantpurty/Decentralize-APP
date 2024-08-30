// const Wallet = () => {
//   const [walletAddress, setWalletAddress] = useState("");

//   const checkMetaMaskInstalled = () => {
//     return typeof window.ethereum !== 'undefined';
//   }

//   const connectWallet = async () => {
//     if (checkMetaMaskInstalled()) {
//       try {
//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         setWalletAddress(accounts[0]);
//       } catch (error) {
//         console.error("Failed to connect wallet:", error);
//       }
//     } else {
//       alert("Please install MetaMask!");
//     }
//   };

//   const shortenAddress = (address) => {
//     return address.slice(0, 6) + '...' + address.slice(-4);
//   };

//   return (
//     <nav>
//             <li>
//               <a href="#" className="block p-2 hover:bg-blue-700 rounded-md">
//                 Wallet
//               </a>
//             </li>
//       <div>
//         {walletAddress ? (
//           <button>{shortenAddress(walletAddress)}</button>
//         ) : (
//           <button onClick={connectWallet}>Connect Wallet</button>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Wallet;