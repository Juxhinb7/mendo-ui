const DetailContainer = (props: any): JSX.Element => {
    return (
        <div className="flex flex-col 2xl:flex-row justify-center 2xl:space-x-12">
            {props.children}
        </div>
    )

}

export default DetailContainer;