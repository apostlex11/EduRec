import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;

export const CREATE_STUDENT = gql`
mutation CreateStudent($input: StudentInput!) {
    createStudent(input: $input) {
        id
        user {
            id
            name
            email
            username
            password
            DoB
            role
        }
        teacher {
            id
        }
        room {
            roomNumber
        }
    }
}

`;

export const UPDATE_STUDENT = gql`
mutation UpdateStudent($id: ID!, $input: StudentInput!) {
    updateStudent(id: $id, input: $input) {
        id
        user {
            id
            name
        }
        teacher {
            id
        }
        room {
            roomNumber
        }
    }
}

`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID!) {
    deleteStudent(id: $id)
  }
`;

export const CREATE_ADMIN = gql`
mutation CreateAdmin($input: AdminInput!) {
    createAdmin(input: $input) {
        id
        user {
            id
            name
        }
    }
}
`;

export const CREATE_GRADE = gql `
mutation CreateGrade($input: GradeInput!) {
    createGrade(input: $input) {
        id
        value
        student {
            id
            user {
                id
                name
            }
        }
    }
}
`;

export const CREATE_TEACHER = gql`
  mutation CreateTeacher($input: TeacherInput!) {
    createTeacher(input: $input) {
      id
      user {
        id
        name
        email
        username
        password
        DoB
        role
      }
      students {
        id
        user {
          id
          name
        }
      }
      room {
        roomNumber
      }
    }
  }
`;

export const CREATE_ASSIGNMENT = gql`
  mutation CreateAssignment($input: AssignmentInput!) {
    createAssignment(input: $input) {
      id
      student {
        id
        user {
          id
          name
        }
      }
      name
      grade
    }
  }
`;

export const UPDATE_ASSIGNMENT = gql`
  mutation UpdateAssignment($input: UpdateAssignmentInput!) {
    updateAssignment(input: $input) {
      id
      student {
        id
        user {
          id
          name
        }
      }
      name
      grade
    }
  }
`;

export const DELETE_ASSIGNMENT = gql`
  mutation DeleteAssignment($assignmentId: ID!) {
    deleteAssignment(assignmentId: $assignmentId)
  }
`;

export const ASSIGN_TEACHER_TO_CLASSROOM = gql`
  mutation AssignTeacherToClassroom($teacherId: ID!, $roomNumber: Int!) {
    assignTeacherToClassroom(teacherId: $teacherId, roomNumber: $roomNumber) {
      id
      room {
        roomNumber
      }
    }
  }
`;

export const ASSIGN_STUDENT_TO_CLASSROOM = gql`
  mutation AssignStudentToClassroom($studentId: ID!, $roomNumber: Int!) {
    assignStudentToClassroom(studentId: $studentId, roomNumber: $roomNumber) {
      id
      room {
        roomNumber
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: ParentInput!) {
    createUser(input: $input) {
      id
      user {
        id
        name
        email
        username
        password
        DoB
        role
      }
      child {
        id
        user {
          id
          name
        }
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`;

export const MARK_ATTENDANCE = gql`
  mutation MarkAttendance($input: AttendanceInput!) {
    markAttendance(input: $input) {
      id
      student {
        id
        user {
          id
          name
        }
      }
      date
      status
    }
  }
`;

export const UPDATE_ATTENDANCE = gql`
  mutation UpdateAttendance($id: ID!, $status: RollCall!) {
    updateAttendance(id: $id, status: $status) {
      id
      student {
        id
        user {
          id
          name
        }
      }
      date
      status
    }
  }
`;
