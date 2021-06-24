import React,{useState} from 'react'
import {adminroutes,projectownerroutes,teammemberroutes} from '../../routes/sidebar'
import { NavLink, Route } from 'react-router-dom'
import * as Icons from '../../icons'
import { Button} from '@windmill/react-ui'
import { generatePdfFile } from '../../actions/productivity';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';



function Icon({ icon, ...props }) {
    const Icon = Icons[icon]
    return <Icon {...props} />
}



const SideBar = ({userRole,generatePdfFile}) => {
  const generatepdffileHandler =() => {
    generatePdfFile();
    const newWindow = window.open("http://localhost:3000/uploads/statistics.pdf", '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
    

    switch(userRole){
        case 1:
            return (
                <div className="py-4 text-gray-500 dark:text-gray-400">
                  <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
                      CSIM - csi maghreb 
                  </a>
                  <ul className="mt-6">
                    {projectownerroutes.map((route) =>
                      route.routes ? (
                        <div></div>
                      ) : (
                        <li className="relative px-6 py-3" key={route.name}>
                          <NavLink
                            exact
                            to={route.path}
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                            activeClassName="text-gray-800 dark:text-gray-100"
                          >
                            <Route path={route.path} exact={route.exact}>
                              <span
                                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                aria-hidden="true"
                              ></span>
                           </Route>
                            <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                            <span className="ml-4">{route.name}</span>
                          </NavLink>
                        </li>
                      )
                    )}
                  </ul>
                  <div className="px-6 my-6">
                  </div>
                </div>
              );
        case 2:
            return (
                <div className="py-4 text-gray-500 dark:text-gray-400">
                  <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
                      CSIM - csi maghreb 
                  </a>
                  <ul className="mt-6">
                    {teammemberroutes.map((route) =>
                      route.routes ? (
                        <div></div>
                      ) : (
                        <li className="relative px-6 py-3" key={route.name}>
                          <NavLink
                            exact
                            to={route.path}
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                            activeClassName="text-gray-800 dark:text-gray-100"
                          >
                            <Route path={route.path} exact={route.exact}>
                              <span
                                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                aria-hidden="true"
                              ></span>
                           </Route>
                            <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                            <span className="ml-4">{route.name}</span>
                          </NavLink>
                        </li>
                      )
                    )}
                  </ul>
                  <div className="px-6 my-6">
                  </div>
                </div>
              );
        default:
            return (
                <div className="py-4 text-gray-500 dark:text-gray-400">
                  <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
                      CSIM - csi maghreb 
                  </a>
                  <ul className="mt-6">
                    {adminroutes.map((route) =>
                      route.routes ? (
                        <div></div>
                      ) : (
                        <li className="relative px-6 py-3" key={route.name}>
                          <NavLink
                            exact
                            to={route.path}
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                            activeClassName="text-gray-800 dark:text-gray-100"
                          >
                            <Route path={route.path} exact={route.exact}>
                              <span
                                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                aria-hidden="true"
                              ></span>
                           </Route>
                            <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                            <span className="ml-4">{route.name}</span>
                          </NavLink>
                        </li>
                      )
                    )}
                  </ul>

                  <div className="px-6 my-6">
                    <Button onClick={generatepdffileHandler}>
                      Generate Log
                    </Button>
                </div>
                </div>
              );
        
            

    }

}
SideBar.propTypes = {
  generatePdfFile : PropTypes.func.isRequired,
}

export default connect(null,{generatePdfFile})(SideBar)


