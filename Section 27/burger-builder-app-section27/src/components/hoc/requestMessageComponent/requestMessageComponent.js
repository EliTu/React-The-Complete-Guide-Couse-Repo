import React, { Component } from 'react';
import Modal from '../../UI/Modal/Modal';
import styles from './requestMessageComponent.module.css';

const requestMessageComponent = (WrappedComponent, axiosInstance) => {
	return class extends Component {
		state = {
			error: null,
			responseStatus: false,
		};

		componentDidMount() {
			this.requestInterceptor = axiosInstance.interceptors.request.use(
				request => {
					this.setState({
						error: null,
					});
					return request;
				}
			);

			this.responseInterceptor = axiosInstance.interceptors.response.use(
				res => {
					this.setState({
						responseStatus: res.status === 200 ? true : false,
					});
				},
				error => {
					this.setState({
						error: error,
					});
				}
			);
		}

		componentWillUnmount() {
			// Remove the interceptors upon unmounting the component
			axiosInstance.interceptors.response.eject(this.responseInterceptor);
			axiosInstance.interceptors.request.eject(this.requestInterceptor);
		}

		handleErrorConfirmClick = () => {
			this.setState({
				error: null,
				responseStatus: false,
			});
		};

		handleButton;

		render() {
			// State:
			const { error, responseStatus } = this.state;

			// CSS Modules styles:
			const { ErrorText, confirmationText } = styles;

			const errorMessage = error ? (
				<p className={ErrorText}>
					Oops! Something went wrong :\
					<span>({error.message})</span>
				</p>
			) : null;

			const confirmationMessage = responseStatus ? (
				<p className={confirmationText}>Received</p>
			) : null;

			return (
				<>
					<Modal
						show={error || responseStatus}
						closeModalHandler={this.handleErrorConfirmClick}
					>
						{confirmationMessage}
						{errorMessage}
					</Modal>
					<WrappedComponent {...this.props} />
				</>
			);
		}
	};
};
export default requestMessageComponent;
