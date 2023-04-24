import { Navigate, Route, Routes, } from "react-router-dom";
import {Loader,Navbar} from '../components'
import {Home,Login, Settings, Signup} from '../pages'
import { useAuth } from "../hooks";
import UserProfile from "../pages/UserProfile";

const Page404=()=>{
  return(    
    <h1>Error 404</h1> 
  )
}

function PrivateRoute({children}){

  const auth=useAuth();
  return auth.user?children:<Navigate to={'/login'} />

}

function App() {

  
  const auth=useAuth();
  
  

  if(auth.loading){
    return(<Loader />)
  }

  return (
    <div className="App">
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/settings" 
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
           } 
          />
        <Route path="/user/:userId" 
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
      
    </div>
  );
}

export default App;
