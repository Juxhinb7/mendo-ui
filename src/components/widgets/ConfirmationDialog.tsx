import ConfirmationDialogComponentProps from "../../interfaces/modals/ConfirmationDialogComponentProps";
import Button from "../elements/Button";
import { ConfirmModalContext } from "../elements/ConfirmModal";
import { useContext } from "react";

const ConfirmationDialog: React.FC<ConfirmationDialogComponentProps> = (props): JSX.Element => {
    const setIsOpen = useContext(ConfirmModalContext);
    return (
        <div>
            <p className="mt-12 text-center">Are you sure you want to remove this entry ?</p>
            <div className="flex justify-around mt-12 space-x-4 w-64 mx-auto">
                <Button onClick={props.handleRemove} customColor="bg-red-600" hoverCustomColor="hover:bg-red-500" type="button" title="Yes"/>
                <Button onClick={() => setIsOpen(false)} type="button" title="Cancel"/>
            </div>

        </div>
    )

}

export default ConfirmationDialog;