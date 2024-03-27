const User = require('./User');
const Comment = require('./Comment');
const Blog = require('./Blog');

User.hasMany(Blog, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
});

Comment.belongsTo(Blog, {
    foreignKey: 'BlogId',
});

Blog.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Blog.hasMany(Comment, {
    foreignKey: 'BlogId',
    onDelete: 'CASCADE'
});

module.exports = { User, Comment, Blog };