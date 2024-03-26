import { gql } from '@apollo/client';

export const GET_USER = gql`
    query getUser($id: ID!) {
        getUser(id: $id) {
            id
            username
            email
            password
            role {
                student
                parent
                admin
            }
            name
        }
    }

`;

export const GET_USER_BY_EMAIL = gql`
    query user($email: String!) {
        user(email: $email) {
            id
            username
            email
        }
    }
`;

export const Fetch_User_Info = gql`
    query FetchUserInfo($id: ID!, $role: Role, $childName: String, $childDOB: String) {
        fetchUserInfo(id: $id, role: $role, childName: $childName, childDOB: $childDOB) {
            id
            name
            username
            email
            DoB
            role
            createdAt
        }
    }
`;

export const GET_CLASSROOM_INFO = gql`
    query GetClassroomInfo($roomNumber: Int!) {
        getClassroomInfo(roomNumber: $roomNumber) {
            room {
                roomNumber
            }
            teacher {
                id
                user {
                    id
                    name
                }
            }
            students {
                id
                user {
                    id
                    name
                }
            }
        }
    }
`;

export const GET_GRADES = gql `
    query GetGrades($studentId: ID!) {
        getGrades(studentId: $studentId) {
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

export const GET_ATTENDANCE = gql`
  query GetAttendance($studentId: ID!, $startDate: String!, $endDate: String!) {
    getAttendance(studentId: $studentId, startDate: $startDate, endDate: $endDate) {
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

export const GET_ASSIGNMENTS_FOR_STUDENT = gql`
  query GetAssignmentsForStudent($studentId: ID!) {
    getAssignmentsForStudent(studentId: $studentId) {
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

export const GET_ASSIGNMENT_BY_ID = gql`
  query GetAssignmentById($assignmentId: ID!) {
    getAssignmentById(assignmentId: $assignmentId) {
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
