import { Link } from 'react-router-dom';

import styles from '../styles/navbar.module.css';
import {useAuth} from '../hooks'
import { useEffect, useState } from 'react';
import { searchUser } from '../api';


const Navbar=()=>{
    const [results,setResults]=useState([]);
    const [searchText,setSearchText]=useState('');
    const auth=useAuth();

    useEffect(()=>{
        const fetchUsers=async()=>{
            const response=await searchUser(searchText);
            if(response.success){
                setResults(response.data.data.users);
            }
        }
        if(searchText.length>2){
            fetchUsers();
        }else{
            setResults([]);
        }
    },[searchText])

    return(
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to='/'>
                    <img alt='' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png'></img>
                </Link>
            </div>

            <div className={styles.searchContainer}>
                <img 
                    alt='' 
                    src='https://img.icons8.com/ios-glyphs/256/search.png' 
                    className={styles.searchIcon} 
                />

                <input 
                    placeholder='search users' 
                    value={searchText} 
                    onChange={(e)=>setSearchText(e.target.value)} 
                />

                {results.length>0&&<div className={styles.searchResults}>
                    <ul>
                        {results.map((user)=>{
                            return( 
                                <li 
                                    className={styles.searchResultsRow} 
                                    key={`user-${user._id}`}
                                >
                                    <Link to={`/user/${user._id}`} >
                                        <img alt='' src='https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg?w=740' />
                                        <span>{user.name}</span>
                                    </Link>
                                </li>)
                        })}
                    </ul>
                </div>}

            </div>


            <div className={styles.rightNav}>
                {auth.user&& <div className={styles.user}>
                    <Link to='/settings'>
                        <img alt='' 
                        src="https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg?w=740" 
                        className={styles.userDp} />
                    </Link>
                    <span>{auth.user.name}</span>
                </div>}
                <div className={styles.navLinks}>
                <ul>
                {auth.user?(
                    <li onClick={auth.logout}>
                        <a href='/'>Log out</a>
                    </li>):(
                        <>
                            <li>
                                <Link to='/login'>Log in</Link>
                            </li>
                            <li>
                                <Link to='/register'>Sign Up</Link>
                            </li>
                        </>
                    )}
                    
                    
                </ul>

                </div>

            </div>
        </div>
    );
}

export default Navbar;