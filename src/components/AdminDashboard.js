import React, { useState, useEffect } from 'react'
import InfoCard from './Cards/InfoCard'
import ChartCard from './Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from './Chart/ChartLegend'
import PageTitle from './Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from './RoundIcon'

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui'

import {
  doughnutOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'

function AdminDashboard(props) {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = props.HomeData.allProjects.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data

  useEffect(() => {
    setData(props.HomeData.allProjects.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page])


  const lineOptions = {
    data: {
      labels: ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: 'Completed Tasks',
          backgroundColor: '#0694a2',
          borderColor: '#0694a2',
          data: [props.chartsData.finishChart['January'], props.chartsData.finishChart['February'], props.chartsData.finishChart['March'], props.chartsData.finishChart['April'], props.chartsData.finishChart['May'], props.chartsData.finishChart['June'], props.chartsData.finishChart['July'],props.chartsData.finishChart['August'],props.chartsData.finishChart['September'],props.chartsData.finishChart['October'],props.chartsData.finishChart['November'],props.chartsData.finishChart['December']],
          fill: false,
        },
        {
          label: 'Tasks Number',
          fill: false,
          backgroundColor: '#7e3af2',
          borderColor: '#7e3af2',
          data: [props.chartsData.pendingChart['January'], props.chartsData.pendingChart['February'], props.chartsData.pendingChart['March'], props.chartsData.pendingChart['April'], props.chartsData.pendingChart['May'], props.chartsData.pendingChart['June'], props.chartsData.pendingChart['July'],props.chartsData.pendingChart['August'],props.chartsData.pendingChart['September'],props.chartsData.pendingChart['October'],props.chartsData.pendingChart['November'],props.chartsData.pendingChart['December']],
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month',
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value',
          },
        },
      },
    },
    legend: {
      display: true,
    },
  }

  return (
    
    
   <>
      <PageTitle>Dashboard</PageTitle>
      
      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <InfoCard title="Total Users" value={props.HomeData.usersNumber}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total projects" value={props.HomeData.projectsNumber}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending Projects" value={props.HomeData.notStartedProjectsNumber}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Project Owner</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Project Status</TableCell>
              <TableCell>Project Started Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.projectOwner.avatar} alt="User image" />
                    <div>
                      <p className="font-semibold">{user.projectOwner.email}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{ user.projectOwner.name + ' ' + user.projectOwner.lastname }</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.projectName}</span>
                </TableCell>
                <TableCell>
                  {user.started ? <Badge type="success">Online</Badge> : <Badge type="danger">Offline</Badge>}
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.creationDate).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      <PageTitle>Our Trafic</PageTitle>
      <div className="mb-8 md:grid-cols-2">
        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </>
            
  )
}



export default AdminDashboard
