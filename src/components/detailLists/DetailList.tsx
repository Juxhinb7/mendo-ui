import { Link } from "react-router-dom";
import DetailListComponentProps from "../../interfaces/detailLists/DetailListComponentProps";
import TableContainer from "../containers/TableContainer";
import SectionContainer from "../containers/SectionContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


const DetailList: React.FC<DetailListComponentProps> = (props): JSX.Element => {
    const handleRemove = async (item: {[key: string]: string}, e: React.MouseEvent) => {
        const response = await axios({ method: "DELETE", url: "http://127.0.0.1:8000/project_management" + props.serverRoute + item.id, headers: { Authorization: "Bearer " + props.token }});
        console.log(response);
        const filteredSubData = props.data[props.someKey].filter((m: any) => m.id != item.id);
        props.setData((prevData: any) => {
            return {
                ...prevData,
                [props.someKey]: filteredSubData
            }
        });
        e.preventDefault();

 
    }
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

                                {props.subData.map((item: {[key: string]: string}) => (
                                    <tr className="hover:bg-gray-50" key={item.id}>
                                        <td>
                                            <p>{item.id}</p>
                                        </td>
                                        <td>
                                            <Link to={props.url + item.id}>
                                                {item.title}
                                            </Link>
                                        </td>
                                        <td className="space-x-4">
                                            <FontAwesomeIcon icon={faTrash} className="text-red-600 cursor-pointer" onClick={(e: React.MouseEvent) => handleRemove(item, e)}/>
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