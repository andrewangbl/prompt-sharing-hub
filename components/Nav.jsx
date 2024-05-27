'use client';

import Link from 'next/link';
{/*this allow use to move to other page in the application*/}

import Image from 'next/image';
{/*automatically optimize image*/}

import {useState, useEffect} from 'react';

import {signIn, signOut, useSession, getProviders} from 'next-auth/react';


import React from 'react'

const Nav = () => {
  const {data: session} = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  {/*rename error for setProviders react hook??*/}
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    fetchProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className='flex gap-2 fecenter'>
      <Image
        src = "assets/images/logo.svg"
        alt="Prompt Hub Logo"
        width={30}
        height= {40}
        className='object-contain'
      />
      <p className="logo-text">Prompt Hub</p>
      </Link>


      {/* Desktop navigation: login logoff */}
      <div className='sm:flex hidden'>
        {session?.user ? ( // check if a user exists
          <div className = 'flex gap-3 md:gap-5'>

            <Link href="/create-prompt"
            className='black_btn'>
              Create Post
            </Link>

            <button
              type="button"
              onClick = {signOut}
              className = "outline_btn"
              >
                Sign Out
            </button>

            <Link href="/profile">
              <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              />
            </Link>

          </div>
        ):(
          <>
          {/*providers && meaning???*/}
            {providers &&
              Object.values(providers).map((provider) =>
              (
                <button
                  type = "button"
                  key = {provider.name}
                  onClick={() => {signIn(provider.id);}}
                  className = "black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        ) }

      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className='flex'>

            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={()=> setToggleDropdown((prev) => !prev)}
              // must use Functional Updates for state changes
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href = "/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)} // reset the navigation
                  >
                  My Profile
                </Link>

                <Link
                  href = "/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)} // reset the navigation
                  // Link component from Next.js, which enables client-side navigation
                  // onClick is an event handler that runs a JavaScript function when the link is clicked
                  >
                  Create Prompt
                </Link>

                <button
                  type = "button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}

          </div>
        ):(
          <>
            {providers &&
              Object.values(providers).map((provider) =>
              (
                <button
                  type = "button"
                  key = {provider.name}
                  onClick={() => signIn(provider.id)}
                  className = "black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>


    </nav>
  )
}

export default Nav
