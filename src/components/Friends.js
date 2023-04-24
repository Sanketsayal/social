import styles from '../styles/home.module.css';
import {useAuth} from '../hooks';
import { Link } from 'react-router-dom';

const FriendsList=()=>{

    const auth=useAuth();
    const {friendships=[]}=auth.user;
    return(
        <div className={styles.friendsList}>
            <div className={styles.header}>Friends</div>

            {friendships&&friendships.length===0&& <div className={styles.noFriends}>No Friends Found</div>}
            {friendships&&friendships.map((friend)=>{
                return(
                    <div key={`friend-${friend._id}`}>
                        <Link className={styles.friendsItem} to={`/user/${friend.to_user._id}`} >
                            <div className={styles.friendsImg}>
                                <img alt='' src='https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg?w=740' />
                            </div>
                            <div className={styles.friendsName}>{friend.to_user.name}</div>
                        </Link>
                    </div>
                )
                
            })}

        </div>
    )

    
}

export default FriendsList;