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
import Icon from "@material-ui/icons/TimelineRounded";
export const LevelIcon = Icon;

export const LevelList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="level" />
      <DateField source="created_at" />
      <EditButton basePath="" />
    </Datagrid>
  </List>
);

const LevelTitle = ({ record }) => {
  return <span>Level {record ? `"${record.lev}"` : ""}</span>;
};

export const LevelEdit = (props) => (
  <Edit title={<LevelTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="created_at" />
      <TextInput source="level" />
    </SimpleForm>
  </Edit>
);

export const LevelCreate = (props) => (
  <Create title="Create a Level" {...props}>
    <SimpleForm>
      <TextInput source="level" />
    </SimpleForm>
  </Create>
);
