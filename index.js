const args = process.argv.slice(2);

const Web3 = require('web3');
const web3 = new Web3("https://mainnet.infura.io/");

const moment = require('moment');

const getBlockNumber = async () => {
    return new Promise((resolve, reject) => {
        web3.eth.getBlockNumber((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

const getBlock = async (number) => {
    return new Promise((resolve, reject) => {
        web3.eth.getBlock(number, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    });
}

const run = async () => {
    const blockNumber = await getBlockNumber();
    const block = await getBlock(blockNumber);
    const currentBlockTime = moment(block.timestamp * 1000);
    console.log(`current block number: \t${blockNumber} -> ${currentBlockTime.format()}`);

    const blockDistance = 15;
    const futureTime = moment(args[0]);
    const futureBlockNumber = blockNumber + Math.round(((futureTime.unix() - currentBlockTime.unix()) / blockDistance));
    console.log(`future block number: \t${futureBlockNumber} -> ${futureTime.format()}`);
}

run();