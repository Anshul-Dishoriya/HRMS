import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardOverview from "./pages/DashboardOverview";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
