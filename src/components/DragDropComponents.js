import React,{useEffect, useState} from 'react'
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter,Label, Input,Textarea, Select } from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import DragNDrop from '../components/DragNDrop';
import {PdfIcon} from '../icons';
import InfoCard from '../components/Cards/InfoCard';
import RoundIcon from './RoundIcon';  
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { addtask } from '../actions/tasks';
import { deleteProject } from '../actions/project';
import DashboardAlert from './DashboardAlert'
import { TrashIcon } from '../icons';


const DragDropComponents = ({data, myproject,addtask,deleteProject}) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [is2ModalOpen, setIs2ModalOpen] = useState(false)
  const [formData, setformData] = useState({
    task:'',
    description:'',
    projectOwner:myproject.projectOwner._id,
    projectId:myproject._id,
    deadline:'',
    periority:'',

  })
  const [deleted, setdeleted] = useState(false);
  const [todelete, settodelete] = useState({
    projectid: myproject._id
  })

  const onChange = e => setformData({...formData, [e.target.name]:e.target.value})

  const onSubmit = e => {
    e.preventDefault();
    const {task,description,periority,deadline, projectId, projectOwner} = formData;
    console.log(task)
    console.log(description)
    console.log(periority)
    console.log(deadline)
    console.log(projectId)
    console.log(projectOwner)
    addtask({ task,description,periority,deadline, projectId, projectOwner });
  }

  const on2Submit = e => {
    e.preventDefault();
    const { projectid } = todelete
    deleteProject({projectid})
    setdeleted(true)
   
  }

  function openModal() {
    setIsModalOpen(true)
  }
  function open2Modal() {
    setIs2ModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    window.location.reload(false);
  }
  function close2Modal() {
    setIs2ModalOpen(false)
    window.location.reload(false);
  }
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }


    

   useEffect(() => {
    //window.location.reload(false);
   }, [])
   if(deleted){
     return <Redirect to="/app/projects" />;
   }else {
    return (
        <>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>add new task</ModalHeader>
        <div className="mt-4 mb-4">
        <DashboardAlert/>
        </div>
        <ModalBody>
          this form is for adding a new task, you can drag and drop tasks to specific user 
        </ModalBody>

        <form onSubmit={e => onSubmit(e)}>
          <Label>
            <span>Task Name</span>
            <Input className="mt-1" name="task" onChange={(e) => onChange(e)} placeholder="User Name" required />
          </Label>

          <Label>
            <span>Task Description</span>
            <Input className="mt-1" name="description" onChange={(e) => onChange(e)} placeholder="User Name" required />
          </Label>

          <Label>
            <span>Task Deadline</span>
            <Input className="mt-1" type="date" name="deadline" onChange={(e) => onChange(e)} placeholder="User Name" required />
          </Label>

          <Label>
          <span>Priority</span>
          <Select name='periority' className="mt-1" onChange={(e) => onChange(e)}>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='hight'>Hight</option>
          </Select>
        </Label>

          <Label>
            <Input className="mt-1" type="hidden" name="projectOwner" required />
          </Label>
          <Label>
            <Input className="mt-1" type="hidden" name="projectid" required/>
          </Label>
          <ModalFooter>

            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button type="submit" >save task</Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button type="submit" block size="large">
                save task
              </Button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      <Modal isOpen={is2ModalOpen} onClose={close2Modal}>
        <ModalHeader>Delete this project </ModalHeader>
        <ModalBody>
          are you sure you want to delete this project
          <form onSubmit={e => on2Submit(e)}>
          <ModalFooter>
            <Button type='submit' className="w-full sm:w-auto">Delete</Button>
          </ModalFooter>
          </form>
          
        </ModalBody>
      </Modal>

        <div className="flex items-center justify-between">
            <div className="mt-2"> 
            <img className="rounded-full h-32 w-32" src={myproject.projectOwner.avatar} alt="User image" /> 
            <div className="ml-2">
              <Button  iconLeft={TrashIcon} onClick={open2Modal} className="mt-4" >
                     delete 
              </Button>
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

        <Button onClick={openModal} className="mt-4" >
            add task
        </Button>

        <DragNDrop data={data} />
        </>
    )
  }
}

DragDropComponents.propTypes = {
  addtask:PropTypes.func.isRequired,
  deleteProject:PropTypes.func.isRequired,
}

export default connect(null,{addtask,deleteProject})(DragDropComponents)
