interface Submittable {
    processing: undefined | boolean;
    successMessage: string;
    errorMessage: string;
    errorObject: null;
    toggle: undefined | boolean
    setProcessing: React.Dispatch<React.SetStateAction<undefined | boolean>>;
    setToggle: React.Dispatch<React.SetStateAction<undefined | boolean>>;
    submitData: (event: React.FormEvent) => void;

}

export default Submittable;