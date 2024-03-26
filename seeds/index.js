const sequelize = require("../config/connection")
const {User,Blog,Comment} = require("../models")

const users = [
    {
        username: "Christian",
        password: "Christianpassword"
    },
    {
        username: "toby",
        password: "tobypassword"
    },
    {
        username: "Fred",
        password: "Fredpassword"
    },

]

const blogs = [
    {
        title: "My first post",
        content: "HELLO",
        userId: 1
    },
    {
        title: "Toby's first post",
        content: "Toby is a cool guy!",
        userId: 2
    },
    {
        title: "Fred's first post",
        content: "I am Fred. Yes",
        userId: 3
    },
]

const comments = [
    {
        body: "What A Post!",
        blogId: 1,
        userId: 1
    },
    {
        body: "i agree wholehartedly with that!",
        blogId: 3,
        userId: 2
    },
    {
        body: "true!",
        blogId: 4,
        userId: 1
    },
    {
        body: "happy monday!",
        blogId: 2,
        userId: 3
    },

]

const plantSeeds = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

plantSeeds()