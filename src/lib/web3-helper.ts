const Web3 = require('web3');

const Config = require('./config.json');
const ConfigRinkeby = require('./config.rinkeby.json');
const ConfigLocal = require('./config.local.json');

const GrowNYCContract = require('./contracts/GrowNYC.json');

export default class Web3Helper {


    public static getUserAddressPromise(web3: any): Promise<string> {
        if (web3 === null) {
            return Promise.resolve('');
        }
        return web3.eth.getAccounts().then(accounts => {
            return accounts[0];
        });
    }

    public static getCurrentNetworkPromise(web3: any): Promise<number> {
        if (web3 === null) {
            return Promise.resolve(-1);
        }
        return web3.eth.net.getId();
    }

    public static getGrowNYCContractAddressPromise(web3: any): Promise<string> {
        return this.getCurrentNetworkPromise(web3).then(networkId => {
            // merge object the right-most (last) object's value wins out:
            let addresses = { ...Config.GrowNYC, ...ConfigRinkeby.GrowNYC, ...ConfigLocal.GrowNYC };
            return addresses[networkId];
        });
    }

    public static getGrowNYCContractPromise(web3: any): Promise<any> {
        return this.getGrowNYCContractAddressPromise(web3).then(address => {
            let contract = new web3.eth.Contract(GrowNYCContract.abi, address);
            return contract;
        });
    }

}
