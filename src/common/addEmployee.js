function addEmployee(edit, value) {
	return {
		firstName: {
			elementType: 'Input',
			elementConfig: {
				type: 'text',
				label: 'user.firstName'
				// prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
			},
			value: edit ? value.firstName : '',
			validation: {
				required: true
			},
			valid: edit ? true : false,
			touched: false
		},
		lastName: {
			elementType: 'Input',
			elementConfig: {
				type: 'text',
				label: 'user.lastName'
				// prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
			},
			value: edit ? value.lastName : '',
			validation: {
				required: true
			},
			valid: edit ? true : false,
			touched: false
		},
		email: {
			elementType: 'Input',
			elementConfig: {
				type: 'email',
				label: 'user.email'
				// prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
			},
			value: edit ? value.email : '',
			validation: {
				required: true,
				isEmail: true
			},
			valid: edit ? true : false,
			touched: false
		},
		code: {
			elementType: 'Input',
			elementConfig: {
				type: 'text',
				label: 'user.code'
				// prefix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
			},
			value: edit && value.code ? value.code : '',
			validation: {
				required: true
			},
			valid: edit ? true : false,
			touched: false
		},

		phone: {
			elementType: 'Input',
			elementConfig: {
				type: 'text',
				label: 'user.phone'
				// prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
			},
			value: edit ? value.phone : '',
			validation: {
				required: true
			},
			valid: edit ? true : false,
			touched: false
		},
		priorNotice: {
			elementType: 'Input',
			elementConfig: {
				type: 'text',
				label: 'user.priorNotice'
				// prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
			},
			value: edit ? value && value.priorNotice : '',
			validation: {
				required: true
			},
			valid: edit ? true : false,
			touched: false
		},
		beginDateRestitution: {
			elementType: 'Date',
			elementConfig: {
				type: 'text',
				label: 'user.beginDateRestitution'
				// prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
			},
			value: edit ? value && value.beginDateRestitution : '',
			validation: {
				required: true
			},
			valid: edit ? true : false,
			touched: false
		},
		beginDateContract: {
			elementType: 'Date',
			elementConfig: {
				type: 'text',
				label: 'user.beginDateContract'
				// prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
			},
			value: edit ? value && value.beginDateContract : '',
			validation: {
				required: true
			},
			valid: edit ? true : false,
			touched: false
        },
        nbDaysLeaveRestitution: {
			elementType: 'Input',
			elementConfig: {
				type: 'text',
				label: 'user.nbDaysLeaveRestitution'
				// prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
			},
			value: edit ? value && value.nbDaysLeaveRestitution : '',
			validation: {
				required: true
			},
			valid: edit ? true : false,
			touched: false
		},
		status: {
			elementType: 'Select',
			elementConfig: {
				type: 'text',
				label: 'user.status'
				// prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
			},
			value: '',
			validation: {
				required: true
			},
			valid: edit ? true : false,
			touched: false,
			options: [ { label: 'active', id: 'true' }, { label: 'not active', id: 'false' } ]
		}
	};
}

export default addEmployee;
