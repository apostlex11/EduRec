const { model, Schema } = require('mongoose');

const adminSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    assignedStudents: [{ type: Schema.Types.ObjectId, ref: 'Students' }],
    assignedTeacher: { type: Schema.Types.ObjectId, ref: 'Teachers' },
    roomNumber: {
        type: Number,
        unique: true
    },
});

module.exports = model('Admins', adminSchema);
