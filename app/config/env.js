const get = (o) => {
  if (config.all[o]) return config.all[o]

  if (__DEV__) { // eslint-disable-line no-undef
    return config.dev[o]
  }
  return config.prod[o]
}

// per environment configs for dev/prod
// shared configs in 'all'. If it exists in 'all' then that has priority over specific environment
const config = {
  dev: {
    url: 'http://stage.seasonseatnetwork.com/',
    analytics: {
      androidWriteKey: 'iOYNFxYTDBB9mpmGPgw4umNrkP7ZfBLb',
      iosWriteKey: 'YWzCKzgm8icyuO4r4se610NFB6QcCQGh',
    },
  },
  prod: {
    url: 'http://stage.seasonseatnetwork.com/',
    analytics: {
      androidWriteKey: 'iOYNFxYTDBB9mpmGPgw4umNrkP7ZfBLb',
      iosWriteKey: 'YWzCKzgm8icyuO4r4se610NFB6QcCQGh',
    },
  },
  all: {
    apiPath: 'controllers/mainNavControl/php/',
    apiPathAccount: 'controllers/accountControl/php/',
    imagePath: 'images/',
  },
}
const env = {
  isDev: __DEV__, // eslint-disable-line no-undef
  analytics: get('analytics'),
  apiURL: get('url') + get('apiPath'),
  apiURLAccount: get('url') + get('apiPathAccount'),
  imageURL: get('url') + get('imagePath'),
}

export default env
