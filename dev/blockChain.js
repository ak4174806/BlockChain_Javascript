const sha = require('sha256');
//constructor function for creating blockchain object
//we do not use class as class is just sugar coated on top of constructor function
//internally it is constructor function along with prototype

function Blockchain() {
    this.chain = [];
    this.pendingTransactions = [];

    //genesis block i..e first block
    this.createNewBlock(100, 'sdgsg', 'asfnhkafd');

}
Blockchain.prototype.createNewBlock = function (nonce, previouBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        previouBlockHash: previouBlockHash
    }
    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
}

Blockchain.prototype.getLastBlock = function () {
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function (amount, sender, receiver) {
    const newTransaction = {
        sender: sender,
        amount: amount,
        receiver: receiver
    }
    this.pendingTransactions.push(newTransaction);
    //return the index of the block in which this transaction will be pushed
    return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function (previouBlockHash, currentBlockData, nonce) {
    const dataAsString = previouBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha(dataAsString);
    return hash;
}

Blockchain.prototype.proofOfWork = function (previouBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(previouBlockHash, currentBlockData, nonce);
    while (hash.substring(0, 4) !== '0000') {
        nonce++;
        hash = this.hashBlock(previouBlockHash, currentBlockData, nonce);
    }
    return nonce;
}

module.exports = Blockchain;