const { model, Schema } = require('mongoose');

const gradeSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    student: { type: Schema.Types.ObjectId, ref: 'Students' },
    assignment: { type: Schema.Types.ObjectId, ref: 'Assignments' },
});

module.exports = model('Grades', gradeSchema);