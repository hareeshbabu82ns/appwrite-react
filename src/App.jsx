import { BrowserRouter, useRoutes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import Router from './routes/Router';

function App() {

  return (
    <div className="app" style={{ display: 'flex' }}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export const AppRoutes = () => {
  const routing = useRoutes( Router );
  return <LocalizationProvider dateAdapter={AdapterLuxon}>{routing}</LocalizationProvider>;
};

export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom"

// import Layout from './layouts/full/FullLayout'
// import SignUp from './components/signup'
// import LogIn from './components/login'
// import Home from "./components/homepage"
// import Todo from "./pages/Todo/Todo";

// function App() {
//   return (
//     <div className="app" style={{ display: 'flex' }}>
//       <Routes>
//         <Route path='/' element={<Layout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/todos" element={<Todo />} />
//           <Route path='/login' element={<LogIn />} />
//           <Route path='/signup' element={<SignUp />} />
//         </Route>
//       </Routes>
//     </div>
//   )
// }

// export default App
