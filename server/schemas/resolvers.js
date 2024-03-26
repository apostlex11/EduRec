const User = require('../models/users');
const bcrypt = require('bcrypt');
const {loginUser} = require('../utils/auth');

module.exports = {
    Query: {
        user: async (_, { email }) => {
            return User.findOne({ email: email });
          },
          getUser: async (parent, { id }) => {
            return User.findById(id);
          },
        fetchUserInfo: async (_, { id, role, childName, childDOB }, context) => {
            if (!context.user) {
                throw new Error('Unauthorized access');
            }
            if (context.user.role === 'admin' || context.user.role === 'teacher') {
                let userInfo;
                switch (role) {
                    case 'student':
                        userInfo = await Student.findById(id);
                        break;
                    case 'teacher':
                        userInfo = await Teacher.findById(id);
                        break;
                    case 'admin':
                        userInfo = await Admin.findById(id);
                        break;
                    case 'parent':
                        userInfo = await Parent.findById(id);
                        break;
                    default:
                        throw new Error('Invalid role');
                }
                return userInfo;
            }

            if (context.user.role === 'student') {
                if (id === context.user.id) {
                    const userInfo = await Student.findById(id);
                    return userInfo;
                } else {
                    throw new Error('Unauthorized access');
                }
            }

            if (context.user.role === 'parent') {
                if (childName && childDOB) {
                    const childInfo = await Student.findOne({ name: childName, DoB: childDOB });
                    if (childInfo) {
                        return childInfo;
                    } else {
                        throw new Error('Child not found');
                    }
                } else {
                    throw new Error('Child name and date of birth are required');
                }
            }

            throw new Error('Unauthorized access');
        },

        getClassroomInfo: async (_, { roomNumber }, context) => {
            if (context.user && context.user.role === 'admin') {
                const teacher = await Teacher.findOne({ room: roomNumber });
                const students = await Student.find({ room: roomNumber });
                return { teacher, students };
            } else {
                throw new Error('Unauthorized access');
            }
        },

        getGrades: async (_, { studentId }) => {
            const grades = await Grade.find({ student: studentId });
            return grades;
        },
        getAttendance: async (_, { studentId, startDate, endDate }) => {
            const attendanceRecords = await Attendance.find({
                student: studentId,
                date: { $gte: startDate, $lte: endDate } //? maybe a calendar do i need to state startDate and endDate?
            });
            return attendanceRecords;
        },
        getAssignmentsForStudent: async (_, { studentId }, context) => {
            if (!context.user) {
                throw new Error('Unauthorized access. Please log in.');
            }
            const assignments = await Assignment.find({ student: studentId });
            return assignments;
        },
        getAssignmentById: async (_, { assignmentId }, context) => {
            if (!context.user) {
                throw new Error('Unauthorized access. Please log in.');
            }
            const assignment = await Assignment.findById(assignmentId);
            return assignment;
        }
    },

    Mutation: {
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
              throw new Error('No user found with this email!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new Error('Incorrect credentials');
            }
      
            const token = loginUser(user);
      
            return { token, user };
          },
        createStudent: async (_, { input }, context) => {
            if (context.user && ['teacher', 'admin'].includes(context.user.role)) {
                const newStudent = new User({ ...input, role: 'student' });
                const savedStudent = await newStudent.save();
                return savedStudent;
            } else {
                throw new Error('Unauthorized access');
            }
        },

        updateStudent: async (_, { id, input }, context) => {
            if (context.user && ['teacher', 'admin'].includes(context.user.role)) {
                const updatedStudent = await Student.findByIdAndUpdate(id, input, { new: true });
                return updatedStudent;
            } else {
                throw new Error('Unauthorized Access');
            }
        },

        deleteStudent: async (_, { id }, context) => {
            if (context.user && context.user.role === 'admin') {
                await Student.findByIdAndDelete(id);
                return true;
            } else {
                throw new Error('Unauthorized access');
            }
        },

        createUser: async (_, { input }) => {
            try {
                const newUser = new User({ ...input, role: 'parent' });
                const savedUser = await newUser.save();
                return savedUser;
            } catch (error) {
                throw new Error('Failed to create user: ' + error.message);
            }
        },

        changePassword: async (_, { currentPassword, newPassword }, context) => {
            if (!context.user) {
                throw new Error('Unauthorized access. Please log in.');
            }

            const user = await User.findById(context.user.id);

            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                throw new Error('Current password is incorrect.');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedPassword;
            await user.save();

            return 'Password successfully changed.';
        },

        createAdmin: async (_, { input }, context) => {
            try {
                if (context.user && context.user.role === 'admin') {
                    const newAdmin = new User({ ...input, role: 'admin' });
                    const savedAdmin = await newAdmin.save();
                    return savedAdmin;
                } else {
                    throw new Error('Unauthorized access');
                }
            } catch (error) {
                throw new Error('Failed to create admin: ' + error.message);
            }
        },

        createTeacher: async (_, { input }, context) => {
            try {
                if (context.user && context.user.role === 'admin') {
                    const newTeacher = new User({ ...input, role: 'teacher' });
                    const savedTeacher = await newTeacher.save();
                    return savedTeacher;
                } else {
                    throw new Error('Unauthorized access');
                }
            } catch (error) {
                throw new Error('Failed to create teacher: ' + error.message);
            }
        },

        createGrade: async (_, { input }, context) => {
            // Check if the user is authenticated
            if (!context.user) {
                throw new Error('Unauthorized access. Please log in.');
            }
            
            // Check if the user has the role of 'teacher' or 'admin'
            if (context.user.role !== 'teacher' && context.user.role !== 'admin') {
                throw new Error('Unauthorized access. Only teachers and admins can create grades.');
            }
            
            try {
                // Calculate the average score of all assignments
                const assignments = await Assignment.find({ student: input.student });
                if (assignments.length === 0) {
                    throw new Error('No assignments found for the student.');
                }

                const totalScore = assignments.reduce((total, assignment) => total + assignment.grade, 0);
                const averageScore = totalScore / assignments.length;

                // Create a new grade entry
                const newGrade = new Grade({
                    student: input.student,
                    value: averageScore // Assuming value is the field for storing the grade
                });

                // Save the new grade
                const savedGrade = await newGrade.save();

                return savedGrade;
            } catch (error) {
                throw new Error('Failed to create grade: ' + error.message);
            }
        },
        markAttendance: async (_, { input }, context) => {
            // Check if the user is authorized to mark attendance
            if (!context.user || (context.user.role !== 'teacher' && context.user.role !== 'admin')) {
                throw new Error('Unauthorized access');
            }
        
            // Extract input data
            const { studentId, date, status } = input;
        
            // Find the student
            const student = await Student.findById(studentId);
            if (!student) {
                throw new Error('Student not found');
            }
        
            // Mark attendance for the student on the given date
            const attendanceRecord = {
                date,
                status
            };
            student.attendance.push(attendanceRecord);
            await student.save();
        
            return 'Attendance marked successfully';
        },
        
        updateAttendance: async (_, { id, status }, context) => {
            // Check if the user is authorized to update attendance
            if (!context.user || (context.user.role !== 'teacher' && context.user.role !== 'admin')) {
                throw new Error('Unauthorized access');
            }
        
            // Find the attendance record by ID
            const student = await Student.findOne({ 'attendance._id': id });
            if (!student) {
                throw new Error('Attendance record not found');
            }
        
            // Update the status of the attendance record
            const attendanceRecord = student.attendance.id(id);
            if (!attendanceRecord) {
                throw new Error('Attendance record not found');
            }
            attendanceRecord.status = status;
            await student.save();
        
            return 'Attendance updated successfully';
        },
        
        createAssignment: async (_, { input }, context) => {
            // Check if the user is authorized to create an assignment
            if (!context.user || (context.user.role !== 'teacher' && context.user.role !== 'admin')) {
                throw new Error('Unauthorized access');
            }
        
            // Create a new assignment
            const newAssignment = new Assignment(input);
            const savedAssignment = await newAssignment.save();
        
            return savedAssignment;
        },
        
        updateAssignment: async (_, { input }, context) => {
            // Check if the user is authorized to update an assignment
            if (!context.user || (context.user.role !== 'teacher' && context.user.role !== 'admin')) {
                throw new Error('Unauthorized access');
            }
        
            // Extract input data
            const { id, ...update } = input;
        
            // Update the assignment
            const updatedAssignment = await Assignment.findByIdAndUpdate(id, update, { new: true });
            if (!updatedAssignment) {
                throw new Error('Assignment not found');
            }
        
            return updatedAssignment;
        },
        
        deleteAssignment: async (_, { assignmentId }, context) => {
            // Check if the user is authorized to delete an assignment
            if (!context.user || (context.user.role !== 'teacher' && context.user.role !== 'admin')) {
                throw new Error('Unauthorized access');
            }
        
            // Delete the assignment
            const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);
            if (!deletedAssignment) {
                throw new Error('Assignment not found');
            }
        
            return true;
        }

    }
}