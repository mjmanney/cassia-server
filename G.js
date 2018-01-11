var G = {
  PORT: process.env.PORT || 3000,
  TOKEN: {
    ACCESS_TOKEN: '',
    EXPIRES_IN: '',
    TYPE: '',
    setToken: token => {
      G.TOKEN.ACCESS_TOKEN = token.access_token
      G.TOKEN.EXPIRES_IN   = token.expires_in
      G.TOKEN.TYPE         = token.token_type
    }
  },
  MAC : {
    E1000: 'CC:1B:E0:E0:DB:E0',
    C1000: 'CC:1B:E0:E0:5F:E0'
  }
}

module.exports = G
