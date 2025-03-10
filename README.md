# Usage

To run this locally, you need to start the front-end and back-end dev servers:

### Step 1. Install
`npm install`

### Step 2. Run Backend Dev Server
`npm run dev`

### Step 3. Run Frontend Dev Server
`npm run start`

The frontend is served at https://localhost:3001.


# Extensibility

### Add a New Data Source
Add a new function to the `DATA_SOURCES` array in `App.tsx`.

`src/App.tsx`:
```
const DATA_SOURCES: GraphDataSource[] = [
  fetchGraph("bp_456", "bpv_123", "tenant_123"),
  ...
]

```

# Patterns

### Object Maps / Lookup Tables
When graph data is loaded, it is used to populate lookup tables (which have names like `nodeMap`, `edgeMap`, etc). This makes it easier and more efficient to do lookups by ID. In most cases, JavaScript object property access is average-case O(1) time.

### Traversing the DAG
There's a function in `ConfigPrefillForm` called `getPrereqs()` that recursively traverses the DAG to find unique prerequisite forms.

### Reusable Components
As an example: The common modal-window behavior has been abstracted into a single hook `useModal` that was used for both modal windows.

### Adapter Pattern
Any datasource can be added as long as it satisfies the `Graph` interface. There's an adapter called `processAvantosGraph` which adapts the Avantos graph data to this interface.


# Journey Builder React Coding Challenge

In this challenge, you will reimplement a small portion of an app we’re currently building at Avantos. The portion you’ll work on is a node-based UI that shows a [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph) of forms:

![image.png](attachment:898e69a9-082b-4ba3-9593-5edfa1bc2318:image.png)

When a form has been submitted, the values from the form fields can be used to prefill the fields of a downstream form. E.g., values from Form A’s fields can be used to prefill Form B’s or Form C’s fields.

First, you will use [our docs](https://api.avantos-dev.io/docs#/operations/action-blueprint-graph-get) to hit our `action-blueprint-graph-get` endpoint and [the react flow docs](https://reactflow.dev/) to render the returned nodes and edges.

Next, you will implement the prefill UI for Forms. It doesn’t need to be pretty, but this UI will need to view and edit the prefill mapping. We show this mapping when a user clicks a node and the mapping looks like this in our UI:

![image.png](attachment:ba31aa98-8e4e-4b9d-bfb6-e99d9f6523c7:image.png)

This shows the prefill configuration for three fields on Form D above. The first two fields are called “dynamic_checkbox_group” and “dynamic_object” and they currently have no prefilled data. The last field is called “email” and will be prefilled with the value from Form A’s email field.

Clicking the X button on the far right of the email field clears the prefill configuration for that field. Clicking a field without a configuration opens this modal:

![image.png](attachment:36458b96-1384-4460-b022-8f9dd09cec7b:image.png)

In this modal, we see 3 types of data that can be used to prefill a form:

1. Form fields of forms that Form D directly depends on (Form B)
2. Form fields of forms that Form D transitively depends on (Form A)
3. Global data (Action Properties and Client Organization Properties)

1 and 2 will require traversing the form DAG. For 3, you can ignore Action Properties and Client Organization Properties and use whatever global data you want. 

You should design your code so that any combination of these data sources can be easily used without code changes. Moreover, you should design for easy support of future, new data sources.

## Prerequisites

- Use
    - React
    - TypeScript (optional but *strongly* recommended)
    - Create React App, Vite, or Next.js
- [This repo](https://github.com/mosaic-avantos/frontendchallengeserver) has a mock server with the aforementioned `action-blueprint-graph-get` endpoint.

## Rules

**SUBMISSION:** Please send us your submission as a Github repository.

**TIME LIMIT:** Send us a link to your Github repository within 4 working days from the date you receive this. You may submit your work earlier.

## Evaluation Criteria

We will be particularly interested in:

1. Code Organization
    - Clear separation of concerns
    - Well-defined interfaces between components
    - Thoughtful component hierarchy and composition
2. Extensibility
    - How easily new features can be added
    - Reusable and composable React components
    - Tests
3. Documentation
    - How do I run this locally?
    - How do I extend with new data sources?
    - What patterns should I be paying attention to?
4. Code Quality
    - Clean, readable code
    - Reasonable, readable var names
    - Appropriate use of modern React practice


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
