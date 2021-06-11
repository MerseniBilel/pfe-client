import React,{useState, useRef, useEffect} from 'react'
import DragableCards from './Cards/DragableCards';
import {Todo, Done} from '../icons/index';
import RoundIcon from './RoundIcon';
import uuid from 'react-uuid'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {updateTasks} from '../actions/tasks';


/*
<ProjectCard key={spr._id} title={spr.projectOwner.email} value={spr.projectName} border="true">
<Avatar  size="large" className="hidden mr-4 md:block" src={spr.projectOwner.avatar} alt="User image" />
</ProjectCard>
*/

const DragNDrop = ({data,updateTasks}) => {

    const [list, setlist] = useState(data)
    const [Dragging, setDragging] = useState(false)


    const dragItem = useRef();
    const dragNode = useRef();


    const handleDragStart = (e, params) =>{
        dragItem.current = params;    
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend',handleDragEnd)
        setTimeout(() => {
            setDragging(true);
        },0)
        
        
    }

    const handleDragEnd = () => {
        setDragging(false);
        dragNode.current.removeEventListener('dragend',handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
        
        
    }

    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current;
        if(e.target != dragNode.current){

            setlist(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList)); // (deep copy) get a copy from list
                newList[params.grpI].tasks.splice(params.itemI, 0, newList[currentItem.grpI].tasks.splice(currentItem.itemI,1)[0]);
                dragItem.current = params;
                return newList; //return the new list
                
            });
            
        }
        
        
    }

    if(!Dragging){
        console.log(list);
        updateTasks(list);
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
                    className="mb-4 h-24 rounded-md cursor-pointer text-gray-700"
                    >
                        <DragableCards  key={uuid()} deadline={new Date(item.deadline).toLocaleDateString()} title={item.teskTitle} value={item.content} border="true">
                        <RoundIcon
                            icon={item.completed ? Done : Todo}
                            iconColorClass="text-orange-500 dark:text-orange-500"
                            bgColorClass="bg-orange-100 dark:bg-orange-200"
                            className="mr-4"
                            />
                        </DragableCards>
                    </div>
                )) }
             </div>   
            ))}
        </div>

        </>
    )
}
DragNDrop.propTypes = {
    updateTasks : PropTypes.func.isRequired,
}

export default connect(null,{updateTasks})(DragNDrop)
