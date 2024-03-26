const { model, Schema } = require('mongoose');

const attendanceSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    student: { type: Schema.Types.ObjectId, ref: 'Students' },
    present: {
        type: Boolean,
        required: true
    },
});

module.exports = model('Attendances', attendanceSchema);