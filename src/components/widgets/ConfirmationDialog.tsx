import ConfirmationDialogComponentProps from "../../interfaces/modals/ConfirmationDialogComponentProps";
import Button from "../elements/Button";

const ConfirmationDialog: React.FC<ConfirmationDialogComponentProps> = (props): JSX.Element => {
    return (
        <div>
            <p className="mt-12 text-center">Are you sure you want to remove this entry ?</p>
            <div className="flex justify-center mt-12 w-32 mx-auto">
                <Button onClick={props.handleRemove} customColor="bg-red-600" hoverCustomColor="hover:bg-red-500" type="button" title="Yes"/>
            </div>

        </div>
    )

}

export default ConfirmationDialog;