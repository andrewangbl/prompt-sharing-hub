'use client';

import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

import Profile from '@components/profile';

const MyProfile = () => {
const router = useRouter();

const {data: session} = useSession(); // data renamed to session

const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`); //dynamic route
      const data = await response.json();

      setPosts(data);
    }
    if (session?.user.id) fetchPosts();
  }, []);


  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?"); // confirm is built-in browser function

    if (hasConfirmed){
      try{
        const response = await fetch(`/api/prompt/${post._id.toString()}`,{
          method: 'DELETE',
        });

        if (response.ok) {
          const filteredPosts = posts.filter((p)=>p._id !== post._id); // filter out the post that was deleted
          setPosts(filteredPosts);
        } else {
          console.error('Failed to delete the post:', await response.text());
        }

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
