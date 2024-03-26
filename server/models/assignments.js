const { model, Schema } = require('mongoose');

const assignmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },   
    teacher: { type: Schema.Types.ObjectId, ref: 'Teachers' },
    students: [{ type: Schema.Types.ObjectId, ref: 'Students' }],
});

module.exports = model('Assignments', assignmentSchema);
