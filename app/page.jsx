import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className = "w-full flex-center flex-col">
      <h1 className="head_text text-center">
      {/* head_text underscore means it coming from our own styling */}
        Discover & Share
        <br className="max-md:hidden"/>
        <span className="green_gradient text-center"> AI-powered Prompts </span>
      </h1>
      <p className="desc text-center">
        Prompt Hub is an open-source AI prompting tool for discovering,
         creating, and sharing AI prompts.
      </p>

      <Feed />
    </section>
  )
}

export default Home
