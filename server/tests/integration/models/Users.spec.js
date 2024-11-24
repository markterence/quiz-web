describe("users model", function(){
  it("should create password", function(done){
    Users.create(
      {
        username:'asdafg',
        password: 'asdfges',
        email: "email.s@email.com",
      }
    ).fetch().then(function(user){
      expect(user).toBeDefined();
      done()
    }).catch(function(err){
      done(err)
    })
  }),
  it("should create each password", function(done) {
    Users.destroy({}).then(function(){
      Users.createEach([
        {
          username:'asdafgasdasd',
          password: 'asdfges',
          email: "emailgw3g.s@email.com",
        },
        {
          username:'asdafgagwa',
          password: 'asdfgess',
          email: "emahaail.s@email.com",
        }
      ]).fetch().then(function(user){
        expect(user).toBeDefined();
        expect(user[0].password).not.toBe("asdfges")
        expect(user[1].password).not.toBe("asdfgess")
        done()
      }).catch(function(err){
        done(err)
      })
    })

  })
  it("Should find users", async ()=>{
    let res = await Users.find({ username: ['asdafgagwa', 'asdafgasdasd'] })
    expect(res.length).toBe(2)
  })
})
