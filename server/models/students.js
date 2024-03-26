const { model, Schema} = require('mongoose');

const studentSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'Users',
        // validate: {
        //     validator: async function(userId) {
        //         const user = await mongoose.model('User').findById(userId);
        //         return user && user.role === 'student';
        //     },
        //     message: 'User must have a role of a student'
        // }
    },
    roomNumber: {
        type: Number,
        unique: true
    },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teachers' },
    grades: [{ type: Schema.Types.ObjectId, ref: 'Grades' }],
    assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignments' }],
    attendance: [{ type: Schema.Types.ObjectId, ref: 'Attendances' }],
});

module.exports = model('Students', studentSchema);
