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

JSX has some limitations:

-   Most attributes could be passed as we would with regular HTML attributes, but in other cases, we will need to pass them as we would when we write JavaScript, since as we know JSX is actually JavaScript. And so, this is why we pass `className` and not `class`, as this is the JavaScript way to pass a class on an HTML element.
-   We cannot `return` multiple nodes, all the code needs to be wrapped in a single root element, usually a `<div>`. React version 16+ does introduce a way to pass adjacent elements, but we will only touch this subject by the end of the course.

The `return` statement has parantheses because it allows us to create a single multi-line expression, that then we could structure like a normal HTML structure, and allow us to avoid errors.

## Creating a Functional Component (Section 3, lecture 30)

As stated before, React is all about building and working with components, and so this is what we will do now. WE will create a function based component (In contrast with the class based component we saw our root App component is made with).

For this, in the `src` folder we will add a new folder which will bear our component name, and inside will host the component .js file, which will also has the same name - `Person`. It is a convention to create a separate folder for each component, and name them with a capital first letter, and try to make the name as descriptive as possible. It is important to provide components a capital first letter since lower case tags are reserved for HTML code, and so to prevent errors and distinguish components, we will pass them with a capital first letter.

Inside the `Person.js` file, we will create a new functional component, which is also known as a 'dumb' component, since (up until React Hooks) does not hold its own state, but simply renders JSX. We can create it easily using the React snippets and passing `rface`, to immediately create an arrow function component, with the proper `import` and `export` statements. We don't `import` or use `Component` because we're not passing a class based Component, and so we do not need to `extend` the React `Component` superclass.

```js
import React from 'react';

const Person = () => {
	return <div />;
};

export default Person;
```

This will be the default skeleton of a functional component. inside the `return` statement we could pass JSX code. And so we could pass any valid DOM node that will be converted to HTML and presented in the DOM, as long as it is a single expression (a single Node or couple of elements wrapped inside a single node), and so we will just pass a `<p>` that has some text inside of it. Because it is a single line `return` statement, we won't need parentheses.

```js
import React from 'react';

const Person = () => {
	return <p>I'm a person component!</p>;
};

export default Person;
```

Now due to having the `export` statement, we could pass this component to different files, between different components, using the `import` statement to import the file from the `Person` folder. We will go ahead and insert it inside of the root App component, when we pass an HTML element that bears the component name, and since it does not nest any content or other components inside of it, we can make it a self-closing tag: `<Person />`.

```js
import Person from './Person/Person';

class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<Person />
				<img src={logo} alt="" style={{ height: 300, width: 300 }} />
			</div>
		);
	}
}
```

Now the page renders the `<p>` tag element to the DOM, having the text we passed between the `Person` component `<p>` tags.

## Working with Components & Re-using Them (Section 3, lecture 33)

Componenets are essentially a reusable pieces of code, where we should be able to use them throughout our app, as they all should be modular and independent. Keeping this in mind, we can simply pass our `Person` component as many times as we would like, and it we render out whatever we've input inside of its `return` statement. This makes the notion of building an app composed of many components more simple and awesome.

```js
class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<Person />
				<Person />
				<Person />
				<img src={logo} alt="" style={{ height: 300, width: 300 }} />
			</div>
		);
	}
}
```

## Outputing Dynamic Components (Section 3, lecture 34)

What if we want to pass some dynamic, JavaScript code into a component JSX so it will be displayed in the DOM? We can pass JavaScript expressions into component by passing valid JavaScript code between single curly braces. We can pass variables, functions, one line expressions etc, though we can't define a a JavaScript class inside of it or any complex expression like that.

```js
const Person = () => {
	return <p>I'm a person, I'm {Math.floor(Math.random() * 30)} years old</p>;
};
```

Now when we refresh the page, we will see each `Person` component has the string with a random number between 0 and 30.

## Working with Props (Section 3, lecture 35)
