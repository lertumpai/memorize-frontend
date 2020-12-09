import React, { useState, useMemo } from 'react'
import { Card, Button } from 'react-bootstrap'
import moment from 'moment'

import './style.scss'

const ContentArticleBox = ({ article, user }) => {
  function ContentBox() {
    return (
      <div className='d-flex justify-content-center'>
        <div className='content-box-memorize'>
          <div className='content-box-head-memorize'>
            <div className='profile-name-memorize'>
              {user.profile.name || 'unknown'}
            </div>
            <div className='article-createdAt-memorize'>
              {moment(article.createdAt).format('DD/MM/YYYY hh:mm:ss')}
            </div>
          </div>
          <div className='content-box-body-memorize'>
              {article.content}
          </div>
        </div>
      </div>
    )
  }

  return <ContentBox />
}

export default ContentArticleBox