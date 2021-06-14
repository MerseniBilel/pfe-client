/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
export const adminroutes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/users',
    icon: 'FormsIcon',
    name: 'Users',
  },
  {
    path: '/app/projects',
    icon: 'CardsIcon',
    name: 'Projects',
  },
  {
    path: '/app/setting',
    icon: 'SettingIcon',
    name: 'Setting',
  },
]

export const projectownerroutes = [
  {
    path: '/app/projects',
    icon: 'FormsIcon',
    name: 'Projects',
  },
  {
    path: '/app/users',
    icon: 'CardsIcon',
    name: 'Users',
  },
  {
    path: '/app/cra',
    icon: 'CalendarIcon',
    name: 'CRA',
  },
  {
    path: '/app/setting',
    icon: 'SettingIcon',
    name: 'Setting',
  },
]

export const teammemberroutes = [
  {
    path: '/app/projects',
    icon: 'FormsIcon',
    name: 'Projects',
  },
  {
    path: '/app/cra',
    icon: 'CalendarIcon',
    name: 'CRA',
  },
  {
    path: '/app/setting',
    icon: 'SettingIcon',
    name: 'Setting',
  }

]

