
import styles from '../styles/home.module.css'
import { Loader, Post, FriendsList, CreatePost } from '../components';
import { useAuth, usePosts } from '../hooks';

const Home=()=>{

    const auth=useAuth();
    const posts=usePosts();

    if(posts.loading){
        return(<Loader />)
    }

    return(
        <div className={styles.home}>
            
            <div className={styles.postsList}>
            <CreatePost />
                {posts.data.map(post=>{
                    return <Post post={post} key={`post-${post._id}`}/>
                })}

            </div>

            {auth.user&&<FriendsList />}

        </div>
    );
};

export default Home;