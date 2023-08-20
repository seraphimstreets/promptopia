"use client";
import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick, handleProfileClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleProfileClick={handleProfileClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = async (e) => {
    e.preventDefault();
    const a = e.target.value;
    if(a){
      const response = await fetch(`/api/prompt/search/${a}`
      );
      const data = await response.json();

      setPosts(data);
    }
    
    
    setSearchText(a);

    
  }

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList 
        data={posts}
        handleTagClick={async (tag) => {

          
            const response = await fetch(`/api/prompt/tag/${tag}`
            );
            const data = await response.json();
      
            setPosts(data);
          
        }}
        handleProfileClick={(username)=>{
          window.location.href = `profile/${username}`
        }}
      />
    </section>
  )
}

export default Feed