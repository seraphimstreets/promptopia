"use client";
import {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({params}) => {
    const {data:session} = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    const [username, setUsername] = useState("");
    console.log(params)
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params.id}/posts`);
        
        const data = await response.json();
        
        setPosts(data);
        console.log(data[0].creator.username)
        if(data[0]) setUsername(data[0].creator.username)
      }
    
     useEffect(() => {
        
        if(params.id) fetchPosts();
    }, []);
    
  return (
    <Profile
        name={`${username}'s`}
        desc={`${username}'s posts`}
        data={posts}
        handleEdit={null}
        handleDelete={null}
    />
  )
}

export default UserProfile;