import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'
const DragableCards = ({ title, value , deadline , children: icon }) => {
    return (
        <Card>
            <CardBody className="flex justify-between">
            {icon}
            <div className='flex-col justify-items-start'>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{value}</p>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{deadline}</p>
            </div>
            
            </CardBody>
      </Card>
    )
}

export default DragableCards
