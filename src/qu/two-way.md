# Two-Way Binding

## Task

Your task is to collect the values entered into the two input controls (`<textarea>` and `<input>`) via **two-way binding**.

In addition, you should pass the collected values via the appropriate props to the already existing `Review` component.

> **Important:** In this Udemy workspace, you must use `React.useState()` instead of just `useState()`!

The final app should allow users to enter values and then see those entered values in the `Review` component which is output below the input components.

---

## Question Code

**App.js**
```jsx
import React from 'react';

import Review from './Review';

// don't change the Component name "App"
function App() {
  return (
    <>
      <section id="feedback">
        <h2>Please share some feedback</h2>
        <p>
          <label>Your Feedback</label>
          <textarea />
        </p>
        <p>
          <label>Your Name</label>
          <input type="text" />
        </p>
      </section>
      <section id="draft">
        <h2>Your feedback</h2>

        <Review />

        <p>
          <button>Save</button>
        </p>
      </section>
    </>
  );
}

export default App;
````

**Review.js**

```jsx
export default function Review({ feedback, student }) {
  return (
    <figure>
      <blockquote>
        <p>{feedback}</p>
      </blockquote>
      <figcaption>{student}</figcaption>
    </figure>
  );
}
```

---

## Solution

**App.js**

```jsx
import React from 'react';

import Review from './Review';

// don't change the Component name "App"
function App() {
  const [feedback, setFeedback] = React.useState('');
  const [name, setName] = React.useState('');
    
  function changeFeedback(event) {
    setFeedback(event.target.value);
  }   
  
  function changeName(event) {
    setName(event.target.value);
  } 
    
  return (
    <>
      <section id="feedback">
        <h2>Please share some feedback</h2>
        <p>
          <label>Your Feedback</label>
          <textarea onChange={changeFeedback}/>
        </p>
        <p>
          <label>Your Name</label>
          <input type="text" onChange={changeName}/>
        </p>
      </section>
      <section id="draft">
        <h2>Your feedback</h2>

        <Review feedback={feedback} student={name} />

        <p>
          <button>Save</button>
        </p>
      </section>
    </>
  );
}

export default App;
