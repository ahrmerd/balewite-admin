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
import Icon from "@material-ui/icons/ViewDay";
export const DayIcon = Icon;

export const DayList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="day" />
      <DateField source="created_at" />
      <EditButton basePath="" />
    </Datagrid>
  </List>
);

const DayTitle = ({ record }) => {
  return <span>Day {record ? `"${record.day}"` : ""}</span>;
};

export const DayEdit = (props) => (
  <Edit title={<DayTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="created_at" />
      <TextInput source="day" />
    </SimpleForm>
  </Edit>
);

export const DayCreate = (props) => (
  <Create title="Create a Day" {...props}>
    <SimpleForm>
      <TextInput source="day" />
    </SimpleForm>
  </Create>
);
