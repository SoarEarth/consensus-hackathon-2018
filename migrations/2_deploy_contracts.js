var GrowNYC = artifacts.require("./GrowNYC.sol");
var fs = require('fs');

/*
* This script is only for local development. For other deployments needs to be updated.
*/
module.exports = function (deployer) {
  deployer.deploy(GrowNYC).then(result => {
    let networkId = web3.version.network;
    let updateConfigPromise;
    switch (networkId) {
      case '5777':
        updateConfigPromise = updateLocalConfigFilePromise()
    };
    let updateGrowNYC = updateContractAbi(GrowNYC);
    return Promise.all([updateConfigPromise, updateGrowNYC]);
  });
};


function updateLocalConfigFilePromise() {
  let configFile = {
    "GrowNYC": {
      "5777": GrowNYC.address
    }
  };
  return writeObjectInFile(configFile, "./src/lib/config.local.json");
}

function writeObjectInFile(object, path) {
  return new Promise(function (resolve, reject) {
    let jsonString = JSON.stringify(object, null, 4);
    fs.writeFile(path, jsonString, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve()
      }
    });
  });
}

function updateContractAbi(contract) {
  let file = {
    "contractName": contract.contractName,
    "abi": contract.abi
  };
  return writeObjectInFile(file, "./src/lib/contracts/" + contract.contractName + ".json");
}