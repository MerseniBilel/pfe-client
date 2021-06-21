import React,{useState,useEffect} from 'react'
import Select from 'react-select'
import {Link} from 'react-router-dom'
// redux stuff
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {addProject} from '../actions/project';

import PageTitle from './Typography/PageTitle'
import SectionTitle from './Typography/SectionTitle'
import { Card, CardBody,Avatar, Button,Modal, ModalHeader, ModalBody, ModalFooter,Label, Input,Textarea} from '@windmill/react-ui'
import ProjectCard from './Cards/InfoCard';
import DashboardAlert from './DashboardAlert'


const AdminProjects = ({projectsData,logedinuser,usersData,addProject}) => {
  
  

  const [usersOptions, setusersOptions] = useState([])
  const [selectedValue, setSelectedValue] = useState([]);
  const {startedPorjects , notStartedProjects} = projectsData;
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setformData] = useState({
    projectName:'',
    projectDesc:'',
    projectOwner:logedinuser._id
  })
  const [file, setfile] = useState('');
  const [filename, setfilename] = useState('');
  
  const saveFile = (e) => {
      setfile(e.target.files[0]);
      setfilename(e.target.files[0].name);
  };



  useEffect(() => {
    console.log(usersData);
    /* state.filter(alert => alert.id !== payload); */
    const filtreduser = usersData.filter(u => u.role == 2);
    setusersOptions(filtreduser.map(u => {
        return {
          label:<div className="flex justify-between">
            <img className="flex-shrink-0 h-6 w-6 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"/>
            <span className="text-gray-700">{u.email}</span>
          </div>,
          value:u._id
        }
    }))
  }, [])




  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
  }


  const onSubmit = e => {

    const { projectName, projectDesc, projectOwner } = formData
    e.preventDefault();
    const projectData = new FormData();
    projectData.append('file', file);
    projectData.append('projectName', projectName);
    projectData.append('projectDesc', projectDesc);
    projectData.append('projectOwner', projectOwner);
    projectData.append('selectedValue', selectedValue);

    addProject(projectData, projectOwner);

  }

  const onChange = e => setformData({...formData, [e.target.name]:e.target.value})

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

    return (
        <>
        <div className="flex justify-between">
          <PageTitle>Project List 📝</PageTitle>
          {
            logedinuser.role == 1 ? <div className="my-6"><Button onClick={openModal} >add Project</Button></div> : <div></div>
          }

        </div>
        
        <Card className="mb-8 shadow-md">
          <CardBody>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This list contain all the projects avalable, projcet owners and team member 
            </p>
          </CardBody>
        </Card>
  
        <SectionTitle>Started Projects </SectionTitle>
        {
          startedPorjects.length == 0 ? <Card colored className="text-white bg-purple-600">
          <CardBody>
            <p className="mb-4 font-semibold">Hey 👋</p>
            <p>
              Sorry for that 😞, but no Started projects yet, the check the not started project list below, have a good day  
            </p>
          </CardBody>
        </Card> :<div className="grid  gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    {
                      startedPorjects.map((spr) => {
                        return(
                          <Link to={`projects/${spr._id}`}>
                          <ProjectCard key={spr._id} title={spr.projectOwner.email} value={spr.projectName} border="true">
                            <Avatar  size="large" className="hidden mr-4 md:block" src={spr.projectOwner.avatar} alt="User image" />
                          </ProjectCard>
                          </Link>                                   
                        )
                      })
                    }
                  </div>
        }
        
        

        <SectionTitle>not Started Projects</SectionTitle>
        {
          notStartedProjects.length == 0 ? <Card colored className="text-white bg-purple-600">
                                              <CardBody>
                                                <p className="mb-4 font-semibold">Hey 👋</p>
                                                <p>
                                                  No pending project here, i think all project are on progress or we have no project for today, have a nice day
                                                </p>
                                              </CardBody>
                                          </Card> 
                                          :
                                          <div className="grid  gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                                          {notStartedProjects.map((pr) => {
                                            return(
                                              <Link key={pr._id} to={`projects/${pr._id}`}>
                                            <ProjectCard key={pr._id} title={pr.projectOwner.email} value={pr.projectName} border="true">
                                                <Avatar  size="large" className="hidden mr-4 md:block" src={pr.projectOwner.avatar} alt="User image" />
                                            </ProjectCard>
                                            </Link>
                                         
                                            )
                                          })
                                        }
                                        </div>
        }

<Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>add new project</ModalHeader>
        <div className="mt-4 mb-4">
        <DashboardAlert/>
        </div>
        <ModalBody>
          this form is for adding a new project, just add the project name, desctription and then click at the project and complete the form
          next step : add the team members and the project taks
        </ModalBody>

        <form onSubmit={e => onSubmit(e)}>
          <Label>
            <span>Name</span>
            <Input className="mt-1" name="projectName" onChange={(e) => onChange(e)} placeholder="User Name" required />
          </Label>

          <Label className="mt-4">
          <span>Team Member</span>
          <Select className="mt-1 " onChange={handleChange} isMulti  options={usersOptions} />
          </Label>

          <Label className="mt-4">
            <span>Description</span>
            <Textarea className="mt-1" onChange={(e) => onChange(e)} rows="8" name="projectDesc" placeholder="project desciption here" required />
          </Label>

          <div>
            <Label className="mt-4">Peroject file</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={saveFile}/>
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF up to 25MB</p>
                    </div>
                </div>
        </div>



          <ModalFooter>

            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button type="submit" >save project</Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button type="submit" block size="large">
                save project
              </Button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      </>
    )
}

AdminProjects.propTypes = {
  addProject:PropTypes.func.isRequired,
}

export default connect(null,{addProject})(AdminProjects)

