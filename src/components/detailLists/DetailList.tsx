import { Link } from "react-router-dom";
import DetailListComponentProps from "../../interfaces/detailLists/DetailListComponentProps";
import TableContainer from "../containers/TableContainer";
import SectionContainer from "../containers/SectionContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DetailList: React.FC<DetailListComponentProps> = (props): JSX.Element => {
    return (
        <div>
            <div className="2xl:w-96  mx-auto mt-4 mb-4">
                <SectionContainer title={props.title}>
                    <TableContainer twHeight="max-h-[15vh]">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr className="hover:bg-gray-50">
                                {props.headings.map((heading: string) => (
                                    <th className="px-1 sm:px-6 py-2 font-medium text-gray-900">{heading}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="border-t divide-y">

                                {props.data.map((item: {[key: string]: string}) => (
                                    <tr className="hover:bg-gray-50">
                                        <td key={props.data.id}>
                                            <p>{item.id}</p>
                                        </td>
                                        <td key={props.data.id}>
                                            <Link to={props.url + item.id}>
                                                {item.title}
                                            </Link>
                                        </td>
                                        <td className="space-x-4">
                                            <FontAwesomeIcon icon={faTrash} className="text-red-600 cursor-pointer"/>
                                        </td>
                                    </tr>
                                ))}

                        </tbody>
                    </TableContainer>
                </SectionContainer> 

            </div>

        </div>
    )
}

export default DetailList;