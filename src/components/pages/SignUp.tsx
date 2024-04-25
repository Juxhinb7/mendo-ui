import React, {useState} from "react";
import { Link } from "react-router-dom";
import { ErrorAlert, SuccessAlert } from "../elements/alerts";
import Form from "../elements/Form";
import FormContainer from "../containers/FormContainer";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { ComponentHandlerContext } from "../../contexts/ComponentHandlerContext";
import InputErrorBoundary from "../errorBoundaries/InputErrorBoundary";
import useSubmitCredentials from "../../hooks/useSubmitCredentials";



const SignUp: React.FC = (): JSX.Element => {

    const URL = "https://starfish-app-hso4j.ondigitalocean.app/users/api/register/";
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const submitProps = useSubmitCredentials(URL, {email, name, password});

    return (
        <FormContainer>
                <h1 className="text-2xl font-extrabold text-cyan-600 sm:text-3xl mx-auto">Get started today</h1>
                <p className="mx-auto max-w-2xl mt-4 text-gray-600">
                    Your project's success story starts with a simple sign-up. Take control, stay organized, and propel your projects to new heights.
                </p>
                <Form title="Sign up" submitHandler={submitProps.submitData}>
                    {submitProps.successMessage && submitProps.toggle && (
                        <ComponentHandlerContext.Provider value={submitProps.setToggle}>
                            <SuccessAlert message={submitProps.successMessage} />
                        </ComponentHandlerContext.Provider>
                        
                    )}
                    {submitProps.errorMessage && submitProps.toggle && (
                        <ComponentHandlerContext.Provider value={submitProps.setToggle}>
                            <ErrorAlert message={submitProps.errorMessage}/>
                        </ComponentHandlerContext.Provider>

                    )}
                    <InputErrorBoundary error={(submitProps.errorObject as any)?.name}>
                        <Input  
                            type="text" 
                            placeholder="Enter name" 
                            value={name} 
                            onChange={event => setName(event.target.value)} 
                        />
                    </InputErrorBoundary>

                    <InputErrorBoundary error={(submitProps.errorObject as any)?.email}>
                        <Input 
                            marginTop="mt-4"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </InputErrorBoundary>

                    <InputErrorBoundary error={(submitProps.errorObject as any)?.password}>
                        <Input
                            marginTop="mt-4"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            
                        />                   
                    </InputErrorBoundary>

                    <Button title="Sign up" type="submit" processing={submitProps.processing}/>
                    

                    <p className="text-sm font-medium text-gray-600">
                        Already a user?
                        <Link className="ml-1 text-blue-900" to="/sign-in">Login</Link>
                    </p>
                </Form>
        </FormContainer>
    )
}

export default SignUp;