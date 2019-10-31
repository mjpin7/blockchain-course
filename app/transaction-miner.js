const Transaction = require('../wallet/transaction');

class TransactionMiner {
    constructor({ blockchain, transactionPool, wallet, pubsub }) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;
    }

    mineTransactions() {
        const validTransactions = this.transactionPool.validTransactions();

        // Generate miners reward
        validTransactions.push(Transaction.rewardTransaction({ minerWallet: this.wallet }));

        // Add a block consisting of these transactions to blockchain
        this.blockchain.addBlock({ data: validTransactions });

        // Broadcast updated chain
        this.pubsub.broadcastChain();

        // Clear the transaction pool
        this.transactionPool.clear();
    }
}

module.exports = TransactionMiner;