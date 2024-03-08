import { useState } from "react";
import FormContainer from "../containers/FormContainer";
import Button from "../elements/Button";
import Form from "../elements/Form";
import Input from "../elements/Input";
import { SuccessAlert, ErrorAlert } from "../elements/alerts";
import { ComponentHandlerContext } from "../../contexts/ComponentHandlerContext";
import InputErrorBoundary from "../errorBoundaries/InputErrorBoundary";
import useSubmitCredentials from "../../hooks/useSubmitCredentials";

const Activation: React.FC = (): JSX.Element => {
    const URL = "http://127.0.0.1:8000/users/api/activate/";
    const [email, setEmail] = useState<string>("");
    const [activationCode, setActivationCode] = useState<string>("");
    const submitProps = useSubmitCredentials(URL, {email, activationCode});

    return (
        <FormContainer>
            <Form title="Activate your account" submitHandler={submitProps.submitData}>
                {submitProps.successMessage && submitProps.toggle && (
                    <ComponentHandlerContext.Provider value={submitProps.setToggle}>
                        <SuccessAlert message={submitProps.successMessage}/>
                    </ComponentHandlerContext.Provider>

                )}
                {submitProps.errorMessage && submitProps.toggle && (
                    <ComponentHandlerContext.Provider value={submitProps.setToggle}>
                        <ErrorAlert message={submitProps.errorMessage} />
                    </ComponentHandlerContext.Provider>
                )}
                <InputErrorBoundary error={(submitProps.errorObject as any)?.email}>
                    <Input name="email" type="email" placeholder="Enter email" value={email} onChange={event => setEmail(event.target.value)}/>
                </InputErrorBoundary>
               
                <InputErrorBoundary error={(submitProps.errorObject as any)?.activationCode}>
                    <Input name="activationCode" type="text" placeholder="Enter activation code" value={activationCode} onChange={event => setActivationCode(event.target.value)}/>
                </InputErrorBoundary>
                <Button title="Submit" type="submit" processing={submitProps.processing}/>
            </Form>
        </FormContainer>
    )
}

export default Activation;