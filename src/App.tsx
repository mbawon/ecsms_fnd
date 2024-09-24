import { BrowserRouter } from "react-router-dom"
import Router from "./route"
import { AuthProvider } from "./common/contexts/AuthContext"


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
          <Router />
      </AuthProvider >
    </BrowserRouter>
  )
}

export default App