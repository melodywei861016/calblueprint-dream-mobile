/* eslint-disable react/prop-types */
import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CoursesScreen from '../screens/courses/CoursesScreen';
import TeacherProfileScreen from '../screens/teachers/TeacherProfileScreen';


export const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
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
});


export class APIRoutes {
  static createRoute(route)           { return `/api/${route}` }

  static getCoursesPath()             { return APIRoutes.createRoute(`courses`) }
  static getTeachersPath()             { return APIRoutes.createRoute('teachers')}
  // Example route w/ id
  // static createComponentPath(id)    { return APIRoutes.createRoute(`admins/subsections/${id}/components`) }
}
