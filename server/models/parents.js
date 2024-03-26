const { model, Schema } = require('mongoose');

const parentSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users',
        // validate: {
        //     validator: async function(userId) {
        //         const user = await mongoose.model('User').findById(userId);
        //         return user && user.role === 'parent';
        //     },
        //     message: 'User must be a teacher'
        // }
    },
    children: [{ type: Schema.Types.ObjectId, ref: 'Students' }],
});

module.exports = model('Parents', parentSchema);
