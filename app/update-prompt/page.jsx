'use client';

import {useState, useEffect, Suspense} from 'react';
import {useRouter,useSearchParams} from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // searchParams is an object that contains all the query parameters in the URL on website
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }

    if (promptId) getPromptDetails();
  },[promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    // this prevents the default behavior of the browser when submitting a form, which is to do a Reload
    setSubmitting(true);

    if (!promptId) return alert('Prompt ID not found');

    try{
      // passing the data below to the backend endpoint using the post request
      const response = await fetch(`/api/prompt/${promptId}`,{
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      })

      if (response.ok){
        router.push('/'); // redirect to the home page
      }
    } catch (error) {
      console.log(error);
    } finally{
      setSubmitting(false);
    }
  }

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};


const EditPromptPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditPrompt />
  </Suspense>
);

export default EditPromptPage;
