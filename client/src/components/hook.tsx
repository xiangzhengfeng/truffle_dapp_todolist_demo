import React, { Component, useCallback, useEffect, createContext, ReactNode, useState, useContext } from "react";
import SimpleStorageContract from "../contracts/Todolist.json";
import getWeb3 from "../getWeb3";
import styled from 'styled-components'

class App1 extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, list: [], value: "" };

  runExample = async () => {
    const { accounts, contract } = this.state as { accounts: any, contract: any };

    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();
    const response = await contract.methods.getLength().call();


    // Update state with the result.
    this.setState({ storageValue: response });
  };

  getList = async () => {
    const { accounts, contract } = this.state as { accounts: any, contract: any };
    const len = await contract.methods.getLength().call();
    for (var i = 0; i < len; i++) {
      const aa = await contract.methods.lists(i).call()
      console.log(aa)
    }
  }

  add = async (value: any) => {
    const { accounts, contract } = this.state as { accounts: any, contract: any };
    // Stores a given value, 5 by default.
    await contract.methods.add(Number(value)).send({ from: accounts[0] });

    const response = await contract.methods.getLength().call();
    //this.getList();

    // Update state with the result.
    this.setState({ storageValue: response });

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();
    //const response = await contract.methods.beforeDeleteId;

    // Update state with the result.
    //this.setState({ storageValue: response });
  };

  done = async (value: any) => {
    const { accounts, contract } = this.state as { accounts: any, contract: any };
    // Stores a given value, 5 by default.
    await contract.methods.done(Number(value)).send({ from: accounts[0] });

    const response = await contract.methods.getLength().call();
    //this.getList();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  remove = async (value: any) => {
    const { accounts, contract } = this.state as { accounts: any, contract: any };
    // Stores a given value, 5 by default.
    await contract.methods.remove(Number(value)).send({ from: accounts[0] });

    const response = await contract.methods.getLength().call();
    //this.getList();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
        <div>
          <input value={this.state.value} onChange={(e) => { this.setState({ value: e.target.value }) }} /><button onClick={() => {
            this.add(String(this.state.value));
          }}>add</button>
          <input value={this.state.value} onChange={(e) => { this.setState({ value: e.target.value }) }} /><button onClick={() => {
            this.done(String(this.state.value));
          }}>done</button>
          <input value={this.state.value} onChange={(e) => { this.setState({ value: e.target.value }) }} /><button onClick={() => {
            this.remove(String(this.state.value));
          }}>remove</button>
          <div>
            {this.state.list.map(item => {
              return <div>{JSON.stringify(item)}</div>
            })}
          </div>
        </div>
      </div>
    );
  }
}

export const ContrctContext = createContext(
  {} as {
    accounts: any;
    contract: any;
  },
);

export const useContract = () => useContext(ContrctContext);

export const ContrctProvider = ({ children }: { children: ReactNode }) => {
  const [{ accounts, contract }, setContract] = useState({ accounts: null, contract: null })
  const connectContract = useCallback(async () => {

    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = (SimpleStorageContract as any).networks[networkId];
      const contract = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      contract.events.HandleList()
        .on("connected", function (subscriptionId: string) {
          console.log(subscriptionId, "events 已连接");
        })
        .on('data', function (event: any) {
          console.log(event, "data"); // 与上述可选的回调结果相同
        })

      setContract({ accounts, contract })

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

  }, [])

  useEffect(() => {
    connectContract()
  }, [])

  return (<ContrctContext.Provider value={{ accounts, contract }}>
    {children}
  </ContrctContext.Provider>)
}

export const useAdd = ({ accounts, contract }: { accounts: any, contract: any }) => {
  const add = useCallback(async (value) => {
    await contract.methods.add(Number(value)).send({ from: accounts[0] });
  }, [])
  return add
}

export const getLIst = async () => {
  /* const { accounts, contract } = this.state as { accounts: any, contract: any };
  const list: any[] = [];
  const len = await contract.methods.getLength().call();
  for (var i = 0; i < len; i++) {
    const aa = await contract.methods.lists(i).call()
    console.log(aa)
  }
  return list */
}
