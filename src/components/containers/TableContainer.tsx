import TableComponentProps from "../../interfaces/tables/TableContainerComponentProps"

const TableContainer: React.FC<TableComponentProps> = (props): JSX.Element => {
    return (
        <div className={`${props.data && props.data.length > 0 ? "overflow-auto": ""}  ${props.twHeight}`}>
            <div className="flex justify-center mt-9">
                <table className="min-w-full text-xs sm:text-lg">
                    {props.children}
                </table>
            </div>
        </div>

    )
}

export default TableContainer;