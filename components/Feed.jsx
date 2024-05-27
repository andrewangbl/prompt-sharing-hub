'use client';

import {useState, useEffect} from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}

    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts,setPosts] = useState([]);

  // to fetch data from the backend: get request to our own nextjs api
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {

  }

  return (
    <section className='feed'>

      {/* Prompt Search Functionality will be developed in the future */}

      {/* <form className='relative w-full flex-center'>*/}
      {/* search for prompts */}
        {/* <input */}
          {/* type='text' */}
          {/* placeholder='Search for a username or a tag' */}
          {/* value={searchText} */}
          {/* onChange={handleSearchChange} */}
          {/* required */}
          {/* className='search_input peer' */}
        {/* /> */}
      {/* </form> */}

      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed
