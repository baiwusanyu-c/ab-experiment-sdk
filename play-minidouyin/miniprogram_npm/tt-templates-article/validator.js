const Validator = require('../validate')
function templateDataValidator(data) {
  const rules = new Validator({
    title: {
      type: String,
      required: true,
    },
    author: {
      avatarUrl: String,
      name: String,
      publishTime: Number,
    },
    contents: [
      {
        imgUrl: String,
        text: String,
      },
    ],
    adId: String,
    recommend: {
      url: String,
      imgUrl: String,
    },
  })
  const errors = rules.validate(data)
  try {
    if (errors.length > 0) {
      const errMessages = errors.map(item => {
        return item.message
      })
      throw errMessages
    }
  } catch (err) {
    console.error('error: ', err)
  }
}

export { templateDataValidator }
