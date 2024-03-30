import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Create from "./components/Create"
import Header from "./components/Header"
import Read from "./components/Read"
import Update from "./components/Update"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/edit/:id" element={<Update/>} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App