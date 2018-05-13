import Web3Helper from './web3-helper';
import { AdminInfo } from './model';

///////////////////
// LISTINGS INFO //
///////////////////
export function fetchAdminInfo(web3: any): Promise<AdminInfo> {
    let res: AdminInfo = { };
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
