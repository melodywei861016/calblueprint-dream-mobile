import React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import { textStyles } from '../../styles/textStyles';
import { commonStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { getRequest, deleteRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';

class StudentProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this._renderStudent = this._renderStudent.bind(this);
    this._fetchStudent = this._fetchStudent.bind(this);
    this._deleteStudent = this._deleteStudent.bind(this);

    this.state = {
      student : { },
      isLoading : true,
      studentId: this.props.navigation.state.params.studentId,
    }
  }

  componentDidMount() {
    this._fetchStudent(this.state.studentId);
  }

  _fetchStudent(studentId) {
    const { navigate } = this.props.navigation;
    const successFunc = (responseData) => {
      this.setState({ student: responseData, isLoading: false });
    }
    getRequest(APIRoutes.getStudentPath(studentId), successFunc, standardError);
  }

  _deleteStudent(studentId) {
    const successFunc = (responseData) => {
      console.log("starting delete");
      this.props.navigation.state.params.refreshStudents();
      this.props.navigation.goBack(null);
    };
    const errorFunc = (error) => {
      console.error(error);
    };
    deleteRequest(APIRoutes.getStudentPath(studentId), successFunc, errorFunc);
  }

  _renderStudent() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Text style={textStyles.titleLarge}>
        {this.state.student.first_name} {this.state.student.last_name}
        </Text>

        <Text style={textStyles.titleSmall}>
        DREAM ID
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.dream_id}
        </Text>

        <Text style={textStyles.titleSmall}>
        Birthday
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.birthday}
        </Text>

        <Text style={textStyles.titleSmall}>
        Year
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.year}
        </Text>

        <Text style={textStyles.titleSmall}>
        Address
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.address}
        </Text>

        <Text style={textStyles.titleSmall}>
        Nickname
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.nickname}
        </Text>

        <Text style={textStyles.titleSmall}>
        Primary Contact
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.primary_contact}
        </Text>

        <Text style={textStyles.titleSmall}>
        Primary Contact Relationship
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.primary_contact_relationship}
        </Text>

        <Text style={textStyles.titleSmall}>
        Primary Contact Phone
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.primary_contact_phone}
        </Text>

        <Text style={textStyles.titleSmall}>
        Primary Contact Phone 2
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.primary_contact_phone2}
        </Text>

        <Button
          onPress={() => navigate('CreateStudent', {refreshStudents: this._fetchStudent, newStudent: false, student: this.state.student})}
          title='Edit'
        />

        <Button
          onPress={() => this._deleteStudent(this.state.studentId)}
          title='Delete'
        />

      </View>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    let students;
    if (this.state.isLoading) {
      // TODO: Add loading gif.
      student = (
        <Text>Loading...</Text>
      )
    } else {
      student = this._renderStudent()
    }
    return (
      <ScrollView>
        <View>
          { student }
        </View>
      </ScrollView>
    );
  }
}

export default StudentProfileScreen;
