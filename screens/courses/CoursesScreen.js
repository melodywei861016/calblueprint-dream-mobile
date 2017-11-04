import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { cardStyles } from '../../components/CourseCard/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

class CoursesScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchCourses = this._fetchCourses.bind(this);
    this._renderCourses = this._renderCourses.bind(this);
    this.state = {
      courses : { },
      isLoading : true,
    }
  }

  componentDidMount() {
    this._fetchCourses();
  }

  _fetchCourses() {
    const successFunc = (responseData) => {
      this.setState({ courses: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      // TODO (caseytaka): Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getCoursesPath(), successFunc, errorFunc);
  }

  _renderCourses() {
    const date = new Date();
    const { navigate } = this.props.navigation;
    return this.state.courses.map(function(course, i) {
      return(
        <View key={i} style={cardStyles.container}>
          <Text style={cardStyles.title}>{course.title}</Text>
          <Button
            onPress={() => navigate('Attendances', {
              courseId: course.id,
              courseTitle: course.title,
              date: date
            })}
            title="Take Attendance"
          />
          <Button
            onPress={() => navigate('Students', { courseId: course.id })}
            title="View Students"
          />
        </View>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    let courses;
    if (this.state.isLoading) {
      // TODO (caseytaka): Add loading gif.
      courses = (
        <Text>Loading...</Text>
      )
    } else {
      courses = this._renderCourses()
    }
    return (
      <ScrollView>
        <View>
          <Button
            onPress={() => navigate('CreateCourse', {refreshCourses: this._fetchCourses})}
            title="Create Course"
          />
          { courses }
        </View>
      </ScrollView>
    );

  }
}

export default CoursesScreen;
