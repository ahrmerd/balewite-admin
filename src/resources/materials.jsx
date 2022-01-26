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
  ReferenceField,
  ReferenceInput,
  UrlField,
} from "react-admin";
import Icon from "@material-ui/icons/LibraryBooks";

export const MaterialIcon = Icon;

const filters = [
  <TextInput source="title" label="title" alwaysOn />,
  <ReferenceInput
    source="course_id"
    label="course"
    reference="courses"
    allowEmpty
  >
    <SelectInput optionText="code" />
  </ReferenceInput>,
];

export const MaterialList = (props) => (
  <List filters={filters} {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="course_id" reference="courses">
        <TextField source="code" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="description" />
      <UrlField source="url" />
      <DateField source="created_at" />
      <EditButton basePath="" />
      <DeleteButton basePath="" />
      <ShowButton basePath="" />
    </Datagrid>
  </List>
);

const MaterialTitle = ({ record }) => {
  return <span>Material {record ? `"${record.title}"` : ""}</span>;
};

export const MaterialEdit = (props) => (
  <Edit title={<MaterialTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="created_at" />
      <ReferenceInput disabled source="course_id" reference="courses">
        <SelectInput optionText="code" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput source="url" type="url" />
      <TextInput multiline source="description" />
    </SimpleForm>
  </Edit>
);

export const MaterialCreate = (props) => (
  <Create title="Create a Material" {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" />
      <TextInput source="url" type="url" />
      <ReferenceInput source="course_id" reference="courses">
        <SelectInput optionText="code" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const MaterialShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="summary">
        <TextField label="Id" source="id" />
        <TextField source="title" />
        <TextField source="description" />
        <TextField source="url" />
        <TextField source="created_at" />
        <ReferenceField source="course_id" reference="courses">
          <TextField source="code" />
        </ReferenceField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
