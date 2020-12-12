import React from 'react'
import moment from 'moment'

import './style.scss'

const ContentArticleBox = ({ article, user }) => {

  function ContentBox() {
    return (
      <div className='article-content-box-memorize'>
        <div className='article-content-box-head-memorize'>
          <div className='article-profile-name-memorize'>
            {user?.profile?.name || 'unknown'}
          </div>
          <div className='article-createdAt-memorize'>
            {moment(article?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </div>
        </div>
        <div className='article-container-content-box-body-memorize'>
          <div className='article-content-box-body-memorize'>
            {article?.content}
          </div>
          <hr className='article-horizontal--memorize' />
          <div className='article-container-button-box-body-memorize'>
            <div className='article-button-like-memorize'>
              <i className='fa fa-heart-o article-like-icon-memorize' comment-count={article?.comment} />
            </div>
            <div className='article-button-comment-memorize'>
              <i className='fa fa-comment-o article-comment-icon-memorize' comment-count={article?.comment} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <ContentBox />
}

export default ContentArticleBox
