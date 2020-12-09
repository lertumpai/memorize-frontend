import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import _ from 'lodash'

import { userSelectors } from '../../store/users/slice'
import './style.scss'

const ContentBox = ({ article }) => {
  const state = useSelector(state => state)
  const [user, setUser] = useState({})

  useMemo(() => {
    const selectedUser = userSelectors.selectById(state, _.get(article, 'author.id'))
    setUser(selectedUser)
  }, [user])

  function ContentBox() {
    return (
      <div className='content-box-memorize pb-2 pb-lg-4'>
        <Card>
          <Card.Header as="h3">
            {user.profile.name}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {article.content}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }

  return <ContentBox />
}

export default ContentBox