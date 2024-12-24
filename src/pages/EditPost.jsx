import React, {useState, useEffect} from 'react'
import { Container, PostForm } from '../components'
import { service } from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom';
function EditPost() {
    const [post, setPost] = useState(null); // posts state to store the posts from the server
    const {slug} = useParams(); // useParams hook to get the slug from the URL
    const navigate = useNavigate(); // useNavigate hook to navigate to a different page
    useEffect(() => {
        if (slug) {
            service.getPost(slug) // get the post by the slug
                .then((post) => {
                    if (post) {
                        setPost(post); // set the post state
                    }
                });
        } else {
            navigate('/'); // navigate to the home page if the slug is not found
        }
    }, [slug, navigate])
  return post? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
            {console.log("EDITPOST :: post :: ", post)}

        </Container>
    </div>
  ) : null
}

export default EditPost
