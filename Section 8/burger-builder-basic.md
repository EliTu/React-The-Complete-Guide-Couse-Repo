# Section 8 - The Burger Builder (Basic Version)

## Planning an App in React - Core Steps (section 8, lecture 147)

There are 3 important steps:

- Planning the component tree / Component structure - We have a basic app desgin, and now we have to split it into React components, which may look different than our original component structure, but it is important to have a rough estimate of what kind of components we'll have and how would they look like.
- Application State (The data) - The next big step is thinking about our application state and how would the application data would look like. For example, in the app we're about to build we will need to keep track about the ingredients a user added, because it determines what will be rendered to the app and eventually how much the user should pay in the end.
- Stateful components vs stateless component - Once we have the basic component structure figured out and we thought about the data we would need to pass, we can now think about which components in our app should be dumb, stateless components and which should be container, statefull components. Either class based components, or functional stateful (using Hooks) vs dumb functional components.

In the end our initial and basic outline for the app may differ from the end result, as we may find out that we might need more components or if we will merge components when the split doesn't make sense,and that's completley fine.

## Planning our App- Layout and Component Tree (Section 8, lecture 148)

