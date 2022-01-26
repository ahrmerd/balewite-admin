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
import Icon from "@material-ui/icons/UpdateRounded";
export const PeriodIcon = Icon;

export const PeriodList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="start_time" />
      <TextField source="end_time" />
      <DateField source="created_at" />
      <EditButton basePath="" />
    </Datagrid>
  </List>
);

const PeriodTitle = ({ record }) => {
  return (
    <span>
      Period {record ? `${record.start_time} - ${record.end_time}` : ""}
    </span>
  );
};

export const PeriodEdit = (props) => (
  <Edit title={<PeriodTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="created_at" />
      <TextInput source="start_time" />
      <TextInput source="end_time" />
    </SimpleForm>
  </Edit>
);

export const PeriodCreate = (props) => (
  <Create title="Create a Period" {...props}>
    <SimpleForm>
      <TextInput source="start_time" />
      <TextInput source="end_time" />
    </SimpleForm>
  </Create>
);
