import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Nav from "./component/pages/navPage";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        {/* <Route path="/signin" component={SignInComponent} />
        <Route path="/getstarted" component={GetStartedComponent} /> */}
      </div>
    </Router>
  );
}

export default App;
