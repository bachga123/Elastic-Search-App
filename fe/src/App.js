import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import IndexPage from "./pages/Index/IndexPage";
import CreateIndexPage from "./pages/Index/CreateIndexPage";
import EditIndexPage from "./pages/Index/EditIndex";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
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
