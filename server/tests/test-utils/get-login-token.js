module.exports = async function(username, password){
  return LoginServiceAPIv2.passwordLogin(
    {
      username,
      password
    }
  )
}
