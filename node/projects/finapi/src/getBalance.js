module.exports = {
    getBalance: function(costumer) {
        const { statement } = costumer;
        const balance = statement
            .map(s => s.type == 'credit'? s.amount: s.amount * -1)
            .reduce((value, total) => value + total, 0);
        return balance;
    }
}
