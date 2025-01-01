import { ToastContainer } from "react-toastify";
import {Routes,Route} from "react-router";
import Sentiment from "./pages/Sentiment";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/project" element={<Sentiment/>} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}

export default App;
