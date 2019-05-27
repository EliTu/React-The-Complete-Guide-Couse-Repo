# Section 4 - Working with Lists and Conditionals 

## Rendering Content Conditionally (Section 4, lecture 51)

Let's say we want to output content conditionally when we click on the button that we have assigned earlier to switch names. This means, that until we will click on this button, React will not render the 3 `<Person>` components and only upon a click of the button will we output them to the DOM.

First of all, we would like to wrap all of the `<Person>` elements in a `<div>`, and place this wrapping `<div>` between two curly braces so it will become a JavaScript expression, that later we could hide/show through a conditional statement.

```js
return (
        {
            <div>
                <Person
                    name={this.state.persons[0].name}
                    age={this.state.persons[0].age}
                >
                    is a Future Programmer
                </Person>
                <Person
                    name={this.state.persons[1].name}
                    age={this.state.persons[1].age}
                    click={this.clickHandler.bind(this, 'kewliyo')}
                    change={this.handleNameChange}
                >
                    is a Future MD
                </Person>
                <Person
                    name={this.state.persons[2].name}
                    age={this.state.persons[2].age}
                />
            </div>
        }
);
```

Then we will add a boolean property to our state, by default set it to `false`. We can use this boolean property as a flag, as long as it is set to `false`, the `<div>` will not be rendered to the UI, switching it to `true` will show the `<div>` with all the `<Person>` elements.

```js
state = {
		persons: [
			{
				name: 'Eliad',
				age: 27,
			},
			{
				name: 'Jakob',
				age: 27,
			},
			{
				name: 'Ada',
				age: 21,
			},
		],
		showPersons: false,
	};
```

### JSX and rendering dynamically with conditional expressions

In other JavaScript frameworks, like Vue for example we could use a directive like `v-if` to show/hide elements dynamically, but in React we use pure JavaScript to do that. JSX looks like HTML but it is in fact a pure JavaScript code, thanks to the `React` code we're importing to the app, it will be converted to `React.createElement()`, and so we need to remember that all this time we're writing and outputing JavaScript code. Keeping this in mind, we know we could pass other JavaSCript code into the JSX code to dynamically show/hide the elements we specify, and so into the curly braces we set earlier, we could input a conditional ternary operator to check if `showPersons` is set to `true` or `false`.

We pass the ternary operator right before the code we want to condionally render, basically setting the `true` condition to render the whole JSX block of our choosing, and for the `false` condition we return a `null`, basically not rendering anything as long as we have a `false`.

```js
{
    this.state.showPersons ? (
        <div>
            <Person
                name={this.state.persons[0].name}
                age={this.state.persons[0].age}
            >
                is a Future Programmer
            </Person>
            <Person
                name={this.state.persons[1].name}
                age={this.state.persons[1].age}
                click={this.clickHandler.bind(this, 'kewliyo')}
                change={this.handleNameChange}
            >
                is a Future MD
            </Person>
            <Person
                name={this.state.persons[2].name}
                age={this.state.persons[2].age}
            />
        </div>
    ) : null
    }
```

This way we make use of the fact we're working with pure JavaScript, both to output a JavaScript expression to check for condition and to display other JavaScript when the condition checks. The ternary operator will return a `React.createElement` method block if the condition checks, and not really a JSX code.

Now for the last step, we set the `clickHandler` callback function to set the state of the `showPersons` boolean property upon a click.

```js
clickHandler = () => {
    let showPersonBool = this.state.showPersons;
    this.setState({
        showPersons: !showPersonBool,
    });
};
```

We set this callback function inside the `onClick` event listener on the `<button>` tag as we did before. In turn, when we load the page we see that the `<Person>` tags are missing, and if we open the dev tools, we can see that these elements are not hidden, but not rendered on the page entirely. Upon clicking the button, The <`div>` containing the `<Person>` tags apears and we can see the elements in the DOM.

## Handling Dynamic Content "The JavaScript Way" (Section 4, lecture 53)

