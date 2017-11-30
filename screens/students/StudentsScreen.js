import React from 'react';
import { Button, Text, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';

class StudentsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students : { },
      isLoading : true,
      courseId: this.props.navigation.state.params.courseId,
    }

    this._fetchStudents = this._fetchStudents.bind(this);
    this._renderStudents = this._renderStudents.bind(this);
    this._fetchStudent = this._fetchStudent.bind(this);
    this._refreshStudents = this._refreshStudents.bind(this);
    this.navigateToStudentProfile = this.navigateToStudentProfile.bind(this);
  }

  componentDidMount() {
    this._fetchStudents(this.state.courseId);
  }

  _fetchStudents() {
    const successFunc = (responseData) => {
      this.setState({ students: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      // TODO: Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getStudentsPath(this.state.courseId), successFunc, errorFunc);
  }

  _fetchStudent(studentId) {
    const { navigate } = this.props.navigation;
    const successFunc = (responseData) => {
      this.setState({ student: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      // TODO: Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getStudentPath(studentId), successFunc, errorFunc);
  }

  _refreshStudents() {
    console.log("calling ref");
    const { navigate } = this.props.navigation;
    const successFunc = (responseData) => {
      this.setState({ students: responseData, isLoading: false });
    };
    const errorFunc = (error) => {
      console.error(error);
    };
    getRequest(APIRoutes.getStudentsPath(this.state.courseId), successFunc, errorFunc);
  }

  // navigateToStudentProfile() {
  //   this.props.navigation.navigate('StudentProfile', {
  //     refreshStudents: this._refreshStudents,
  //     studentId: student.id,
  //   });
  // }

  navigateToStudentProfile = () => {
    this.props.navigation.navigate('StudentProfile', {
      refreshStudents: this._refreshStudents,
      studentId: student.id,
    });
  }

  _renderStudents() {
    const { navigate } = this.props.navigation;
    return this.state.students.map(function(student, i) {
      return(
        <View key={i}>
            <Button
            onPress={this.navigateToStudentProfile}
            title={student.first_name + " " + student.last_name}
            />
        </View>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    let students;
    if (this.state.isLoading) {
      // TODO: Add loading gif.
      students = (
        <Text>Loading...</Text>
      )
    } else {
      students = this._renderStudents()
    }
    return (
      <View style={commonStyles.container}>
        <Button
          onPress={() => navigate('CreateStudent', {refreshStudents: this._fetchStudents,
                                                    courseId: this.state.courseId,
                                                    newStudent: true})}
          title="Create Student"
        />
        { students }
      </View>
    );

  }
}

export default StudentsScreen;
