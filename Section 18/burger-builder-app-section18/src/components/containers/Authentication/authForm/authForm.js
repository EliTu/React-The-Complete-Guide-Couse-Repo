const authForm = [
	{
		data: 'userName',
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Enter username',
			label: '*Username:',
		},
		value: '',
		validation: {
			required: true,
			hasUserInput: false,
			valid: false,
			errorMessage: 'Please a valid username',
		},
	},

	{
		data: 'password',
		elementType: 'input',
		elementConfig: {
			type: 'password',
			placeholder: 'Enter password',
			label: '*Password',
		},
		value: '',
		validation: {
			required: true,
			hasUserInput: false,
			valid: false,
			minLength: 6,
			maxLength: 12,
			errorMessage: 'Please enter a valid password',
		},
	},

	{
		data: 'email',
		elementType: 'input',
		elementConfig: {
			type: 'email',
			placeholder: 'Enter your email',
			label: '*Email:',
		},
		value: '',
		validation: {
			required: true,
			emailValidationRegExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			hasUserInput: false,
			valid: false,
			errorMessage: 'Please enter a valid email address',
		},
	},
];

export default authForm;
