import React from 'react'
import { Editor } from '@tinymce/tinymce-react'; // import the Editor component from tinymce-react
import { Controller } from 'react-hook-form';

// You could use forwardRef to forward the ref of this component to the componenet that is using this component as a child component
export default function RTE({
    name,
    control,
    label,
    defaultValue='',
    ...props
}) {
  return (
    <div className='w-full'>
        {label && <label className=''>
        {label}
        </label>}
        <Controller
            name={name || "content"}
            control={control}
            render={({field: {onChange}}) => (
                    <Editor
                        initialValue={defaultValue}
                        // {...field}
                        // field does not has to be destructured as onChange has already been extracted from it and passed to the Editor component
                        // if you want to pass the rest of the props to the Editor component, you can do so by using the spread operator
                        // {...props}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help',
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />
                )
            }
        />
    </div>
  )
}
