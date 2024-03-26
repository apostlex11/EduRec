const { model, Schema } = require('mongoose');

const teacherSchema = new Schema({
    user: { type: Schema.Types.ObjectId,
         ref: 'Users',
        //  validate: {
        //     validator: async function(userId) {
        //         const user = await mongoose.model('User').findById(userId);
        //         return user && user.role === 'teacher';
        //     },
        //     message: 'User must be a teacher'
        // }
    },
    roomNumber: {
        type: Number,
        unique: true
    },
    students: [{ type: Schema.Types.ObjectId, ref: 'Students' }],
});

module.exports = model('Teachers', teacherSchema);
