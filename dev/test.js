const blockChain = require('./blockChain');

const bitcoin = new blockChain();

bitcoin.createNewBlock(234234, 'sdfsd', 'dsfsdf');
bitcoin.createNewTransaction(100, 'Alexsgd', 'Shyamasdfsdf');
bitcoin.createNewTransaction(200, 'Blesgd', 'Rhyamasdfsdf');
bitcoin.createNewBlock(43534, 'sdgdf', 'ukuk');

bitcoin.createNewBlock(86786, 'tyjyj', 'wedwd');
bitcoin.createNewTransaction(2100, 'Alexsgd', 'Shyamasdfsdf');


console.log(bitcoin.proofOfWork());