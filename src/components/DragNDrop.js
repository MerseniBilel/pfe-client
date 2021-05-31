import React,{useState, useRef} from 'react'
import ProjectCard from './Cards/ProjectCard';
import { Avatar } from '@windmill/react-ui'
import uuid from 'react-uuid'

/*
<ProjectCard key={spr._id} title={spr.projectOwner.email} value={spr.projectName} border="true">
<Avatar  size="large" className="hidden mr-4 md:block" src={spr.projectOwner.avatar} alt="User image" />
</ProjectCard>
*/

const DragNDrop = ({data}) => {

    const [list, setlist] = useState(data)
    const [Dragging, setDragging] = useState(false)

    const dragItem = useRef();
    const dragNode = useRef();


    const handleDragStart = (e, params) =>{
        console.log("Drag started",params);
        dragItem.current = params;    
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend',handleDragEnd)
        setTimeout(() => {
            setDragging(true);
        },0)
        
    }

    const handleDragEnd = () => {
        console.log('Ending drag ... ')
        setDragging(false);
        dragNode.current.removeEventListener('dragend',handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    }

    const handleDragEnter = (e, params) => {
        console.log('in the table ',params)
        const currentItem = dragItem.current;
        if(e.target != dragNode.current){
            console.log('not is the same table');
            setlist(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList)); // (deep copy) get a copy from list
                newList[params.grpI].tasks.splice(params.itemI, 0, newList[currentItem.grpI].tasks.splice(currentItem.itemI,1)[0]);
                dragItem.current = params;
                return newList; //return the new list
            })
        }
    }



    return (
        <>           
        <div className="grid grid-cols-4 text-center gap-3 mt-4">
            {list.map((grp, grpI) => (
             <div 
             key={uuid()}
             onDragEnter={Dragging && !grp.tasks.length ? (e)=> handleDragEnter(e,{grpI, itemI : 0}): null} 
             className={grpI == 0 ? 'col-span-4 p-3 rounded-md' : 'bg-purple-700 p-3 rounded-md3'}>
                 <div className="text-white font-bold mt-1 mb-4" >{grp.user}</div>
                { grp.tasks.map((item,itemI) => (
                    <div
                    key={uuid()}
                    draggable
                    onDragStart={(e) => {handleDragStart(e,{grpI,itemI})}}
                    onDragEnter={Dragging ? (e) =>handleDragEnter(e,{grpI,itemI}): null}
                    className="mb-4 h-24 rounded-md text-gray-700"
                    >
                        <ProjectCard  key={uuid()} title={itemI} value={itemI} border="true">
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
