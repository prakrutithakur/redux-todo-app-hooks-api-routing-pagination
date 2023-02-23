import React, { useState, useMemo, useContext } from 'react';
import './App.css';
import './style.scss'
import Todo from './todo/Todo';
import AnotherCounter from './features/counter/AnotherCounter';
import axios from 'axios'
import data from './example/mock-data.json';
import Pagination from './Pagination'

let PageSize = 20;

//useContext functions
const themes = {
  //javaScript object
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};
const ThemeContext = React.createContext(themes.dark);
let themechoosedbyuser = themes.light;

//doubt in useContext

function choose(choice) {
  console.log("function choose in useContext has been activated");
  if (choice === 'dark') {
    themechoosedbyuser = themes.dark;
  } else {
    themechoosedbyuser = themes.light;
  }
}

function Toolbar(props) {
  console.log("function Toolbar has been activated");
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  console.log("function theme button has been activated");
  const theme = useContext(ThemeContext);
  return (
    <div style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </div>
  );
}

// Error ErrorBoundary 

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  // This method is called if any error is encountered
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and
    // re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error
    // reporting service here
  }
  // This will render this component wherever called
  render() {
    if (this.state.errorInfo) {

      // Error path
      return (
        <div>
          <h2>An Error Has Occurred</h2>
          <details>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children, i.e. in
    // case no error is Found
    return this.props.children;
  }
}
// This is a component for Counter,Named Counter
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }));
  }

  render() {
    if (this.state.counter === 3) {

      // Simulate a JS error
      throw new Error('Crashed!!!!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

function App() {
  const getApi = () => {
    axios({
      method: 'get',
      url: "https://jsonplaceholder.typicode.com/todos",
    })
      .then((res) => {
        setApiResponse(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [apiResponse, setApiResponse] = useState({});

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);


  return (
    <div className="App">

      <h1>Redux App and Pagination </h1>

      {/* Todo using useSelector and useDispatch */}

      <h4>ToDo</h4>
      <div style={{ marginTop: "20px" }}>
        <Todo />
      </div>

      {/* counter using useReducer hook */}

      <div>
        <AnotherCounter />
      </div>

      {/* useContext part --> doubt */}

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => choose('dark')}>Dark</button>
        <button onClick={choose('light')}>Light</button>
      </div>

      <ThemeContext.Provider value={themechoosedbyuser}>
        <Toolbar />
      </ThemeContext.Provider>

      {/* Pagination Table*/}

      <>
        <table style={{
          marginLeft: "20px", marginRight: "20px", marginTop: "20px"
        }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map(item => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </>

      <div style={{ marginTop: "20px" }}></div>
      <button onClick={getApi}>Fetch Data</button>
      <div style={{ marginTop: "10px" }}>{JSON.stringify(apiResponse)}</div>

      {/* Error Boundaries */}

      <div style={{ marginLeft: '30px', marginTop: '50px' }}>
        <div style={{ textAlign: "center" }}>
          <h1>
            <strong>To see the working of Error boundaries
              click on the Counters to increase the value
            </strong>
          </h1>
          <p>
            Program is made such a way that as soon as the counter
            reaches the value of 3, Error boundaries will throw an
            error.
          </p>
        </div>
        <hr style={{ width: "500px" }} />
        <ErrorBoundary>
          <p>
            These two counters are inside the same error boundary.
            If one crashes, then the effect will be done on both
            as the error boundary will replace both of them.
          </p>
          <Counter />
          <Counter />
        </ErrorBoundary>
        <hr style={{ width: "500px" }} />
        <p>
          These two counters are each inside of their
          own error boundary. So if one crashes, the
          other is not affected.
        </p>
        <ErrorBoundary><Counter /></ErrorBoundary>
        <ErrorBoundary><Counter /></ErrorBoundary>
      </div>
    </div>

  );
}

export default App;
