/* eslint-disable react/prop-types */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ViewCourseScreen from '../screens/courses/ViewCourseScreen';
import CoursesScreen from '../screens/courses/CoursesScreen';
import TeacherProfileScreen from '../screens/teachers/TeacherProfileScreen';
import TeacherProfileEditScreen from '../screens/teachers/TeacherProfileEditScreen';
import EditCourseScreen from '../screens/courses/EditCourseScreen';
import StudentsScreen from '../screens/students/StudentsScreen';
import CreateStudentScreen from '../screens/students/CreateStudentScreen';
import StudentProfileScreen from '../screens/students/StudentProfileScreen';
import AttendanceScreen from '../screens/attendances/AttendanceScreen';
import AttendanceSummaryScreen from '../screens/attendances/AttendanceSummaryScreen';

/**
 * HomeStack is the main navigation stack starting from the HomeScreen
 */
export const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  ViewCourse: {
    screen: ViewCourseScreen,
    navigationOptions: {
      headerTitle: 'ViewCourse',
    },
  },
  Courses : {
    screen: CoursesScreen,
    navigationOptions: {
      headerTitle: 'Courses',
    },
  },
  TeacherProfile : {
    screen: TeacherProfileScreen,
    navigationOptions: {
      headerTitle: 'Profile',
    },
  },
  EditTeacherProfile : {
    screen: TeacherProfileEditScreen,
    navigationOptions: {
      headerTitle: 'Edit Profile',
    },
  },
  EditCourse : {
    screen: EditCourseScreen,
    navigationOptions: {
      headerTitle: 'EditCourse',
    },
  },
  Students : {
    screen: StudentsScreen,
    navigationOptions: {
      headerTitle: 'Students',
    },
  },
  CreateStudent : {
    screen: CreateStudentScreen,
    navigationOptions: {
      headerTitle: 'CreateStudent',
    },
  },
  StudentProfile : {
    screen: StudentProfileScreen,
    navigationOptions: {
      headerTitle: 'StudentProfile',
    },
  },
  Attendances: {
    screen: AttendanceScreen,
    navigationOptions: {
      headerTitle: 'Attendance',
    },
  },
  AttendanceSummary: {
    screen: AttendanceSummaryScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Attendance Summary',
      headerRight: (<Button title='Edit' onPress={() => { navigation.goBack() }}/>),
    }),
  },
});


/**
 * Class for defining API routes
 */
export class APIRoutes {
  // Use to build api routes
  static createRoute(route)           { return `/api/${route}` }

  // Courses
  static getCoursesPath()             { return APIRoutes.createRoute(`courses`) }
  static getCoursePath(id)            { return APIRoutes.createRoute(`courses/${id}`) }

  // Sessions
  static getSessionsPath(id)          { return APIRoutes.createRoute(`courses/${id}/sessions`) }

  //Teachers
  static getTeacherPath(id)           { return APIRoutes.createRoute(`teachers/${id}`) }

  // Students
  static getStudentsPath(courseId)          { return APIRoutes.createRoute(`courses/${courseId}/students`) }
  static getStudentPath(studentId)          { return APIRoutes.createRoute(`students/${studentId}`)}

  // Attendances
  static attendanceItemPath()         { return APIRoutes.createRoute(`attendances/attendance_item`) }
  static attendancePath(id)           { return APIRoutes.createRoute(`attendances/${id}`) }
}
