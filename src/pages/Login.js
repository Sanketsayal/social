import { useState } from 'react';
import styles from '../styles/login.module.css'
import { Toaster, toast } from 'react-hot-toast';
import { useAuth } from '../hooks';
import { Navigate } from 'react-router-dom';

const Login=()=>{

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loggingIn,setLoggingIn]=useState(false);
  const auth=useAuth();
  console.log(auth);

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setLoggingIn(true);
    if(!email || !password){
      return toast.error('Enter email && password',{duration:4000,})
    }

    const response=await auth.login(email,password);
    if(response.success){
      setLoggingIn(false)
      toast.success('successfully logged in',{duration:4000,})
    }
    else{
      setLoggingIn(false)
      toast.error(response.message,{duration:4000,})
    }
  }

  if(auth.user){
    return <Navigate to='/' />;
  }

  return (
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <span className={styles.loginSignupHeader}>Log In</span>
  
        <div className={styles.field}>
          <input
            type="email"
            placeholder="email..."
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
  
        <div className={styles.field}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
  
        <div className={styles.field}>
          <button disabled={loggingIn}>
            {loggingIn?'Logging in ...':'Log In'}
          </button>
          <Toaster />
        </div>
      </form>
    );
    
}

export default Login;