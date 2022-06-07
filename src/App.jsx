import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import RandomStuffPage from "./pages/RandomStuff";
import MyStuffPage from "./pages/MyStuff";
import NewItemPage from "./pages/NewItem";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RandomStuffPage />} />
        <Route path="/new-item" element={<NewItemPage />} />
        <Route path="/my-stuff" element={<MyStuffPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
