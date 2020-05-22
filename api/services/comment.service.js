const models = require('../models')

const commentInsert = (params) => {
  params = params || {}

  return models.Comments.create({
    user_idx: params.userIdx,
    password: params.postPassword,
    content: params.comment,
    post_idx: params.postIdx
  }).then((comments) => {
    return comments
  })
}

const commentPaging = (params) => {
  params = params || {}

  return models.Comments.findAndCountAll({
    where: {
      post_idx: params.postIdx
    },
    offset: params.offset || 0,
    limit: params.limit || 12,
    order: [['idx', 'desc']],
    raw: true,
    attributes: {
      include: [
        [models.Sequelize.col('User.user_id'), 'user_id'],
        [models.Sequelize.col('User.username'), 'user_name']
      ]
    },
    include: [
      {
        model: models.User,
        required: true,
        attributes: []
      }
    ]
  }).then((commentsPaging) => {
    return commentsPaging
  })
}

const likeComments = (params) => {
  return models.CommentsLikes.create({
    comment_idx: params.commentIdx,
    user_idx: params.userIdx
  }).then((likesComments) => {
    return likesComments
  })
}

module.exports = {
  commentInsert,
  commentPaging,
  likeComments
}
