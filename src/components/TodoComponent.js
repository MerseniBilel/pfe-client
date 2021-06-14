import React,{useState} from 'react'
import { Card, CardBody} from '@windmill/react-ui'
const TodoComponent = ({ currentuser ,myproject}) => {
    const [projectStarted, setprojectStarted] = useState(false)
    return (
        <>
            <div className=" mt-4 flex">
                <div className="flex-auto">
                    <Card className="mb-8 shadow-md">
                        <CardBody >
                            
                            <p className="text-xl flex justify-center text-center font-bold text-gray-600 dark:text-gray-400">
                            <img className="rounded-full mr-4 h-8 w-8" src={myproject.projectOwner.avatar} alt="User image" />
                            {myproject.projectName}
                            </p>

                            {myproject.tasks.map(task => {
                                if(task.teamMember == currentuser._id){
                                    return (
                                        <div class='flex justify-between mt-10'>
                                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                {task.description}
                                            </p>
                                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                {new Date(task.deadline).toLocaleDateString()}
                                            </p>

                                        </div>
                                    )
                                }
                            })}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default TodoComponent
