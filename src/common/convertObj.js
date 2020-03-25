function convertObject(obj, assigned, deleted, newObjects, edit) {
	let finalObj = {};
	Object.assign(obj, {});
	assigned.forEach((ass) => {
		obj[ass] = ass;
	});

	for (let key in obj) {
		finalObj[key] = {
			elementType: newObjects.includes(key) ? 'Select' : key === 'logo' ? 'Avatar' : 'Input',

			elementConfig: {
				type:
					key === 'logo'
						? 'file'
						: key === 'password' || key === 'confirmPassword'
							? 'password'
							: key === 'date' ? 'datepicker' : key === 'theme' ? 'Color' : 'text',
				id: key,
				label: 'user.' + key,
				placeholder: key
			},
			validation: {
				required: edit ? false : true,
				isEmail: key === 'email' ? true : false,
				isFile: key === 'logo' ? true : false
			},
			value: edit ? (key === 'password' || key === 'confirmPassword' ? '' : obj[key]) : '',
			valid: edit ? true : false,
			touched: false,

			options:
				newObjects.includes(key) && key === 'status'
					? [ { label: 'Active', id: true }, { label: 'Not Active', id: false } ]
					: [ { label: 'reseller', id: 'reseller' }, { label: 'consumer', id: 'consumer' } ]
		};
	}

	deleted.forEach((item) => {
		delete finalObj[item];
	});
	return finalObj;
}

export default convertObject;
