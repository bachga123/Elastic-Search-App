import logo from "./logo.svg";
import "./App.css";
import Header from "./container/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Switch } from "react-router";
import { HomePage } from "./component/HomePage";
import Layout from "./container/Layout";
import { IndexPage } from "./component/IndexPage";
import { CreateIndexPage } from "./component/IndexPage/CreateIndexPage";
import { EditIndexPage } from "./component/IndexPage/EditIndex";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/indexs" exact element={<IndexPage />} />
          <Route path="/create-index" exact element={<CreateIndexPage />} />
          <Route path="/index/:indexId" exact element={<EditIndexPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
