const authForm = [
	{
		data: 'username',
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Enter a username',
			label: 'Username:',
		},
		value: '',
		validation: {
			required: true,
			hasUserInput: false,
			valid: false,
			minLength: 6,
			maxLength: 12,
			errorMessage:
				'Please a valid username (must be 6 to 12 characters)',
		},
	},

	{
		data: 'password',
		elementType: 'input',
		elementConfig: {
			type: 'password',
			placeholder: 'Enter a password',
			label: 'Password:',
		},
		value: '',
		validation: {
			required: true,
			hasUserInput: false,
			valid: false,
			minLength: 6,
			maxLength: 12,
			errorMessage:
				'Please enter a valid password (must be 6 to 12 characters)',
		},
	},

	{
		data: 'email',
		elementType: 'input',
		elementConfig: {
			type: 'email',
			placeholder: 'Enter an email',
			label: 'Email:',
		},
		value: '',
		validation: {
			required: true,
			emailValidationRegExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			hasUserInput: false,
			valid: false,
			errorMessage:
				'Please enter a valid email address (e.g: myemail@mail.com)',
		},
	},
];

export default authForm;
