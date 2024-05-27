'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import {usePathname,useRouter} from 'next/navigation';

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const {data:session}=useSession(); // data renamed to session
  const pathName=usePathname();
  const router=useRouter();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=>setCopied(""), 3000);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
              ? "/assets/icons/tick.svg"
              : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={()=> handleTagClick && handleTagClick(post.tag)}
      >
      {/* onClick: be able to click on the tag and filter the prompts by the tag */}
      {/* Check if we do have the tag; if we will be able to click it and show all relevant tag */}
        #{post.tag}
      </p>

      {/* node js save as post.creator._id */}
      {session?.user.id == post.creator._id && pathName === '/profile' && (
        // 1. checking if the current login user is the creator of the post
        // 2. checking if the current path is '/profile'
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm red_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}

    </div>
  )
}

export default PromptCard
