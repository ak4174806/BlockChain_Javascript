const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockChain');
const uuid = require('uuid/v1');

const nodeAddress = uuid().split('-').join('');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

let bitcoin = new Blockchain();

app.get('/blockchain', function (req, res) {

    res.send(bitcoin);
});

app.post('/transaction', function (req, res) {

    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.receiver);
    res.json({
        note: 'Transaction will be added in block ${blockIndex}'
    });


});

app.get('/mine', function (req, res) {

    const lastBlock = bitcoin.getLastBlock();
    const previouBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    }
    //proofOfWork will return the nonce at which it is found
    const nonce = bitcoin.proofOfWork(previouBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previouBlockHash, currentBlockData, nonce);
    bitcoin.createNewTransaction(12.5, "00", nodeAddress);
    const newBlock = bitcoin.createNewBlock(nonce, previouBlockHash, blockHash);

    res.json({
        note: "New block mined successfully",
        block: newBlock
    });
});

app.listen(3000, function () {
    console.log('listening on 3000...');
});