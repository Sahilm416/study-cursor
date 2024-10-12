import React from 'react'

const page = ({ searchParams }: { searchParams: { url: string } }) => {
  return (
    <div>
        <h1>{searchParams.url}</h1>
    </div>
  )
}

export default page