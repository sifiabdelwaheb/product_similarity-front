function Incapacity(incapacityForm) {
	this.incapacityForm = incapacityForm;
}

export function relapseForm(edit, value) {
	console.log(value)
	return {
		beginDate: {
			elementType: 'Date',
			elementConfig: {
				type: 'text',
				label: 'Pack.beginDate'
				// prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
			},
			value: edit ? value && value.beginDate : '',
			validation: {
				required: true
			},
			valid: edit ? true : false,
			touched: false
		},
		endDate: {
			elementType: 'Date',
			elementConfig: {
				type: 'text',
				label: 'Pack.endDate'
				// prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
			},
			value: edit ? value && value.endDate : '',
			validation: {
				required: true
			},
			valid: edit ? true : false,
			touched: false
		},
		description: {
			elementType: 'Input',
			elementConfig: {
				type: 'text',
				label: 'user.description'
				// prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
			},
			value: edit? value.description : "",
			validation: {
				required: true
			},
			valid: edit ? true : false,
			touched: false
		}
	};
}
