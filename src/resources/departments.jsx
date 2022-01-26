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
import DepartmentCourses from "./departmentCourses";
import BookIcon from "@material-ui/icons/Book";
export const DepartmentIcon = BookIcon;

const filters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput
    source="faculty_id"
    label="Faculties"
    reference="faculties"
    allowEmpty
  >
    <SelectInput optionText="faculty" />
  </ReferenceInput>,
];

export const DepartmentList = (props) => (
  <List filters={filters} {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="faculty_id" reference="faculties">
        <TextField source="faculty" />
      </ReferenceField>
      <TextField source="department" />
      <DateField source="created_at" />
      <EditButton basePath="" />
      <DeleteButton basePath="" />
      <ShowButton basePath="" />
    </Datagrid>
  </List>
);

const DepartmentTitle = ({ record }) => {
  return <span>Department {record ? `"${record.department}"` : ""}</span>;
};

export const DepartmentEdit = (props) => (
  <Edit title={<DepartmentTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="created_at" />
      <TextInput source="department" />
      <TextInput source="banner" type="url" />
      <ReferenceInput disabled source="faculty_id" reference="faculties">
        <SelectInput optionText="faculty" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const DepartmentCreate = (props) => (
  <Create title="Create a Department" {...props}>
    <SimpleForm>
      <TextInput source="department" />
      <TextInput source="banner" type="url" />
      <ReferenceInput source="faculty_id" reference="faculties">
        <SelectInput optionText="faculty" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const DepartmentShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="summary">
        <TextField label="Id" source="id" />
        <TextField source="department" />
        <TextField source="created_at" />
        <ImageField label="image" source="banner"></ImageField>

        <ReferenceField source="faculty_id" reference="faculties">
          <TextField source="faculty" />
        </ReferenceField>
      </Tab>
      <Tab label="quizzes" path="quizzes">
        <ReferenceManyField
          reference="quizzes"
          target="department_id"
          addLabel={false}
        >
          <Datagrid>
            <TextField source="title" />
            <TextField source="year" />
            <DateField source="created_at" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      <Tab label="courese registered for this department">
        <DepartmentCourses></DepartmentCourses>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
