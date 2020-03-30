import React, { FC, Fragment } from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { getSession } from '../features/session/selectors'
import { Redirect } from 'react-router-dom'

interface OwnProps {}

type Props = OwnProps

const Page: FC<Props> = (props) => {
  const session = useSelector(getSession)

  if (!session.loggedIn) return <Redirect to="/login" />
  return (
    <Fragment>
      <Navbar />
      <div className="container">{props.children}</div>
    </Fragment>
  )
}
export default Page
