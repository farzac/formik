import React from 'react'
import DropList from './DropList';
import { withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import error from './Error'

const options = [
    {value:"Item 1", label:"Item 1" },
    {value:"Item 2", label:"Item 2" },
]

const formikWrapper =  withFormik({
    mapPropsToValues: () => ({
        username: '', 
        email: '', 
        topics: []
    }),
    handleSubmit: (values, { setSubmitting }) => {
        const paylod = {
            ...values,
            topics: values.topics.map(t => t.value)
        }

        setTimeout(() => {
            alert(JSON.stringify(paylod, null, 2))
            setSubmitting(false)
        }, 3000)
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Please enter a username'),
        email: Yup.string().email('Please enter a valid email-adress')
        .required('Please enter your email'),
        topics: Yup.array().min(2,'Please select 2 items')
        .of(Yup.object().shape({
            value: Yup.string().required(),
            label: Yup.string().required()
        }))
    })    

});

export const SignupForm = props => {

    const { values, 
            handleChange, 
            handleBlur, 
            setFieldValue, 
            setFieldTouched,
            handleSubmit,
            handleReset,
            isSubmitting,
            dirty
        }  = props;

    return (
        <form className="p-5" onSubmit={handleSubmit}>
            <h1>Sign up form</h1>

            <div className="form-group">
                <label>User name:</label>
                <input value={values.username} 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    name="username" 
                    type="text" 
                    placeholder="Enter your username" 
                    className="form-control"
                />
                <ErrorMessage component={error} name="username"/>
            </div>

            <div className="form-group">
                <label>Email:</label>
                <input value={values.email} 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    name="email" type="email" 
                    placeholder="Enter your email" 
                    className="form-control"
                />
                <ErrorMessage component={error} name="email"/>
            </div>

            <div className="form-group">
                <label>Fav Topis</label>
                <DropList 
                    options={options} 
                    value={values.topics}
                    onChange={setFieldValue} 
                    onBlur={setFieldTouched} 
                />
                <ErrorMessage component={error} name="topics"/>    
            </div>
            
            <span className="pr-1">
                <button onClick={handleReset} 
                    className="btn btn-secondary" 
                    disabled={!dirty || isSubmitting} 
                >
                    Reset
                </button>  
            </span>

            <span>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    submit
                </button>
            </span>

        </form>
    )
}

const EnhancedForm = formikWrapper(SignupForm)

export default EnhancedForm;
    