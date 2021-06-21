import React,{useState, useEffect} from 'react'

//redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../actions/addUser'
import DashboardAlert from './DashboardAlert'

import { MailIcon,PasswordIcon, TrashIcon } from '../icons'
import SectionTitle from './Typography/SectionTitle'
import PageTitle from './Typography/PageTitle'
import { 
    Input, 
    HelperText,
    Label,
    Textarea,
    Button,
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Avatar,
    Pagination, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
  } from '@windmill/react-ui'

const AdminUsers = ({UserList, addUser,logedinuser}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const handleRemoveItem = (e) => {
      const name = e.target.value
      console.log(name)
     };

    function openModal() {
      setIsModalOpen(true)
    }

    function closeModal() {
      setIsModalOpen(false);
    }

    const [formData, setformData] = useState({
      name:'',
      lastname:'',
      email:'',
      password:'',
      phone_number:'',
      role:'',
      msg:'',
      logedinuser : logedinuser._id
    })

    


    const onChange = e => setformData({...formData, [e.target.name]:e.target.value})

    const onSubmit = e => {
      const {name,lastname, email, password, phone_number, role, msg, logedinuser} = formData
      e.preventDefault();
      addUser({ name,lastname, email, password, phone_number, role, msg,logedinuser })
      e.target.reset();
    }

    const callDelete = e => {
      console.log(e)
    }

    const [page, setPage] = useState(1)
    const [data, setData] = useState([])

    // pagination setup
    const resultsPerPage = 10
    const totalResults = UserList.length

    // pagination change control
    function onPageChange(p) {
        setPage(p)
    }
    
    useEffect(() => {
        setData(UserList.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [page])

    return (
        <>
      <div className="mt-12">
        <DashboardAlert/>
      </div>
      <PageTitle> Users </PageTitle>
      <SectionTitle>Add New User</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={e => onSubmit(e)} >
        <Label>
          <span>Name</span>
          <Input className="mt-1" name="name" onChange={(e) => onChange(e)} placeholder="User Name" required />
        </Label>

        <Label className="mt-4" >
          <span>Last Name</span>
          <Input className="mt-1" name="lastname" onChange={(e) => onChange(e)} placeholder="User Last Name" required />
        </Label>

        <Label className="mt-4" >
          <span>Phone Number</span>
          <Input className="mt-1" name="phone_number" onChange={(e) => onChange(e)} placeholder="+216" required />
        </Label>

        <Label className="mt-4">
          <span>User Email </span>
          {/* <!-- focus-within sets the color for the icon when input is focused --> */}
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <input
              className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              placeholder="example@example.com"
              required
              name="email"
              onChange={(e) => onChange(e)}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <MailIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>
        <Label className="mt-4">
          <span>User default Password </span>
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <input
              className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              placeholder="**************"
              required
              type="password"
              name="password"
              onChange={(e) => onChange(e)}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <PasswordIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        <div className="mt-4">
          <Label>Account Type</Label>
          <div className="mt-2">
            <Label radio>
              <Input type="radio" value="0" name="role" onChange={(e) => onChange(e)} />
              <span className="ml-2">Admin</span>
            </Label>
            <Label className="ml-6" radio>
              <Input type="radio" value="1" name="role" onChange={(e) => onChange(e)} />
              <span className="ml-2">Project Owner</span>
            </Label>
            <Label className="ml-6" radio>
              <Input type="radio" value="2" name="role" onChange={(e) => onChange(e)} />
              <span className="ml-2">Team Member</span>
            </Label>
          </div>
        </div>

        <Label className="mt-4">
          <span>Message</span>
          <Textarea className="mt-1" onChange={(e) => onChange(e)} rows="3" name="msg" placeholder="Enter content to send an email to the new user" />
        </Label>

        <div className="flex justify-between" >
          <Label className="mt-6" check>
            <Input type="checkbox" required />
            <span className="ml-2">
              I agree to the <span className="underline">privacy policy</span>
            </span>
          </Label>

          <div className="mt-4" >
            <Button type="submit" >Save</Button>
          </div>
        </div>
        </form>
      </div>

      <SectionTitle>Users List</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>User Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
          {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" />
                    <div>
                      <p className="font-semibold">{user.email}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{ user.name + ' ' + user.lastname }</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.phone_number}</span>
                </TableCell>
                <TableCell>
                  { user.active ?  <Badge type="success">Online</Badge> : <Badge type="danger">Offline</Badge>}
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center space-x-4">
                    <Button onClick={openModal}  name={user._id} layout="link" size="icon"  aria-label="Delete" >
                      <TrashIcon  className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>

                </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
        
         {/* Modal */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Delete User</ModalHeader>
          <ModalBody>
                  Do you want to Delete this user
          </ModalBody>
          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
                </Button>
              </div>
              <div className="hidden sm:block" >
            <Button >Delete</Button>
            </div>
            <div className="block w-full sm:hidden">
          <Button block size="large" layout="outline" onClick={closeModal}>
                Cancel
            </Button>
              </div>
            <div className="block w-full sm:hidden">
            <Button block size="large">
                Accept
          </Button>
          </div>
          </ModalFooter>
          </Modal>

    </>
    )
}

AdminUsers.propTypes = {
  addUser: PropTypes.func.isRequired,
}

export default connect(null,{addUser})(AdminUsers)
