const { gql } = require('apollo-server-express');

module.exports = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        password: String!
        DoB: String
        role: Role!
        createdAt: String
    }
    
    input UserInput {
        name: String
        username: String
        email: String
        password: String
        DoB: String
        role: String
    }
    
    enum Role {
        admin
        parent
        student
        teacher
    }
    
    type Admin {
        id: ID!
        user: User!
    }
    
    input AdminInput {
        user: UserInput!
    }
    
    type Parent {
        id: ID!
        user: User!
        child: [Student!]!
    }
    
    input ParentInput {
        user: UserInput!
        child: [StudentInput!]!
    }
    
    type Teacher {
        id: ID!
        user: User!
        students: [Student!]!
        room: Room!
    }
    
    input TeacherInput {
        user: UserInput!
        students: [StudentInput!]!
        room: Int!
    }
    
    type Student {
        id: ID!
        user: User!
        teacher: Teacher!
        room: Room!
        grades: [Grade!]!
        assignments: [Assignment!]!
        attendance: [Attendance!]!
    }
    
    input StudentInput {
        user: UserInput!
        teacherId: ID!
        room: Int!
    }

    type Room {
        roomNumber: Int!
    }

    type ClassroomInfo {
        room: Room!
        teacher: Teacher!
        students: [Student!]!
    }

    type Grade {
        id: ID!
        student: Student!
        value: Float!
    }

    input GradeInput {
        studentId: ID!
        value: Float!
    }

    type Assignment {
        id: ID!
        student: Student!
        name: String!
        grade: Float!
    }

    input AssignmentInput {
        studentId: ID!
        teacherId: ID!
        name: String!
        grade: Float!
        roomNumber: Int!
    }

    input UpdateAssignmentInput {
        assignmentId: ID!
        name: String!
        grade: Float
        studentId: ID
        teacherId: ID
        roomNumber: Int!
    }

    type Attendance {
        id: ID!
        student: Student!
        date: String!
        status: RollCall!
    }

    input AttendanceInput {
        studentId: ID!
        date: String!
        status: RollCall!
    }

    enum RollCall {
        present
        tardy
        absent
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        user(email: String!): User
        getUser(id: ID!): User
        fetchUserInfo(id: ID!, role: Role, childName: String, childDOB: String): User!
        getClassroomInfo(roomNumber: Int!): ClassroomInfo!
        getGrades(studentId: ID!): [Grade]
        getAttendance(studentId: ID!, startDate: String!, endDate: String!): [Attendance]
        getAssignmentsForStudent(studentId: ID!): [Assignment!]!
        getAssignmentById(assignmentId: ID!): Assignment
    }

    type Mutation {
        createStudent(input: StudentInput!): Student
        updateStudent(id: ID!, input: StudentInput!): Student
        deleteStudent(id: ID!): Boolean
        createUser(input: ParentInput!): Parent
        changePassword(currentPassword: String!, newPassword: String!): String
        createAdmin(input: AdminInput!): Admin
        createTeacher(input: TeacherInput!): Teacher
        assignTeacherToClassroom(teacherId: ID!, roomNumber: Int!): Teacher
        assignStudentToClassroom(studentId: ID!, roomNumber: Int!): Student
        createGrade(input: GradeInput!): Grade
        markAttendance(input: AttendanceInput!): Attendance
        updateAttendance(id: ID!, status: AttendanceInput!): Attendance
        createAssignment(input: AssignmentInput!): Assignment
        updateAssignment(input: UpdateAssignmentInput!): Assignment
        deleteAssignment(assignmentId: ID!): Boolean
        login(email: String!, password: String!): Auth
    }
`