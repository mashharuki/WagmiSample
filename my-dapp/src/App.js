import { configureChains, connect, createClient, disconnect, goerli, mainnet } from '@wagmi/core';
import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { publicProvider } from '@wagmi/core/providers/public';
import { useState } from 'react';
import './App.css';
import logo from './logo.svg';


/**
 * App component
 * @returns 
 */
function App() {
  const [address, setAddress] = useState(null);

  /**
   * configureChains
   */
  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, goerli],
    [publicProvider()],
  );
  
  /**
   * create client
   */
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  /**
   * conncet function
   */
  const connectAction = async () => {
    // get address;
    const { evmAddress } = await connect({
      connector: new InjectedConnector(),
    });
    // const ensName = await fetchEnsName({ address })

    setAddress(evmAddress);
  };

  /**
   * disconnect fuction
   */
  const disConnectAction = async () => { 
    // disconnect
    await disconnect();
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {address ? (
          <>
            <p><strong>your address is {address}</strong></p>
            <button
                onClick={disConnectAction}
              >
              disconnect
            </button>
          </>
        ) : (
          <>
            <p><strong>Please connect your wallet!</strong></p>
            <button
              onClick={connectAction}
            >
              connect
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
