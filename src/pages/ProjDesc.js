import React from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, Button} from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import DragNDrop from '../components/DragNDrop';

const ProjDesc = () => {
    
    const data = [
        {
            user:'69qsd65qsd95qsd',
            tasks:[
                { id:"1", teskTitle:"Title", deadline :"2021-05-29",content:"this is a content" },
                { id:"2", teskTitle:"Title", deadline :"2021-05-31",content:"this is a content" },
                { id:"3", teskTitle:"Title", deadline :"2021-06-07",content:"this is a content" },
                { id:"3", teskTitle:"Title", deadline :"2021-06-12",content:"this is a content" }
            ]
        }
    ]
    const usertasks = [
        {
            user : '69cac6595cs659sc9',
            tasks : [
                { id:"1", teskTitle:"Title", deadline :"2021-05-29",content:"this is a content" },
            ]
        },
        {
            user : '69cac6595cs659sc9',
            tasks : [
                { id:"1", teskTitle:"Title", deadline :"2021-05-29",content:"this is a content" },
            ]
        },
        {
            user : '69cac6595cs659sc9',
            tasks : [
                { id:"1", teskTitle:"Title", deadline :"2021-05-29",content:"this is a content" },
            ]
        },
        {
            user : '69cac6595cs659sc9',
            tasks : [
                { id:"1", teskTitle:"Title", deadline :"2021-05-29",content:"this is a content" },
            ]
        }
    ]

    return (
        <>
        <div className="flex items-center justify-between">
            <div className="mt-2"> 
            <img className="rounded-full h-32 w-32" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="User image" /> 
            </div>
            <div className="mt-2">
            <PageTitle>Project Name</PageTitle>
            </div>
        </div>

        <div className="mt-8">
        <Card colored className="text-white bg-purple-600">
          <CardBody>
            <p className="mb-4 font-semibold">Project Description</p>
            <p>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
            If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
            making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour,
            or non-characteristic words etc.
            </p>
          </CardBody>
        </Card>
        </div>

        <Button className="mt-4" >
            add task
        </Button>

        <DragNDrop data={data} usersTasks={usertasks} />
        </>
    )
}

const mapStateToProps = state => ({
    // get project owner 
    // get the project with id 
    // 
})

export default connect()(ProjDesc)


// getOneProject Reducer
/*
    initialState = [
        project : null
        loading :true
        error : null
    ]
*/
// get One Project Action
