import { useState } from "react";
import FormContainer from "../containers/FormContainer"
import Form from "../elements/Form"
import Input from "../elements/Input"
import InputErrorBoundary from "../errorBoundaries/InputErrorBoundary";
import { ComponentHandlerContext } from "../../contexts/ComponentHandlerContext";
import { ErrorAlert, SuccessAlert } from "../elements/alerts";
import Button from "../elements/Button";
import useToken from "../../hooks/useToken";
import useSubmitCredentials from "../../hooks/useSubmitCredentials";
import { Link } from "react-router-dom";

const SignIn = () => {
    const URL = "https://starfish-app-hso4j.ondigitalocean.app/users/api/login/";
    const [email, setEmail] = useState<string>("testuser@mendo.com");
    const [password, setPassword] = useState<string>("testuser99");
    const { setToken } = useToken();
    const submitProps = useSubmitCredentials(URL, {email, password}, setToken, {redirectUrl: "/my-environment/home"});
    return (
        <FormContainer>
            <h1 className="text-2xl font-extrabold text-cyan-600 sm:text-3xl mx-auto">
                Welcome back!
            </h1>
            <p className="mx-auto max-w-2xl mt-4 text-gray-600">
                Ready to dive into Mendo? Let's get started!
            </p>
            <Form title="Sign in" submitHandler={submitProps.submitData}>
                {submitProps.successMessage && submitProps.toggle && (
                    <ComponentHandlerContext.Provider value={submitProps.setToggle}>
                        <SuccessAlert message={submitProps.successMessage}/>
                    </ComponentHandlerContext.Provider>
                )}
                {submitProps.errorMessage && submitProps.toggle && (
                    <ComponentHandlerContext.Provider value={submitProps.setToggle}>
                        <ErrorAlert message={submitProps.errorMessage}/>
                    </ComponentHandlerContext.Provider>
                )}
                <InputErrorBoundary error={(submitProps.errorObject as any)?.email}>
                    <Input type="email" value={email} placeholder="Enter email" onChange={event => setEmail(event.target.value)}/>                
                </InputErrorBoundary>
                <InputErrorBoundary error={(submitProps.errorObject as any)?.password}>
                    <Input type="password" value={password} placeholder="Enter password" onChange={event => setPassword(event.target.value)}/>
                </InputErrorBoundary>
                <Button title="Sign in" type="submit" processing={submitProps.processing}/>
                <p>You don't have an account ? <Link to="/sign-up" className="ml-1 text-blue-900">Sign up instead</Link></p>
            </Form>
        </FormContainer>
    )
}

export default SignIn;