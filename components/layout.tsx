import Sidebar from './sidebar'
import index from '../sidebarMenu.json'

export default function Layout({ children }) {
  console.log(children.props.frontmatter?.key)
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-slate-200 py-4 mb-2">
        <div className="container mx-auto flex justify-center">
          <span className="mx-auto">Notes on Software Development</span>
        </div>
      </header>
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar
          items={index.items}
          depthStep={undefined}
          depth={undefined}
          expanded={children.props.frontmatter?.key}
        />
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
