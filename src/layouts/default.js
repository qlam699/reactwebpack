import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { faChartBar, faClipboardCheck, faCogs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const route = [
  {
    name: "Stats",
    link: "/",
    icon: faChartBar
  },
  {
    name: "Status",
    link: "/status",
    icon: faClipboardCheck
  },
  {
    name: "Config",
    link: "/config",
    icon: faCogs
  }
]
export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="container">
      <div className="col">
        <div className="tab">
          {route.map(el => {
            return (
              <Link key={el.name} className={["tab__item", location.pathname === el.link ? "tab__item--active" : ""].join(" ")} to={el.link}>
                <span><FontAwesomeIcon icon={el.icon} />
                  {' '}{el.name}
                </span>
              </Link>
            )
          })}
        </div>
        <div className="main">{children}</div>
      </div>
    </div>
  )
}