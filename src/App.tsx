import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './AppRouter'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          className="text-xl"
        />
        <AppRouter />
      </Router>
    </>
  )
}

export default App
