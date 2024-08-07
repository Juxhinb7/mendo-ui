import { Suspense } from "react"

const  LazyComponent =  ({element}: {element: JSX.Element}): JSX.Element => {
    return (
        <>
            <Suspense fallback={
                <h1 className="flex justify-center items-center sm:px-6 min-h-[calc(100vh-10rem)]">
                    Loading...
                </h1>}>
                {element}
            </Suspense>
        </>
    )
}

export default LazyComponent;