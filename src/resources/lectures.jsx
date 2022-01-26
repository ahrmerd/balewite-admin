import * as React from "react";
import {
  TabbedShowLayout,
  Tab,
  Show,
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  SelectInput,
  EditButton,
  TextInput,
  DeleteButton,
  ShowButton,
  DateInput,
  ImageField,
  ReferenceField,
  ReferenceInput,
  ReferenceManyField,
} from "react-admin";
import Icon from "@material-ui/icons/ReplayRounded";
export const LectureIcon = Icon;

const filters = [
  <TextInput source="location" label="location" />,
  <ReferenceInput
    source="course_id"
    label="courses"
    reference="courses"
    allowEmpty
  >
    <SelectInput optionText="course" />
  </ReferenceInput>,
  <ReferenceInput source="day_id" label="days" reference="days" allowEmpty>
    <SelectInput optionText="day" />
  </ReferenceInput>,
  <ReferenceInput
    source="period_id"
    label="period"
    reference="periods"
    allowEmpty
  >
    <SelectInput optionText="start_time" />
  </ReferenceInput>,
];

export const LectureList = (props) => (
  <List filters={filters} {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="course_id" reference="courses">
        <TextField source="code" />
      </ReferenceField>
      <ReferenceField source="day_id" reference="days">
        <TextField source="day" />
      </ReferenceField>
      <ReferenceField source="period_id" reference="periods" label="start time">
        <TextField source="start_time" />
      </ReferenceField>
      <ReferenceField source="period_id" reference="periods" label="end time">
        <TextField source="end_time" />
      </ReferenceField>
      <TextField source="location" />
      <DateField source="created_at" />
      <EditButton basePath="" />
      <DeleteButton basePath="" />
      <ShowButton basePath="" />
    </Datagrid>
  </List>
);

const LectureTitle = ({ record }) => {
  return <span>Lecture {record ? `"${record.id}"` : ""}</span>;
};

export const LectureEdit = (props) => (
  <Edit title={<LectureTitle />} {...props}>
    <SimpleForm>
      <TextField source="id" />
      <TextField source="created_at" label="created_on" />
      <TextField source="location" />
      <TextField source="lecturer" />
      <ReferenceField source="course_id" reference="courses">
        <TextField source="code" />
      </ReferenceField>
      <ReferenceField source="day_id" reference="days">
        <TextField source="day" />
      </ReferenceField>
      <ReferenceField source="period_id" reference="periods" label="start time">
        <TextField source="start_time" />
      </ReferenceField>
      <ReferenceField source="period_id" reference="periods" label="end time">
        <TextField source="end_time" />
      </ReferenceField>
    </SimpleForm>
  </Edit>
);

export const LectureCreate = (props) => (
  <Create title="Create a Lecture" {...props}>
    <SimpleForm>
      <ReferenceInput source="course_id" reference="courses">
        <SelectInput optionText="code" />
      </ReferenceInput>
      <ReferenceInput source="day_id" reference="days">
        <SelectInput optionText="day" />
      </ReferenceInput>
      <ReferenceInput source="period_id" reference="periods">
        <SelectInput optionText="start_time" />
      </ReferenceInput>
      <TextInput source="location" />
      <TextInput source="lecturer" />
    </SimpleForm>
  </Create>
);

export const LectureShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="summary">
        <TextField label="Id" source="id" />
        <TextField source="created_at" label="created at" />
        <TextField source="location" />
        <TextField source="lecturer" />
        <ReferenceField source="course_id" reference="courses">
          <SelectInput optionText="code" />
        </ReferenceField>
        <ReferenceField source="day_id" reference="days">
          <SelectInput optionText="day" />
        </ReferenceField>
        <ReferenceField source="period_id" reference="periods">
          <SelectInput optionText="start_time" />
        </ReferenceField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
