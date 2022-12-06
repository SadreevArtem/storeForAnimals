import './App.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { ProductsContextProvider } from './contexts/ProductsContextProvider'

function App() {
  return (
    <ProductsContextProvider>
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    </ProductsContextProvider>
  )
}

export default App
