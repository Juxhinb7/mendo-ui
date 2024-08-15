import { ReactNode, Suspense } from "react"

type LazyProps = {
    fallback: ReactNode,
    element: ReactNode
}

const  LazyComponent =  ({...restProps}: LazyProps): JSX.Element => {
    let {fallback, element} = restProps;
    return (
        <>
            <Suspense fallback={fallback}>
                {element}
            </Suspense>
        </>
    )
}

export default LazyComponent;