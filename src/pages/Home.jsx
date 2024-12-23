import React, {useState, useEffect} from 'react'
import { service } from '../appwrite/config';
import { Container, PostCard } from '../components';
function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        service.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })
    }, [])
    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex-flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login to view the posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post, index) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            {/* <PostCard post={post}/> */}
                            <PostCard {...post}/> // post is an object, so we can spread it to pass it as props
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
  return (
    <div>Home</div>
  )
}

export default Home