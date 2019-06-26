const OrderFormData = [
	{
		data: 'name',
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Enter your name',
			label: 'Name:',
		},
		value: '',
	},

	{
		data: 'phone',
		elementType: 'input',
		elementConfig: {
			type: 'number',
			placeholder: 'Enter your phone number',
			label: 'Phone number:',
		},
		value: '',
	},

	{
		data: 'email',
		elementType: 'input',
		elementConfig: {
			type: 'email',
			placeholder: 'Enter your email',
			label: 'Email:',
		},
		value: '',
	},

	{
		data: 'address',
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Enter your address',
			label: 'Address:',
		},
		value: '',
	},

	{
		data: 'postal',
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Enter your postal code',
			label: 'Postal:',
		},
		value: '',
	},

	{
		data: 'deliveryMethod',
		elementType: 'select',
		elementConfig: {
			options: [
				{ value: 'fastest', displayValue: 'Fastest' },
				{ value: 'cheapest', displayValue: 'Cheapest' },
			],
			label: 'Delivery Method:',
		},
		value: '',
	},
];

export default OrderFormData;
