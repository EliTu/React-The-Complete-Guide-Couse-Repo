# Section 3 - Understanding the Base Features & Syntax

## Using Create React App (Section 3, lecture 26)

After installation we pass `create-react-app` in the folder where we would like to set up a new React project, and then pass on the name of the project, in our case it will be `section-3-app`. Because we want the file structure to be the same Max has in the course, we will also pass the flag `--scripts-version 1.1.5`, which will set the outputted files to be specific and matching to those that Max will go over (Though this is not a downgrade in the React version, we still use the latest one). After the installation has finished, we will enter the folder and type `npm start` to run the dev server.

## Understanding Components Basics (Section 3, lecture 28)

After we've adjusted the initial files that we get with the Create React App, we can start understanding what we actually see. What we will always see in React are components, and the core idea of React is creating UI using components, and so this is what a class based component looks like:

```js
class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<img src={logo} alt="" style={{ height: 300, width: 300 }} />
			</div>
		);
	}
}
```

These components are almost like some custom HTML elements, but actually they are all syntactic sugar that will be compiled to valid JavaScript by Babel.

We currently have 2 .js files, the App.js and index.js. The index.js file is the file that registers React to one root component, in our case and many other cases, it'll be a `<div>` with the id of `root`, where inside we will nest all other components we create using React. It is possible to be done thanks to the `ReactDOM` library that we `import` from, which will basically parse the React code to the DOM.

```js
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

The `App` component that we saw above is our first and main component that will host other components we create. It is a class based component since it is created as subclass that inherits from the `Component` of the main React library, that we `import` from the node_modules, with the `extends` keyword.

```js
import React, { Component } from 'react';
```

Every component has a `render` function that returns JSX code, which will in turn be rendered to the DOM. All the JSX will be nested inside a single parent element, since the `return` statement can only return a single expression, and so all the content needs to be nested within a single parent node. The JSX allows us to "write HTML" using JavaScript code

## Understanding JSX (Section 3, lecture 29)

We need to understand that JSX in the end of the day is simply a JavaScript code, while the HTML-like look is basically a syntactic sugar that makes it more comfortable to write code in React.

What we see as this:

```js
render() {
    return (
        <div className="App">
            <h1>Hi, I'm a React App</h1>
        </div>
    )
}
```

Will actually be compiled to this JavaScript code:

```js
render() {
    return React.createElement(
        'div',
        { className: 'App' },
        React.createElement('h1', null, 'Hi, I\'m a React App')
    );
}
```

We can do this thanks to the `React` library we're importing, and it is important to use it when writing JSX, even though we're not specifically passing it anywhere in our code, but at compile time it is used to access the `createElement` method, that allows us to create the DOM nodes.

## JSX Restrictions (Section 3, lecture 29)
