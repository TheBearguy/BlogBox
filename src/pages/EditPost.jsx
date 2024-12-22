import React, {useState, useEffect} from 'react'
import { Container, PostForm } from '../components'
import { service } from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom';
function EditPost() {
    const [post, setPost] = useState([]); // posts state to store the posts from the server
    const {slug} = useParams(); // useParams hook to get the slug from the URL
    const navigate = useNavigate(); // useNavigate hook to navigate to a different page
    useEffect(() => {
        service.getPost([slug]) // get the post with the slug from the server
            .then((post) => {
                if (post) {
                    setPost(post.documents); // set the posts state to the posts from the server response
                } else {
                    navigate("/")
                }
            })
            .catch(
                (error) => {
                     console.log("EDITPOST PAGE :: Error while fetching the post", error)
                }
            )
    }, [slug, navigate])
  return post? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  )
}

export default EditPost
