import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../providers/AuthProvider";
import { login as userLogin, register, editProfile, fetchUserFriends, getPosts } from '../api'
import { 
    setItemInLocalStorage, 
    LOCALSTORAGE_TOKEN_KEY, 
    removeItemInLocalStorage, 
    getItemInLocalStorage 
} from "../utils";
import jwtDecode from "jwt-decode";
import { PostContext } from "../providers/PostsProvider";


export const useAuth=()=>{
    return useContext(AuthContext);
}

export const useProvideAuth=()=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const getUser=async ()=>{
            const userToken=getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);

            let friends=[];

            if(userToken){
                const user=jwtDecode(userToken);
                const response=await fetchUserFriends();

                if(response.success){
                    friends=response.data.data.friends;
                } 

                setUser({
                    ...user,
                    friendships:friends
                })
            }

            setLoading(false);
        }

        getUser();
        
    },[])

    const login=async (email,password)=>{
        const response=await userLogin(email,password);
        if(response.success){
            setUser(response.data.data)
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,response.data.data.token?response.data.data.token:null)
            return{
                success:true
            }
        }else{
            return{
                success:false,
                message:response.message
            }
        }
    }

    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);
    
        if (response.success) {
          return {
            success: true,
          };
        } else {
          return {
            success: false,
            message: response.message,
          };
        }
    };

    const updateUser=async (userId,name,password,confirmPassword)=>{
        const response=await editProfile(userId,name,password,confirmPassword);
        if(response.success){
            setUser(response.data.data)
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,response.data.data.token?response.data.data.token:null)
            return{
                success:true
            }
        }else{
            return{
                success:false,
                message:response.message
            }
        }
    }

    const updateUserFriend=(addFriend,friend)=>{
        if(addFriend){
            setUser({
                ...user,
                friendships:[...user.friendships,friend]
            })
            return;
        }

        const newFriends=user.friendships.filter(
            f=>f.to_user._id!==friend.to_user._id
        );
        setUser({
            ...user,
            friendships:newFriends
        })
    }

    const logout=()=>{
        setUser(null);
        removeItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY)
    }

    return {
        user,
        login,
        logout,
        loading,
        signup,
        updateUser,
        updateUserFriend,
    }
}

export const usePosts=()=>{
    return useContext(PostContext);
}

export const useProvidePosts=()=>{
    const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchPosts=async ()=>{
          const response=await getPosts();
          if(response.success){
            setPosts(response.data.data.posts);
          }
          setLoading(false);
        }
        fetchPosts();
    },[]);

    const addPostToState=(post)=>{
        console.log(post);
        const newPost=[post,...posts];

        setPosts(newPost);
    }

    const addComment=(content,postId)=>{
        const newPosts=posts.map((post)=>{
            if(post._id===postId){
                return {...post,comments:[...post.comments,content]}
            }
            return post;
        })

        setPosts(newPosts);
    }


    return{
        data:posts,
        loading,
        addPostToState,
        addComment,
    }
}