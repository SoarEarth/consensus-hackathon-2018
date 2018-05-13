import Web3Helper from './web3-helper';
import { AdminInfo } from './model';

///////////////////
// LISTINGS INFO //
///////////////////
export function fetchAdminInfo(web3: any): Promise<AdminInfo> {
    let res: AdminInfo = {};
    let userAddressPromise = Web3Helper.getUserAddressPromise(web3);
    let growNYCPromise = Web3Helper.getGrowNYCContractPromise(web3);
    return Promise.all([growNYCPromise, userAddressPromise]).then(results => {
        let growNYCContract = results[0];
        res.userAddress = results[1];
        return growNYCContract.methods.owner().call();
    }).then(result => {
        res.owner = result;
        return res;
    });
}

export function submitFarmCode(web3: any, code: string, metadata: string): Promise<string> {
    let userAddressPromise = Web3Helper.getUserAddressPromise(web3);
    let growNYCPromise = Web3Helper.getGrowNYCContractPromise(web3);
    return Promise.all([growNYCPromise, userAddressPromise]).then(results => {
        let growNYCContract = results[0];
        let userAddress = results[1];
        let codeHex = web3.utils.utf8ToHex(code);
        let metadataHex = web3.utils.utf8ToHex(metadata);
        return growNYCContract.methods.farm(codeHex, metadataHex).send({ from: userAddress });
    }).then(result => {
        return result.transactionHash;
    });
}

export function submitWarehouseCode(web3: any, code: string, metadata: string): Promise<string> {
    let userAddressPromise = Web3Helper.getUserAddressPromise(web3);
    let growNYCPromise = Web3Helper.getGrowNYCContractPromise(web3);
    return Promise.all([growNYCPromise, userAddressPromise]).then(results => {
        let growNYCContract = results[0];
        let userAddress = results[1];
        let codeHex = web3.utils.utf8ToHex(code);
        let metadataHex = web3.utils.utf8ToHex(metadata);
        return growNYCContract.methods.warehouse(codeHex, metadataHex).send({ from: userAddress });
    }).then(result => {
        return result.transactionHash;
    });
}

export function submitRetailCode(web3: any, code: string, metadata: string): Promise<string> {
    let userAddressPromise = Web3Helper.getUserAddressPromise(web3);
    let growNYCPromise = Web3Helper.getGrowNYCContractPromise(web3);
    return Promise.all([growNYCPromise, userAddressPromise]).then(results => {
        let growNYCContract = results[0];
        let userAddress = results[1];
        let codeHex = web3.utils.utf8ToHex(code);
        let metadataHex = web3.utils.utf8ToHex(metadata);
        return growNYCContract.methods.retail(codeHex, metadataHex).send({ from: userAddress });
    }).then(result => {
        return result.transactionHash;
    });
}
