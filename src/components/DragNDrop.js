import React,{useState} from 'react'
import ProjectCard from './Cards/ProjectCard';
import { Avatar } from '@windmill/react-ui'

/*
<ProjectCard key={spr._id} title={spr.projectOwner.email} value={spr.projectName} border="true">
<Avatar  size="large" className="hidden mr-4 md:block" src={spr.projectOwner.avatar} alt="User image" />
</ProjectCard>
*/

const DragNDrop = ({data, usersTasks}) => {

    const [list, setlist] = useState(data)
    const [userlisttasks, setuserlisttasks] = useState(usersTasks)

    const handleDragStart = (e, params) =>{
        console.log("Drag started",params)
    }

    return (
        <>
        {list.map((grp,grpI) => (
        <div key={grpI} className="grid mt-4 gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            {grp.tasks.map((task,taskI) =>(
            <div key={taskI} draggable onDragStart={(e) => {handleDragStart(e,{grpI,taskI})}}>
                <ProjectCard title={task.teskTitle} value={task.content} border="true">
                    <Avatar size="large" className="hidden mr-4 md:block" src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="User image" />
                </ProjectCard>
            </div>
            ))}
        </div> 
        ))}
                     

        <div className="grid grid-cols-4 text-center gap-3 mt-4">
            {userlisttasks.map((grp, grpI) => (
             <div key={grp.user} className="bg-purple-700 p-3 rounded-md">
                 <div className="text-white font-bold" >{grp.user}</div>
                { grp.tasks.map((item,itemI) => (
                    <div key={item.id} draggable className="mb-4 h-24 rounded-md text-gray-700">
                        <ProjectCard  key={item.id} title={item.teskTitle} value={item.content} border="true">
                            <Avatar  size="large" className="hidden mr-4 md:block" src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="User image" />
                        </ProjectCard>
                    </div>
                )) }
             </div>   
            ))}
        </div>
        </>
    )
}

export default DragNDrop
