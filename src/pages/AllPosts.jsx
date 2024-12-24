import React, {useState, useEffect} from 'react'
import { service } from '../appwrite/config'
import { Container, PostCard } from '../components'
function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {})

        service.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents); // set the posts state to the posts from the server response
                }
            } )
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post, index) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts
