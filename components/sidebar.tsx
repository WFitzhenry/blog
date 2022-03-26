import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import Collapse from '@material-ui/core/Collapse'
import { useState, Fragment } from 'react'
import Link from 'next/link'

function SidebarItem({ depthStep = 10, depth = 0, item, expanded, ...rest }) {
  const { label, items, onClick: onClickProp } = item
  // const initialState =
  //   expanded === undefined ? true : !item.itemKeys?.includes(expanded)
  const [collapsed, setCollapsed] = useState(true)

  function toggleCollapse() {
    setCollapsed((prevValue) => !prevValue)
  }

  function onClick(e) {
    if (Array.isArray(items)) {
      toggleCollapse()
    }
    if (onClickProp) {
      onClickProp(e, item)
    }
  }

  let expandIcon

  if (Array.isArray(items) && items.length) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon className={'font-bold text-green-500'} />
    ) : (
      <ExpandMoreIcon />
    )
  }

  return (
    <>
      <ListItem className="flex p-2" onClick={onClick} button dense {...rest}>
        <Link href={item.route} passHref>
          <a
            style={{ paddingLeft: depth * depthStep }}
            className="flex w-full items-center"
          >
            <div className="flex w-full">{label}</div>
            {expandIcon}
          </a>
        </Link>
      </ListItem>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List disablePadding dense>
            {items.map((subItem, index) => (
              <Fragment key={`${subItem.name}${index}`}>
                {subItem === 'divider' ? (
                  <Divider className="m-4" />
                ) : (
                  <SidebarItem
                    depth={depth + 1}
                    depthStep={depthStep}
                    item={subItem}
                    expanded={expanded}
                  />
                )}
              </Fragment>
            ))}
          </List>
        ) : null}
      </Collapse>
    </>
  )
}

function Sidebar({ items, depthStep, depth, expanded }) {
  return (
    <div className="w-full md:w-60">
      <List disablePadding dense>
        {items.map((sidebarItem, index) => (
          <Fragment key={`${sidebarItem.name}${index}`}>
            {sidebarItem === 'divider' ? (
              <Divider style={{ margin: '6px 0' }} />
            ) : (
              <SidebarItem
                depthStep={depthStep}
                depth={depth}
                expanded={expanded}
                item={sidebarItem}
              />
            )}
          </Fragment>
        ))}
      </List>
    </div>
  )
}

export default Sidebar
