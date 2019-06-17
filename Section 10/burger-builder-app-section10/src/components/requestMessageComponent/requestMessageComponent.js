import React, { Component } from 'react';
import Modal from '../UI/Modal/Modal';
import styles from './requestMessageComponent.module.css';

const requestMessageComponent = (WrappedComponent, axiosInstance) => {
	return class extends Component {
		constructor() {
			super();
			// Used to catch errors upon getting data from the database on app load:
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
		}

		state = {
			error: null,
			responseStatus: false,
		};

		componentDidMount() {
			axiosInstance.interceptors.request.use(request => {
				this.setState({
					error: null,
				});
				return request;
			});
			axiosInstance.interceptors.response.use(
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
