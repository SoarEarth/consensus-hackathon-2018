import Web3Helper from './web3-helper';
import { AdminInfo, GrowNYCEvent, Metadata } from './model';

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

export function submitFarmCode(web3: any, code: string, metadata: Metadata): Promise<string> {
    let userAddressPromise = Web3Helper.getUserAddressPromise(web3);
    let growNYCPromise = Web3Helper.getGrowNYCContractPromise(web3);
    return Promise.all([growNYCPromise, userAddressPromise]).then(results => {
        let growNYCContract = results[0];
        let userAddress = results[1];
        let codeHex = web3.utils.utf8ToHex(code);
        let metadataString = JSON.stringify(metadata);
        return growNYCContract.methods.farm(codeHex, metadataString).send({ from: userAddress });
    }).then(result => {
        return result.transactionHash;
    });
}

export function submitWarehouseCode(web3: any, code: string, metadata: Metadata): Promise<string> {
    let userAddressPromise = Web3Helper.getUserAddressPromise(web3);
    let growNYCPromise = Web3Helper.getGrowNYCContractPromise(web3);
    return Promise.all([growNYCPromise, userAddressPromise]).then(results => {
        let growNYCContract = results[0];
        let userAddress = results[1];
        let codeHex = web3.utils.utf8ToHex(code);
        let metadataString = JSON.stringify(metadata);
        return growNYCContract.methods.warehouse(codeHex, metadataString).send({ from: userAddress });
    }).then(result => {
        return result.transactionHash;
    });
}

export function submitRetailCode(web3: any, code: string, metadata: Metadata): Promise<string> {
    let userAddressPromise = Web3Helper.getUserAddressPromise(web3);
    let growNYCPromise = Web3Helper.getGrowNYCContractPromise(web3);
    return Promise.all([growNYCPromise, userAddressPromise]).then(results => {
        let growNYCContract = results[0];
        let userAddress = results[1];
        let codeHex = web3.utils.utf8ToHex(code);
        let metadataString = JSON.stringify(metadata);
        return growNYCContract.methods.retail(codeHex, metadataString).send({ from: userAddress });
    }).then(result => {
        return result.transactionHash;
    });
}

export function getEventsForCode(web3: any, code: string): Promise<GrowNYCEvent[]> {
    let growNYCPromise = Web3Helper.getGrowNYCContractPromise(web3);
    return new Promise((resolve, reject) => { 
        Promise.resolve(growNYCPromise).then(instance => {
            let codeHex = web3.utils.utf8ToHex(code);
            instance.getPastEvents(
                'GrowNYCEvent',
                {
                    filter: { code: codeHex },
                    fromBlock: 0,
                    toBlock: 'latest'
                },
                (error, events) => {
                    if(error) {
                        resolve([]);
                    } else {
                        let result = events.map(e => mapGrowNYCEvent(e, web3));
                        resolve(result);
                    }
                });
        })
    })
}

function mapGrowNYCEvent(e: any, web3: any) : GrowNYCEvent {
    console.log(e)
    let value: GrowNYCEvent = {
        timestampInSeconds: e.returnValues.timestamp,
        metadata: e.returnValues.metadata,
        sender: e.returnValues.user,
        order: e.returnValues.order
    };
    return value;
}
