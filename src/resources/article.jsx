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
} from "react-admin";
import AIcon from "@material-ui/icons/LibraryBooks";

export const ArticleIcon = AIcon;

const filters = [
  <TextInput source="title" label="title" alwaysOn />,
  <TextInput source="label" label="label" alwaysOn />,
  <TextInput source="q" label="search in article text" alwaysOn />,
  <ReferenceInput source="user_id" label="User" reference="users" allowEmpty>
    <SelectInput optionText="username" />
  </ReferenceInput>,
];

export const ArticleList = (props) => (
  <List filters={filters} {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="user_id" reference="users">
        <TextField source="username" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="priority" />
      <TextField source="label" />
      <DateField source="created_at" />
      <EditButton basePath="" />
      <DeleteButton basePath="" />
      <ShowButton basePath="" />
    </Datagrid>
  </List>
);

const ArticleTitle = ({ record }) => {
  return <span>Article {record ? `"${record.title}"` : ""}</span>;
};

export const ArticleEdit = (props) => (
  <Edit title={<ArticleTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="created_at" />
      <ReferenceInput disabled source="user_id" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput multiline source="article" />
      <TextInput source="label" />
      <TextInput source="priority" type="number" />
    </SimpleForm>
  </Edit>
);

export const ArticleCreate = (props) => (
  <Create title="Create a Article" {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="article" />
      <TextInput source="label" />
      <TextInput source="priority" type="number" />
    </SimpleForm>
  </Create>
);

export const ArticleShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="summary">
        <TextField label="Id" source="id" />
        <TextField source="title" />
        <TextField source="article" />
        <TextField source="label" />
        <TextField source="priority" />
        <TextField source="created_at" />
        <ReferenceField source="user_id" reference="users">
          <TextField source="username" />
        </ReferenceField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
