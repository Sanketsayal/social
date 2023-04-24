import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';
import Comment from './Comment';
import { useState } from 'react';
import { usePosts } from '../hooks';
import { toast } from 'react-hot-toast';
import { createComment, toggleLike } from '../api';

const Post=({post})=>{
    const [comment, setComment] = useState('');
    const posts = usePosts();

    const handleLike=async ()=>{
        const response=await toggleLike(post._id,'Post');
          if (response.success) {
            toast.success('like created successfully!');
          } else {
            toast.error(response.message);
        }
    }

    const handleAddComment = async (e) => {
        if (e.key === 'Enter') {
    
          const response = await createComment(comment, post._id);
          if (response.success) {
            setComment('');
            posts.addComment(response.data.data.comment, post._id);
            toast.success('Comment created successfully!');
          } else {
            toast.error(response.message);
          }
        }
      };

    return(
        <div className={styles.postWrapper} key={post._id}>
            <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                    <img
                        src="https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg?w=740"
                        alt="user-pic"
                    />
                    <div>
                        <Link 
                            to={`/user/${post.user._id}`}
                            state= {{user: post.user}}
                            className={styles.postAuthor}
                            >
                            {post.user.name}
                        </Link>
                        <span className={styles.postTime}>a minute ago</span>
                    </div>
                </div>
                <div className={styles.postContent}>{post.content}</div>

                <div className={styles.postActions}>
                    <div className={styles.postLike}>
                        <button onClick={handleLike}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/594/594907.png?w=740&t=st=1682256055~exp=1682256655~hmac=a0649dbfaccd7f80af6961956fa82650f099e6491753b78d89ddab57244d1c49"
                                alt="likes-icon"
                            />
                        </button>
                        <span>{post.likes.length}</span>
                    </div>

                    <div className={styles.postCommentsIcon}>
                        <img
                        src="https://cdn-icons-png.flaticon.com/512/1230/1230203.png?w=740&t=st=1682256160~exp=1682256760~hmac=0c2bb61167e53ecf07213cd2b50e50acb5915c16c118a1a25d09f379a0a54230"
                        alt="comments-icon"
                        />
                        <span>{post.comments.length}</span>
                    </div>
                </div>
                <div className={styles.postCommentBox}>
                <input
                    placeholder="Start typing a comment"
                    onKeyDown={handleAddComment}
                    onChange={(e)=>setComment(e.target.value)}
                />
                </div>

                <div className={styles.postCommentsList}>
                {post.comments.map((comment) => (
                    <Comment comment={comment} key={`post-comment-${comment._id}`} />
                ))}
                </div>
            </div>
        </div>
    )
}

export default Post;