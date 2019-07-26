import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/containers/Layout/Layout';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './components/containers/Checkout/Checkout';
import Orders from './components/containers/Orders/Orders';
import About from './components/display/About/About';
import SignUp from './components/containers/Authentication/SignUp/SignUp';
import SignIn from './components/containers/Authentication/SignIn/SignIn';
import { authCheckLoginState } from './components/containers/Authentication/store/actions';
import PropTypes from 'prop-types';

function App({ tryAutoSignIn, isLoggedIn }) {
	// If a token is available in localStorage, try to login upon App mount
	useEffect(() => {
		tryAutoSignIn();
	}, [tryAutoSignIn]);

	return (
		<div>
			<Router>
				<Layout>
					<SignIn />
					<Switch>
						{isLoggedIn && (
							<Route path="/checkout" component={Checkout} />
						)}
						<Route path="/orders" component={Orders} />
						<Route path="/about" component={About} />
						<Route path="/signup" component={SignUp} />
						<Route path="/" component={BurgerBuilder} />
					</Switch>
				</Layout>
			</Router>
		</div>
	);
}

App.propTypes = {
	isLoggedIn: PropTypes.bool,
	tryAutoSignIn: PropTypes.func,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		tryAutoSignIn: () => dispatch(authCheckLoginState()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
