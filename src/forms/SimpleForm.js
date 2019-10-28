import React from 'react'
import {Formik} from 'formik'

const SimpleForm = () => {
    return (
        <Formik
            initialValues = {{ name : ''}}
            onSubmit= { (values, { setSubmitting }) => {            
                console.log("form values", values);

                setTimeout(() => {
                    alert(values)
                    setSubmitting(false)
                },500)
            }}

            validate = {values => {
                let errors = {}

                if (!values.name){
                    errors.name = "Please enter a name"
                }
                return errors
            }}
        >
        {
            ( { handleSubmit, handleChange, values, errors, handleBlur, touched, isSubmitting } ) => (
                <form onSubmit={handleSubmit} >
                    <input onChange={handleChange} 
                        value={values.name} 
                        type="text" 
                        name="name" 
                        placeholder="Enter your name"
                        onBlur={handleBlur} 
                    />
                    
                    <button disabled={isSubmitting}>Submit</button> 

                    {
                        errors.name && (
                            <div style={{ color: 'red' }}>
                                {errors.name}
                            </div>
                        )
                    }
                </form>
            )
        }
        </Formik>
    )
}

export default SimpleForm;