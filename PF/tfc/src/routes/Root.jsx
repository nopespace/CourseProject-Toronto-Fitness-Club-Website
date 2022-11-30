import * as React from 'react';
import Navigation from '../components/Navigation';

function Root() {
  return (
    <div className="App">
      <Navigation />
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="text-3xl font-bold underline">
          hellooo this is a testtte
        </div>
        <div>
          <h1 className="text-3xl font-bold underline">
            Hello world!
          </h1>
        </div>
      </header>
    </div>
  );
}

export default Root;