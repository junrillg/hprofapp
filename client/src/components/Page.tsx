import React, { FC, Fragment } from 'react'
import Navbar from './Navbar'

interface OwnProps {}

type Props = OwnProps

const Page: FC<Props> = (props) => (
  <Fragment>
    <Navbar />
    <div className="container">{props.children}</div>
  </Fragment>
)
export default Page
