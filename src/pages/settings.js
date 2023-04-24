import { useState } from 'react';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import { toast } from 'react-hot-toast';

const Settings=()=>{

    const [edit,setEdit]=useState(false);
    const [name,setName]=useState(false);
    const [password,setPassword]=useState(false);
    const [confirmPassword,setConfirmPassword]=useState(false);
    const [savingForm,setSavingForm]=useState(false);

    const auth=useAuth();

    const clearForm=()=>{
        setConfirmPassword('');
        setPassword('');
    }

    const updateProfile=async ()=>{
        setSavingForm(true);
        let error=false;
        if(!name||!password||!confirmPassword){
            error=true;
            toast.error('please fill the details');
            
        }

        if(password!==confirmPassword){
            error=true;
            toast.error('password and confirm password does not match')
        }

        if(error){
            setSavingForm(false);
        }

        const response=await auth.updateUser(auth.user._id,name,password,confirmPassword);
        if(response.success){
            setEdit(false);
            setSavingForm(false);
            clearForm();

            return toast.success('user updated successfully');
        }else{

            toast.error(response.message);
        }


        setSavingForm(false);

    };

    return(
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img alt="" src='https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg?w=740' ></img>
            </div>
        
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{auth.user?.email}</div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                {edit?(
                    <input type='text' 
                    placeholder={auth.user.name} 
                    onChange={(e)=>setName(e.target.value)} />
                )
                    
                :(<div className={styles.fieldValue}>{auth.user?.name}</div>)}
                
            </div>
            {edit &&
            <>
                <div className={styles.field}>
                    <div className={styles.fieldLabel}>Password</div>
                    <input type='password' onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className={styles.field}>
                    <div className={styles.fieldLabel}>Confirm Password</div>
                    <input type='password' onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
            </>
            }
            
            <div className={styles.btnGrp}>
            {edit?(
                <>
                    <button 
                    className={`button ${styles.saveBtn}`} 
                    onClick={updateProfile}
                    disabled={savingForm} >
                        {savingForm?'Saving...':'Save'}
                    </button>
                    <button className={`button ${styles.editBtn}`} onClick={()=>setEdit(false)}>
                        Go back
                    </button>
                </>
            ):(
                <button className={`button ${styles.editBtn}`} onClick={()=>{setEdit(true)}}>
                    Edit Profile
                </button>
            )}
                
            </div>

        </div>
    )

}

export default Settings;