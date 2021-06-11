import React,{useState, useEffect} from 'react'
import { MailIcon,PasswordIcon } from '../icons'
import { updateUser } from '../actions/addUser'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { 
    Input, 
    Label,
    Button,
  } from '@windmill/react-ui'

const UserProfile = ({updateUser, userData}) => {

    const [formData, setformData] = useState({
        name: userData ? userData.name : '',
        lastname: userData ? userData.lastname : '',
        email:userData ? userData.email : '',
        password:'',
        phone_number:userData ? userData.phone_number : '',
      });
    
    
  

    const [file, setfile] = useState('');
    const [filename, setfilename] = useState('');
    
    const saveFile = (e) => {
        setfile(e.target.files[0]);
        setfilename(e.target.files[0].name);
    };

    

      const {name,lastname, email, password, phone_number } = formData

      const onChange = e => setformData({...formData, [e.target.name]:e.target.value})

      const onSubmit = async e =>  {
        e.preventDefault();
        const datafile = new FormData();
        datafile.append('file', file);
        datafile.append('id', userData._id);
        datafile.append('name',name == '' ? userData.name : name);
        datafile.append('lastname',lastname == '' ? userData.lastname : lastname); 
        datafile.append('email',email == '' ? userData.email : email);
        datafile.append('password',password);
        datafile.append('phone_number',phone_number == '' ? userData.phone_number : phone_number );

        console.log(datafile);

        updateUser(datafile);
        
      }

    return (
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form encType="multipart/form-data" onSubmit={e => onSubmit(e)}  >
        <Input className="mt-1 hidden" name="id" value={userData ? userData._id : ''}  readOnly required />
        <Label>
          <span>Name</span>
          <Input className="mt-1" name="name"onChange={(e) => onChange(e)} placeholder={userData ? userData.name : ''}  />
        </Label>

        <Label className="mt-4" >
          <span>Last Name</span>
          <Input className="mt-1" name="lastname" placeholder={ userData ? userData.lastname : ''} onChange={(e) => onChange(e)}   />
        </Label>

        <Label className="mt-4" >
          <span>Phone Number</span>
          <Input className="mt-1" name="phone_number" placeholder={ userData  ?userData.phone_number : ''} onChange={(e) => onChange(e)}   />
        </Label>

        <Label className="mt-4">
          <span>User Email </span>
          {/* <!-- focus-within sets the color for the icon when input is focused --> */}
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <input
              className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              name="email"
              onChange={(e) => onChange(e)}
              placeholder={ userData ? userData.email : ''}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <MailIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>
        <Label className="mt-4">
          <span>Password </span>
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
        <div>
            <Label className="mt-4">Cover photo</Label>
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
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={saveFile}  />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
        </div>
        
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
    )
}


export default connect(null,{updateUser})(UserProfile)
