import React,{useState,useEffect} from 'react'
import Select from 'react-select'
// redux stuff


import PageTitle from './Typography/PageTitle'
import SectionTitle from './Typography/SectionTitle'
import { Card, CardBody,Avatar, Button,Modal, ModalHeader, ModalBody, ModalFooter,Label, Input,Textarea} from '@windmill/react-ui'
import ProjectCard from './Cards/InfoCard';
import e from 'cors'

const AdminProjects = ({projectsData,logedinuser,usersData}) => {
  
  

  const [usersOptions, setusersOptions] = useState([])
  const [selectedValue, setSelectedValue] = useState([]);
  const {startedPorjects , notStartedProjects} = projectsData;
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setformData] = useState({
    projectName:'',
    projectDesc:'',
  })


  useEffect(() => {
    setusersOptions(usersData.map(u => {
      return {
        label:<div className="flex justify-between">
          <img className="flex-shrink-0 h-6 w-6 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"/>
          <span className="text-gray-700">{u.email}</span>
        </div>,
        value:u._id
      }
    }))
  }, [])

  console.log(usersOptions);


  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
  }


  const onSubmit = e => {

    e.preventDefault();
    console.log(formData)
    console.log(selectedValue)
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
            <p className="mb-4 font-semibold">Hey admin 👋</p>
            <p>
              Sorry for that 😞, but no Started projects yet, the check the not started project list below, have a good day  
            </p>
          </CardBody>
        </Card> :<div className="grid  gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    {
                      startedPorjects.map((spr) => {
                        return(
                          <ProjectCard key={spr._id} title={spr.projectOwner.email} value={spr.projectName} border="true">
                            <Avatar  size="large" className="hidden mr-4 md:block" src={spr.projectOwner.avatar} alt="User image" />
                          </ProjectCard>                                         
                        )
                      })
                    }
                  </div>
        }
        
        

        <SectionTitle>not Started Projects</SectionTitle>
        {
          notStartedProjects.length == 0 ? <Card colored className="text-white bg-purple-600">
                                              <CardBody>
                                                <p className="mb-4 font-semibold">Hey admin 👋</p>
                                                <p>
                                                  No pending project here, i think all project are on progress or we have no project for today, have a nice day
                                                </p>
                                              </CardBody>
                                          </Card> 
                                          :
                                          <div className="grid  gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                                          {notStartedProjects.map((pr) => {
                                            return(
                                            <ProjectCard key={pr._id} title={pr.projectOwner.email} value={pr.projectName} border="true">
                                                <Avatar  size="large" className="hidden mr-4 md:block" src={pr.projectOwner.avatar} alt="User image" />
                                            </ProjectCard>
                                    
                                         
                                            )
                                          })
                                        }
                                        </div>
        }

<Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>add new project</ModalHeader>
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
            <Textarea className="mt-1" onChange={(e) => onChange(e)} rows="3" name="projectDesc" placeholder="project desciption here" required />
          </Label>



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

export default AdminProjects

