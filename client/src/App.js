import React, { Component } from "react";
import SimpleStorageContract from "./contracts/TodolistDemo.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, list: [], value: "" };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.getList();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();
    const response = await contract.methods.getLength().call();


    // Update state with the result.
    this.setState({ storageValue: response });
  };

  getList = async () => {
    const { contract } = this.state;
    const len = await contract.methods.getLength().call();
    for (var i = 0; i < len; i++) {
      const aa = await contract.methods.lists(i).call()
      console.log(aa)
    }
  }

  add = async (value) => {
    const { accounts, contract } = this.state;
    // Stores a given value, 5 by default.
    await contract.methods.add(Number(value)).send({ from: accounts[0] });

    const response = await contract.methods.getLength().call();
    this.getList();

    // Update state with the result.
    this.setState({ storageValue: response });

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();
    //const response = await contract.methods.beforeDeleteId;

    // Update state with the result.
    //this.setState({ storageValue: response });
  };

  done = async (value) => {
    const { accounts, contract } = this.state;
    // Stores a given value, 5 by default.
    await contract.methods.done(Number(value)).send({ from: accounts[0] });

    const response = await contract.methods.getLength().call();
    this.getList();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  remove = async (value) => {
    const { accounts, contract } = this.state;
    // Stores a given value, 5 by default.
    await contract.methods.remove(Number(value)).send({ from: accounts[0] });

    const response = await contract.methods.getLength().call();
    this.getList();

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

export default App;
