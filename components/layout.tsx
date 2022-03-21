import Link from 'next/link'
import Sidebar from './sidebar'
import HomeIcon from '@material-ui/icons/Home'
import ReceiptIcon from '@material-ui/icons/Receipt'
import NotificationsIcon from '@material-ui/icons/Notifications'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import SettingsIcon from '@material-ui/icons/Settings'

function onClick(e, item) {
  window.alert(JSON.stringify(item, null, 2))
}

const items = [
  { name: 'home', label: 'Home', Icon: HomeIcon },
  {
    name: 'billing',
    label: 'Billing',
    Icon: ReceiptIcon,
    items: [
      { name: 'statements', label: 'Statements', onClick },
      { name: 'reports', label: 'Reports', onClick },
    ],
  },
  'divider',
  {
    name: 'settings',
    label: 'Settings',
    Icon: SettingsIcon,
    items: [
      { name: 'profile', label: 'Profile' },
      { name: 'insurance', label: 'Insurance', onClick },
      'divider',
      {
        name: 'notifications',
        label: 'Notifications',
        Icon: NotificationsIcon,
        items: [
          { name: 'email', label: 'Email', onClick },
          {
            name: 'desktop',
            label: 'Desktop',
            Icon: DesktopWindowsIcon,
            items: [
              { name: 'schedule', label: 'Schedule' },
              { name: 'frequency', label: 'Frequency' },
            ],
          },
          { name: 'sms', label: 'SMS' },
        ],
      },
    ],
  },
]

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-slate-200 py-4 mb-2">
        <div className="container mx-auto flex justify-center">
          <span className="mx-auto">Notes on Software Development</span>{' '}
        </div>
      </header>
      <div className="flex flex-col md:flex-row flex-1">
        {/* <div className="w-full md:w-60"> */}
        <Sidebar
          items={items}
          depthStep={undefined}
          depth={undefined}
          expanded={undefined}
        />
        {/* </div> */}
        <main className="container mx-auto flex-1">{children}</main>
      </div>
      <footer className="bg-slate-200 py-4 mt-2">
        <div className="container mx-auto flex justify-center">
          &copy; 2022 Warren Fitzhenry
        </div>
      </footer>
    </div>
  )
}
