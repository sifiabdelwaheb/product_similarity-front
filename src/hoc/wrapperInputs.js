import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { checkValidity } from '../common/checkValidity';
import moment from 'moment';
function WrapperInputs(Wrapped) {
	return function Inputs(props) {
		const [ formState, setForm ] = useState(props.form);
		// useEffect(() => {
		//   if (props.loaded && props.ref && props.ref.current

		//     ) {
		//     Object.keys(props.form).forEach(object => {
		//       props.form[object].value = "";
		//     });
		//     setForm(props.form);
		//   }
		//   // eslint-disable-next-line react-hooks/exhaustive-deps
		// }, [props.loaded]);

		function renderInputs() {
			const arr = [];
			Object.keys(formState).forEach((item) => {
				arr.push({
					id: item,
					element: formState[item]
				});
			});
			return arr.map((item) => {
        console.log("itemsss0",item.element.elementType)
				return (
					<Wrapped
						key={item.id}
						value={item.element.value}
						elementConfig={item.element.elementConfig}
						elementType={item.element.elementType}
						label={item.element.elementConfig.label}
						clicked={props.clicked}
						edit={props.edit}
						onChange={(e) => onChange(e, formState, item.id, setForm, props.setValidation, props.setClick)}
						valid={item.element.valid}
						// error={item.element.valid}
						type={item.element.elementConfig.type}
						options={item.element.options}
						imagePreviewUrl={props.imagePreviewUrl}
					/>
				);
			});
		}
		return (
			<Fragment>
				{renderInputs()}

				<div className="d-flex justify-content-between align-items-center">
					{/* {login && (
                          <Link to={`/user/forgot-password`}>
                            <IntlMessages id="user.forgot-password-question" />
                          </Link>
                        )} */}

					{props.children}
					{props.error && <p style={{ color: 'red' }}>{props.errorMessage}</p>}
				</div>
			</Fragment>
		);
	};
}
const onChange = (e, state, inputIdentifier, setForm, setValidation, setClick) => {
	// e.preventDefault();

	const formElement = { ...state };
	const spredValue = formElement[inputIdentifier];

	spredValue.value =
		formElement[inputIdentifier].elementType === 'Select'
			? { label: e.label, value: e.id || '' }
			: formElement[inputIdentifier].elementType === 'Date'
				? moment(e._d).format()
				: formElement[inputIdentifier].elementType === 'Theme' ||
					formElement[inputIdentifier].elementType === 'Avatar'
					? e
					: e.target.value;
	spredValue.touched = true;
	spredValue.valid =
		formElement[inputIdentifier].elementType === 'Select' || formElement[inputIdentifier].elementType === 'Date'
			? {}
			: checkValidity(
					formElement[inputIdentifier].elementType === 'Theme' ||
					formElement[inputIdentifier].elementType === 'Avatar'
						? e
						: e.target.value,
					spredValue.validation
				);
	let formIsvalid = true;
	for (let key in formElement) {
		formIsvalid = formElement[key].valid && formIsvalid;
	}
	setForm(formElement);
	setValidation(formIsvalid);
	setClick(false);
};

WrapperInputs.propTypes = {
	Wrapped: PropTypes.element.isRequired,
	form: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.element.isRequired,
	textButton: PropTypes.string.isRequired,
	setFormEdit: PropTypes.func
};
WrapperInputs.defaultProps = {
	Wrapped: React.createElement('div'),
	form: {},
	onClick: () => {},
	children: React.createElement('div'),
	textButton: 'click me',
	setFormEdit: () => {}
};
export default WrapperInputs;
