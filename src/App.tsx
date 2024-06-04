import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./routes/layout/Navbar";
import Footer from "./routes/layout/Footer";
import HomePage from "./routes/pages/HomePage";
import Videos from "./routes/pages/VideosPage";
import Editvideo from "./routes/pages/VideosPage/Editvideo";
import UploadPage from "./routes/pages/UploadPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Delete from "./routes/pages/DeletePage/Delete";

function Layout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "95vh",
        alignItems: "center",
      }}
    >
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <Navbar />
      <main style={{ marginBottom: "auto" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="/videos/:id" element={<Videos />} />
        <Route path="/videos/:id/edit" element={<Editvideo />} />
        <Route path="/videos/:id/delete" element={<Delete />} />
        <Route path="/videos/upload" element={<UploadPage />} />
      </Route>
    </Routes>
  );
}

export default App;
