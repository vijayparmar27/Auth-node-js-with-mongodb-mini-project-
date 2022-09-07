// const { db } = require('../model/db');
const { connectDB } = require('../model/db');
const {users}=require('../model/db.schema');
const {datav}=require('../model/db.schema1');

exports.data_page =async (req, res) => {
  let showUser= await datav.find();

  if(showUser){
  res.render('user_index.ejs', {
    title: 'Project For Qualification',
    users: showUser,
  });
}
else{
  console.log('error in datapage')
}
}

exports.add = (req, res) => {

  res.render(`user_add`, {
    title: 'Project For Qualification',
    // user: req.user

  });
}

exports.edit =async(req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  let showUser= await datav.findOne({userId});
  console.log(showUser);
  if(showUser){
  res.render('user_edit', {
    title: 'Project For Qualification',
    user: showUser,
  });
}
}

exports.delete =async (req, res) => {
  const userId = req.params.userId;
  console.log(userId)
  await datav.deleteOne({userId})
  res.redirect(`/data_page`);
}

exports.save = async (req, res) => {
  console.log(req.body)
  const { name, class1, email } = req.body;
  const file = req.file;
  console.log(file)
  const add= new datav({
    name:name,
    class:class1,
    email:email,
    image:file.filename
  })
  await add.save();
  res.redirect(`/data_page`);
}

exports.update =async (req, res) => {
  const userId = req.params.userId;
  const { name, class1, email } = req.body;
  // const userId = req.body.id;
  const file = req.file;
  if (file) {
    await datav.updateOne({userId},{$set:{name:name,class:class1,email:email,image:file.filename}});
    res.redirect('/data_page');
  }
  else {
    await datav.updateOne({userId},{$set:{name:name,class:class1,email:email}});
    res.redirect('/data_page');

  }
}