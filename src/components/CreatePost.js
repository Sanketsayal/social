import { useState } from 'react';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { toast } from 'react-hot-toast';
import { usePosts } from '../hooks';

const CreatePost=()=>{
    const [post,setPost]=useState('');
    const [addingPost,setaddingPost]=useState(false);
    const posts=usePosts();

    const handleAddPost=async ()=>{
        setaddingPost(true);
        const response=await addPost(post);
        if(response.success){
            setPost('');
            posts.addPostToState(response.data.data.post);
            toast.success('post added successfully');
        }else{
            toast.error(response.message);
        }

        setaddingPost(false);
    }

    return(
        <div className={styles.createPost}>
            <textarea 
                className={styles.addPost}
                value={post}
                onChange={(e)=>setPost(e.target.value)}
            ></textarea>
            <div>
                <button 
                    className={styles.addPostBtn}
                    onClick={handleAddPost}
                    disabled={addingPost}
                >
                {addingPost?'Adding Post':'Add Post'}
                </button>
            </div>
        </div>
    )
}

export default CreatePost;