import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./component/HomePage";
import { IndexPage } from "./component/IndexPage";
import { CreateIndexPage } from "./component/IndexPage/CreateIndexPage";
import { EditIndexPage } from "./component/IndexPage/EditIndex";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import Layout from "./container/Layout";
function App() {
  return (
    <div className="app">
      <Layout>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/indexs" exact element={<IndexPage />} />
          <Route path="/create-index" exact element={<CreateIndexPage />} />
          <Route path="/index/:indexId" exact element={<EditIndexPage />} />
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route path="/sign-up" exact element={<SignUp />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
