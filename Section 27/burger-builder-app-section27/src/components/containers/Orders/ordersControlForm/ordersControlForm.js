const ordersControlForm = {
	data: 'sortBy',
	elementType: 'select',
	elementConfig: {
		options: [
			{
				value: 'NEWEST',
				displayValue: 'Newest',
			},
			{ value: 'OLDEST', displayValue: 'Oldest' },
			{ value: 'PRICE', displayValue: 'Price' },
			{ value: 'DELIVERY', displayValue: 'Delivery method' },
		],
		label: 'Sort orders by:',
	},
	value: '',
	validation: {
		required: true,
		valid: true,
		errorMessage: '',
	},
};

export default ordersControlForm;
