const calculateBalance = transactions => {
	return transactions.reduce((total, { type, value }) => {
		if (type === 'INCOME') return total + value
		return total - value
	}, 0);
}

export {
	calculateBalance
}