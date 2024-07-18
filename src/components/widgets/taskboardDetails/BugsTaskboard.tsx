import TaskboardContainer from "../../containers/TaskboardContainer"
import TaskboardColumn from "../../elements/TaskboardColumn";
import { TaskboardColumnContext, TaskboardTypeContext } from "../../pages/subpages/Taskboard";

const BugsTaskboard = (): JSX.Element => {
    return (
        <TaskboardContainer>
            <TaskboardTypeContext.Provider value="Bugs">
                
                <TaskboardColumnContext.Provider value={{state: 1, statusKey: 1, itemsCount: 0}}>
                    <TaskboardColumn>
                        <></>
                    </TaskboardColumn>
                </TaskboardColumnContext.Provider>

                <TaskboardColumnContext.Provider value={{state: 2, statusKey: 1, itemsCount: 0}}>
                    <TaskboardColumn>
                        <></>
                    </TaskboardColumn>
                </TaskboardColumnContext.Provider>

                <TaskboardColumnContext.Provider value={{state: 2, statusKey: 2, itemsCount: 0}}>
                    <TaskboardColumn>
                        <></>
                    </TaskboardColumn>
                </TaskboardColumnContext.Provider>

                <TaskboardColumnContext.Provider value={{state: 2, statusKey: 3, itemsCount: 0}}>
                    <TaskboardColumn>
                        <></>
                    </TaskboardColumn>
                </TaskboardColumnContext.Provider>

            </TaskboardTypeContext.Provider>
        </TaskboardContainer>
    )
}

export default BugsTaskboard;