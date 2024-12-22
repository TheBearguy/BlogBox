import React, {useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import service from "../../appwrite/config";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function PostForm({post}) {
    const {register, handleSubmit, formState: {errors}, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const submit = async(data) => {
        if (post) {
            // update post
            // get the data from the form and update the post
            // upload the current post data to the server, then update the post
            const file = await data.images[0] ? service.uploadFile(data.images[0]) : null; // if there is an image, upload it
            if (file) {
               await service.deleteFile(post.featuredImage); // delete the old image
            }
            // post.$id is the id of the post
            // update the post with the new data
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            // create new post
            // get the data from the form and create a new post
            const file = await data.images[0] ? service.uploadFile(data.images[0]) : null ; // if there is an image, upload it
            // create a new post with the data
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;;
                const dbPost = await service.createPost({
                    userId: userData.$id,
                    ...data
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value.
                trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')
        return ""; // if value is not a string, return an empty string
    }, [])

    React.useEffect(() => {
        // watch the title field
        // name could be anything
        const subscription = watch((value, {name}) => {
            if (name === "title") {
                // if the title field changes, update the slug field
                setValue("slug", slugTransform(value.title, {shouldValidate: true}));
                // there'll be a slug field in the form
            }
        })
// memory management
        return () => {
            subscription.unsubscribe();
            // memory management
        }
    }, [slugTransform, setValue , post.$id])

  return (
    <div>

    </div>
  )
}

export default PostForm
