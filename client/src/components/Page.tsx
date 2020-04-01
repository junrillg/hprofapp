import React, { FC, Fragment, useEffect } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getSession } from '../features/session/selectors'
import { Redirect } from 'react-router-dom'
import { fetchUserSession } from 'features/session/sessionActions'

interface OwnProps {}

type Props = OwnProps

const Page: FC<Props> = (props) => {
  const session = useSelector(getSession)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserSession())
  }, [dispatch])

  if (!session.loggedIn && session.appInit) return <Redirect to="/login" />
  return (
    <Fragment>
      <Navbar />
      <div className="container">{props.children}</div>
    </Fragment>
  )
}
export default Page
