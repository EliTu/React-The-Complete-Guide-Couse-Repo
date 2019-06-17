import React, { Component } from 'react';
import Modal from '../UI/Modal/Modal';
import styles from './withErrorHandler.module.css';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
	return class extends Component {
		state = {
			error: null,
		};

		componentDidMount() {
			axiosInstance.interceptors.request.use(request => {
				this.setState({
					error: null,
				});
				return request;
			});
			axiosInstance.interceptors.response.use(
				res => res,
				error => {
					this.setState({
						error: error,
					});
				}
			);

			setTimeout(() => {
				if (this.state.error) {
					this.setState({
						error: null,
					});
				}
			}, 9000);
		}

		handleErrorConfirmClick = () => {
			this.setState({
				error: null,
			});
		};

		render() {
			// State:
			const { error } = this.state;

			// CSS Modules styles:
			const { ErrorText } = styles;

			const errorMessage = error ? (
				<p className={ErrorText}>
					Oops! Something went wrong :\
					<span>({error.message})</span>
				</p>
			) : null;

			return (
				<>
					<Modal
						show={this.state.error}
						closeModalHandler={this.handleErrorConfirmClick}
					>
						{errorMessage}
					</Modal>
					<WrappedComponent {...this.props} />
				</>
			);
		}
	};
};
export default withErrorHandler;
