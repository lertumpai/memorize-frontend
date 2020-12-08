import React from 'react'

import ApplicationLayout from '../../containers/ApplicationLayout/dynamic'
import ProfileContainer from '../../containers/ProfileContainer/dynamic'

const ProfilePage = () => {
  return (
    <ApplicationLayout>
      <ProfileContainer />
    </ApplicationLayout>
  )
}

export default ProfilePage
