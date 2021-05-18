import React from 'react'

// redux stuff


import PageTitle from './Typography/PageTitle'
import SectionTitle from './Typography/SectionTitle'
import { Card, CardBody,Avatar } from '@windmill/react-ui'
import ProjectCard from './Cards/InfoCard';

const AdminProjects = ({projectsData}) => {
  
  const {startedPorjects , notStartedProjects} = projectsData;

    return (
        <>
        <PageTitle>Project List 📝</PageTitle>
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

  
      </>
    )
}

export default AdminProjects

