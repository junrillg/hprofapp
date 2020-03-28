import React, { FC } from 'react'
import Page from '../components/Page'

interface OwnProps {}

type Props = OwnProps

const Dashboard: FC<Props> = (props) => {
  return (
    <Page>
      <p>hello</p>
    </Page>
  )
}

export default Dashboard
