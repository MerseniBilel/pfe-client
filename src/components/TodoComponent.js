import React,{useState, useEffect} from 'react'
import { Card, CardBody, Input} from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import { Link, Redirect } from 'react-router-dom';
import {PdfIcon} from '../icons';
import InfoCard from '../components/Cards/InfoCard';
import RoundIcon from './RoundIcon';  
import ChartCard from '../components/Chart/ChartCard'
import {Doughnut } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import { Low, Meduim, Hight } from '../icons'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { addtasktoevent, initevnet } from '../actions/project' 

import {
    doughnutOptions,
    doughnutLegends,
  } from '../utils/demo/chartsData'


const TodoComponent = ({ currentuser ,myproject, addtasktoevent, initevnet}) => {
    const [projectStarted, setprojectStarted] = useState(false)

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    function handlecheckbox (taskid) {
        const projectid = myproject._id
        addtasktoevent({taskid,projectid});
    }

    useEffect(() => {
        initevnet(myproject,currentuser);
    }, [])

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="mt-2"> 
                <img className="rounded-full h-32 w-32" src={myproject.projectOwner.avatar} alt="User image" /> 
                <div className="ml-2">
                </div>
                
                </div>
                <div className="mt-2">
                <PageTitle>{myproject.projectName}</PageTitle>
                

                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <Card colored className="text-white bg-purple-600 col-span-2">
            <CardBody>
              <p className="mb-4 font-semibold">Project Description</p>
              <p>
              {myproject.projectDesc}
              </p>
            </CardBody>
          </Card>

          <Link to='' onClick={() => openInNewTab(myproject.projectFile)}>
            <InfoCard 
              title='project pdf file desciption'
              value='Click Here to download the pdf file'
              >
              <RoundIcon
              icon={PdfIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
              />

            </InfoCard>
          </Link>

       
        </div>

            <div className=" mt-4 flex">
                <div>
                <ChartCard title="Productivity">
                    <Doughnut {...doughnutOptions} />
                    <ChartLegend legends={doughnutLegends} />
                </ChartCard>
                </div>

                <div className="flex-auto">
                    <Card className="mb-8 shadow-md">
                        <CardBody >
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
