import React,{useState, useEffect} from 'react'
import { Card, CardBody, Input} from '@windmill/react-ui'
import { Low, Meduim, Hight } from '../icons'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { addtasktoevent, initevnet } from '../actions/project' 

const TodoComponent = ({ currentuser ,myproject, addtasktoevent, initevnet}) => {
    const [projectStarted, setprojectStarted] = useState(false)


    function handlecheckbox (taskid) {
        const projectid = myproject._id
        addtasktoevent({taskid,projectid});
    }

    useEffect(() => {
        initevnet(myproject,currentuser);
    }, [])

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
                                        <div key={task._id} className='flex justify-between mt-10'>
                                            <div className="flex justify-between">
                                                <p className={!task.completed ? "text-xl mr-4 uppercase font-semibold text-gray-600 dark:text-gray-400" : "text-xl mr-4 line-through font-semibold text-gray-600 dark:text-gray-400" }>
                                                    {task.task}
                                                </p>

                                                <p className={!task.completed ? "text-xl mr-4 font-medium text-gray-600 dark:text-gray-400" :"text-xl mr-4 line-through font-medium text-gray-600 dark:text-gray-400" }>
                                                    {task.description}
                                                </p>

                                                <p className="text-xl font-normal text-gray-600 dark:text-gray-400">
                                                    {new Date(task.deadline).toLocaleDateString()}
                                                </p>
                                            </div>

                                            <div className="flex justify-between">
                                            { task.completed ? <Input type="checkbox" checked /> : <Input type="checkbox" name="copmlete" onChange={e => handlecheckbox(task._id)} />}

                                            </div>

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

TodoComponent.propTypes = {
    addtasktoevent : PropTypes.func.isRequired,
    initevnet :PropTypes.func.isRequired,
}

export default connect(null,{addtasktoevent,initevnet})(TodoComponent)
