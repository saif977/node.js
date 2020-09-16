module.exports=(req,res,next)=>{
    res.status(404).render('error',{
      title:"hello",
      prod:['pen','tootl']
    });
  }