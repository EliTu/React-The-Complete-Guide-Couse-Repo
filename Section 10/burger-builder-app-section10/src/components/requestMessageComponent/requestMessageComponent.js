import React, { Component } from 'react';
import Modal from '../UI/Modal/Modal';
import styles from './requestMessageComponent.module.css';

const requestMessageComponent = (WrappedComponent, axiosInstance) => {
	return class extends Component {
		constructor() {
			super();
			// Used to catch errors upon getting data from the database on app load:
			this.errorCheckInterceptor = axiosInstance.interceptors.response.use(
				res => res,
				error => {
					this.setState({
						error: error,
					});
				}
			);
		}

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
					console.log(this.state.responseStatus);
				},
				error => {
					this.setState({
						error: error,
					});
				}
			);
		}

		componentWillUnmount() {
			// Remove the interceptors upon unmounting the Burger component
			axiosInstance.interceptors.response.eject(
				this.errorCheckInterceptor,
				this.responseInterceptor
			);
			axiosInstance.interceptors.request.eject(this.requestInterceptor);
		}

		handleErrorConfirmClick = () => {
			this.setState({
				error: null,
				responseStatus: false,
			});
		};

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
				<p className={confirmationText}>
					Your order has been received!
				</p>
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
