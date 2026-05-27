
import './App.css'
import { BrowserRouter as ReactRoutes } from "react-router-dom";
import AllRoutes from "./routes/routes";


function App() {

  return (
    <>
      <ReactRoutes>
        <AllRoutes />
      </ReactRoutes>
    </>
  )
}

export default App
