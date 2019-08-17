const ordersControlForm = {
	data: 'sortBy',
	elementType: 'select',
	elementConfig: {
		options: [
			{
				value: 'newest',
				displayValue: 'Newest',
			},
			{ value: 'oldest', displayValue: 'Oldest' },
			{ value: 'price', displayValue: 'Price' },
			{ value: 'delivery', displayValue: 'Delivery method' },
		],
		label: 'Sort orders by:',
	},
	value: 'newest',
	validation: {
		required: true,
		valid: true,
		errorMessage: '',
	},
};

export default ordersControlForm;
