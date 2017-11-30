import React from 'react';
import { Button, Text, View } from 'react-native';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import CreateStudentForm from '../../components/Form/CreateStudentForm'
import { getRequest, postRequest, putRequest } from '../../lib/requests';
import { standardError } from '../../lib/alerts';

class CreateStudentScreen extends React.Component {
  constructor(props) {
    super(props);
    this._onSuccess = this._onSuccess.bind(this);
    this._handleCreateStudent = this._handleCreateStudent.bind(this);
    this._handleUpdateStudent = this._handleUpdateStudent.bind(this);
    this.state = {
      student: {},
      courseId: this.props.navigation.state.params.courseId,
      teacherId: this.props.navigation.state.params.teacherId,
    }
  }

  _handleCreateStudent(params) {
    params.course_id = this.state.courseId;
    params.teacher_id = this.state.teacherId;

    const successFunc = (responseData) => {
      this.setState({ student: responseData});
      this.props.navigation.state.params.refreshStudents();
      this.props.navigation.goBack(null);
    }
    const errorFunc = (error) => {
      console.error(error);
    }
    postRequest(APIRoutes.getStudentsPath(this.state.courseId), successFunc, errorFunc, params);
  }

  _onSuccess(response) {
    this.props.navigation.state.params.refreshStudents();
    this.props.navigation.goBack(null);
  }

  _handleCreateStudent(params) {
    postRequest(APIRoutes.getStudentsPath(this.state.courseId), this._onSuccess, standardError, params=params);
  }

  _handleUpdateStudent(params) {
    putRequest(APIRoutes.getStudentPath(this.state.student.id), this._onSuccess, standardError, params=params);
  }

  render() {
    const navProps = this.props.navigation.state.params.student;
    console.log(navProps.first_name);
    if (navProps.newStudent) {
      return (
        <CreateStudentForm
          onSaveStudent={this._handleCreateStudent} />
      );
    } else {
      return (
         <View>
         <CreateStudentForm
            first_name={navProps.first_name}
            last_name={navProps.last_name}
            birthday={navProps.birthday}
            address={navProps.address}
            dream_id={navProps.dream_id}
            year={navProps.year}
            nickname={navProps.nickname}
            primary_contact={navProps.primary_contact}
            primary_contact_relationship={navProps.primary_contact_relationship}
            primary_contact_phone={navProps.primary_contact_phone}
            primary_contact_phone2={navProps.primary_contact_phone2}
            onSaveStudent={this._handleUpdateStudent} />
         </View>
      )
  }
  }
}

export default CreateStudentScreen;
