import * as React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  EditButton,
  TextInput,
  DateInput,
} from "react-admin";
import FIcon from "@material-ui/icons/School";
export const FacultyIcon = FIcon;

export const FacultyList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="faculty" />
      <DateField source="created_at" />
      <EditButton basePath="" />
    </Datagrid>
  </List>
);

const FacultyTitle = ({ record }) => {
  return <span>Faculty {record ? `"${record.faculty}"` : ""}</span>;
};

export const FacultyEdit = (props) => (
  <Edit title={<FacultyTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="created_at" />
      <TextInput source="faculty" />
    </SimpleForm>
  </Edit>
);

export const FacultyCreate = (props) => (
  <Create title="Create a Faculty" {...props}>
    <SimpleForm>
      <TextInput source="faculty" />
    </SimpleForm>
  </Create>
);
