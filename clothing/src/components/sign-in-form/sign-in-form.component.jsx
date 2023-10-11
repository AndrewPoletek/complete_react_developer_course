import { useState } from "react";

import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { UserContext } from "../../context/user.context";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields;

    const resetFormFileds = () =>{
        setFormFields(defaultFormFields)
    }

    // It is my own code below
    // const handleSubmitMyOwn = async (event) =>{
    //     event.preventDefault()
    //     if(password|| email){
    //         try{
    //             let res = await createAuthUserWithEmailAndPassword(email, password)
    //             alert("Registered!")
    //         }catch(error){
    //             alert(error.message)
    //         }
    //     }

    // }

    //Code created in course
    const handleSubmit = async (event) =>{
        event.preventDefault()
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email, password)
            resetFormFileds();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert("incorrect password for email");
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }
            console.log(error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({ ...formFields, [name]: value})
    }

    const signInWithGoogle = async () =>{
        const {user} = await signInWithGooglePopup()
        
        
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <FormInput label="Email" type="email" required  onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required  onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit" onClick={handleSubmit}>Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;