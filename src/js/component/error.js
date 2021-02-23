import React from "react";
import PropTypes from "prop-types";

export function Error(props) {
	return (
		<div
			className="alert alert-danger alert-dismissible fade show"
			role="alert">
			{props.textError}
			<button
				type="button"
				className="close"
				data-dismiss="alert"
				aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	);
}

Error.propTypes = {
	textError: PropTypes.string
};
