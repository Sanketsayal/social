import { createContext } from "react";
import { useProvidePosts } from "../hooks";

const initialState={
    post:[],
    loading:true,
    addPostToState:()=>{},
    addComment:()=>{},
}

export const PostContext=createContext(initialState);

export const PostProvider=( {children} )=>{
    
    const posts=useProvidePosts();

    return (<PostContext.Provider value={posts}>{children}</PostContext.Provider>);
}