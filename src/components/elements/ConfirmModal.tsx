import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, createContext, useState } from "react"

type  ConfirmModalProps = {
    dialogTitle: string;
    children: React.ReactNode;
}

export const ConfirmModalContext = createContext<(React.Dispatch<React.SetStateAction<boolean>>)>(null!);

const ConfirmModal = (props: ConfirmModalProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <FontAwesomeIcon icon={faTrash} className=" text-red-600 cursor-pointer" onClick={ () => setIsOpen(true)}/>
        <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25"/>
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"    
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title>
                                        {props.dialogTitle}
                                    </Dialog.Title>
                                    <ConfirmModalContext.Provider value={setIsOpen}>
                                        <div className="mt-2">
                                            {props.children}
                                        </div>
                                    </ConfirmModalContext.Provider>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ConfirmModal;