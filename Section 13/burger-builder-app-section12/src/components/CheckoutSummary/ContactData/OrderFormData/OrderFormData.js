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
		validation: {
			required: true,
			valid: false,
		},
	},

	{
		data: 'phone',
		elementType: 'input',
		elementConfig: {
			type: 'number',
			min: 0,
			placeholder: 'Enter your phone number',
			label: 'Phone number:',
		},
		value: '',
		validation: {
			required: true,
			valid: false,
		},
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
		validation: {
			required: true,
			emailValidation: {
				regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			},
			valid: false,
		},
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
		validation: {
			required: true,
			valid: false,
		},
	},

	{
		data: 'postal',
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Enter your postal code',
			label: 'Postal code:',
		},
		value: '',
		validation: {
			required: true,
			valid: false,
		},
	},

	{
		data: 'deliveryMethod',
		elementType: 'select',
		elementConfig: {
			options: [
				{
					value: 'fastest',
					displayValue: 'Fastest',
				},
				{ value: 'cheapest', displayValue: 'Cheapest' },
			],
			label: 'Delivery Method:',
		},
		value: 'fastest',
		validation: {
			required: true,
			valid: false,
		},
	},

	{
		data: 'requests',
		elementType: 'textarea',
		elementConfig: {
			type: 'textarea',
			placeholder:
				'Please specify any additional requests or comments you might have',
			label: 'Additional requests:',
		},
		value: '',
		validation: {
			required: false,
			valid: true,
		},
	},
];

export default OrderFormData;
