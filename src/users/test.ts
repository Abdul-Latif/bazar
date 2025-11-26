// creating query builder 
// start with createQueryBuilder start with the entity => 
// then get what you need from it add select => get the entity password
// then where => you specify the condition you want weither its by id, email etc
// 'users.email=:email', {email: userSignInDto.email}.getOne()