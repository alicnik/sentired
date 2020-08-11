import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Skeleton from '@material-ui/lab/Skeleton'

const LoadingCard = () => (
  <Card>
    <CardHeader
      avatar={<Skeleton variant="circle" width={40} height={40} />}
      title={<Skeleton height={10} width="60%" style={{ marginBottom: 6 }} />}
      subheader={<Skeleton height={10} width="60%" style={{ marginBottom: 6 }} />}
    />
    <Skeleton variant="rect" width="40%" height="150px" style={{ float: 'left', marginRight: 10 }}/>  
    <CardContent style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start' }}>
      {Array(4).fill(0).map((el, i) => <Skeleton key={i} height={15} width="50%" style={{ marginBottom: 10, overflow: 'hidden' }} />)}
    </CardContent>
  </Card>
)

export default LoadingCard