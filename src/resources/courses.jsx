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
import Icon from "@material-ui/icons/Bookmark";
import CourseDepartments from "./courseDepartment";
export const CourseIcon = Icon;

const filters = [
  <ReferenceInput source="level_id" label="levels" reference="level" allowEmpty>
    <SelectInput optionText="level" />
  </ReferenceInput>,
];

export const CourseList = (props) => (
  <List filters={filters} {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="level_id" reference="levels">
        <TextField source="level" />
      </ReferenceField>
      <TextField source="code" />
      <TextField source="name" />
      <DateField source="created_at" />
      <EditButton basePath="" />
      <DeleteButton basePath="" />
      <ShowButton basePath="" />
    </Datagrid>
  </List>
);

const CourseTitle = ({ record }) => {
  return <span>Course {record ? `"${record.code}"` : ""}</span>;
};

export const CourseEdit = (props) => (
  <Edit title={<CourseTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="created_at" />
      <TextInput source="code" />
      <TextInput source="name" />
      <ReferenceInput disabled source="level_id" reference="levels">
        <SelectInput optionText="level" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const CourseCreate = (props) => (
  <Create title="Create a Course" {...props}>
    <SimpleForm>
      <TextInput source="code" />
      <TextInput source="name" />
      <ReferenceInput source="level_id" reference="levels">
        <SelectInput optionText="level" />
      </ReferenceInput>
      <ReferenceInput source="department_id" reference="departments">
        <SelectInput optionText="department" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const CourseShow = (props) => {
  return (
    <Show title={<CourseTitle />} {...props}>
      <TabbedShowLayout>
        <Tab label="summary">
          <TextField label="Id" source="id" />
          <TextField source="code" />
          <TextField source="name" />
          <TextField source="created_at" />
          <ReferenceField source="level_id" reference="levels">
            <TextField source="level" />
          </ReferenceField>
        </Tab>
        <Tab label="departments associated to this course">
          <CourseDepartments />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
