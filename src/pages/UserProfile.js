import { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { fetchUserProfile, addFriend, removeFriend } from '../api';
import { Loader } from '../components';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { toast } from 'react-hot-toast';
// import { addFriend, fetchUserProfile, removeFriend } from '../api';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const navigate=useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        
        setUser(response.data.data.user);
      } else {
        toast.error(response.message);
        return navigate('/');
      }

      setLoading(false);
    };

    getUser();
  }, [userId,navigate]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friendships;

    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);

    const response = await removeFriend(userId);

    if (response.success) {
      const friendship = auth.user.friendships.filter(
        (friend) => friend.to_user._id === userId
      );

      auth.updateUserFriend(false, friendship[0]);
    } else {
    }
    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userId);

    if (response.success) {
      const { friendship } = response.data.data;

      auth.updateUserFriend(true, friendship);
      toast.success('Friend added')
      
    } else {
      toast.error(response.message)
    }
    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg?w=740"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
          >
            {requestInProgress ? 'Removing friend...' : 'Remove friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding friend...' : 'Add friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
