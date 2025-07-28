import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext'; 
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';       
import { store } from './redux/store';        
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

// use all the context providers here and also redux store
root.render(
  <React.StrictMode>
    <Provider store={store}>               
      <AuthProvider> 
      <ThemeProvider>
        <BrowserRouter>
        <ProductProvider>
        <CartProvider>
          <App />
          </CartProvider>
          </ProductProvider>
        </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
    </React.StrictMode>
 
);

reportWebVitals();
