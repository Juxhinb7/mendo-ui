import { Calendar } from "react-widgets/cjs";
import Card from "../../elements/Card";
import {DAY, MONTH, NUMDAY} from "../../../constants/date";
import Weather from "../../widgets/Weather";
import Modal from "../../elements/Modal";
import CustomizationMenu from "../../widgets/CustomizationMenu";
import { BackgroundHandlerContext } from "../../../contexts/BackgroundHandlerContext";
import { useContext } from "react";

const Home: React.FC = () => {

    const setBackground = useContext(BackgroundHandlerContext);

    return (
        
        <div className="w-full flex flex-col overflow-auto">
            <h1 className="sm:text-md">{DAY}, {MONTH} {NUMDAY}</h1>
            <h1 className="text-xl font-medium sm:text-2xl whitespace-nowrap">
                Hi, Welcome back 👋
            </h1>
            <div className="flex flex-col 2xl:flex-row items-end justify-end 2xl:space-x-6 mt-24">
                <div className="flex">
                    <Modal  type="button" buttonTitle="Customize" dialogTitle="Customization">
                        <CustomizationMenu setBackground={setBackground}/>
                    </Modal>
                </div>

            </div>
            <div className="flex flex-col 2xl:flex-row justify-center items-center 2xl:space-x-6 mt-24">
                <Card title="Weather">
                    <Weather />
                </Card>
                <Card title="Calendar">
                    <Calendar bordered={false} defaultValue={new Date()} />
                </Card>
            </div>
        </div>

    )
}

export default Home;