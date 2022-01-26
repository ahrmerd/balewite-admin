import * as React from "react";
import {
  TabbedShowLayout,
  Tab,
  Show,
  List,
  Datagrid,
  Edit,
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
import Icon from "@material-ui/icons/People";
export const UserIcon = Icon;

const filters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput
    source="department_id"
    label="User"
    reference="departments"
    allowEmpty
  >
    <SelectInput optionText="department" />
  </ReferenceInput>,
];

export const UserList = (props) => (
  <List filters={filters} {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="department_id" reference="departments">
        <TextField source="department" />
      </ReferenceField>
      <TextField source="username" />
      <TextField source="phone_number" />
      <TextField source="email" />
      <TextField source="authorization_level" label="authorization" />
      <DateField source="created_at" />
      <EditButton basePath="" />
      <DeleteButton basePath="" />
      <ShowButton basePath="" />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.username}"` : ""}</span>;
};

export const UserEdit = (props) => {
  const choices = [
    { level: 10, alias: "Admin" },
    { level: 5, alias: "moderator" },
    { level: 3, alias: "verified user" },
    { level: 2, alias: "normal user" },
    { level: 1, alias: "banned user" },
  ];
  const optionRenderer = (choice) => ` Level ${choice.level} - ${choice.alias}`;
  return (
    <Edit title={<UserTitle />} {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput disabled source="username" />
        <TextInput disabled source="created_at" />
        <TextInput disabled source="department_id" />
        <SelectInput
          source="authorization_level"
          optionValue="level"
          choices={choices}
          optionText={optionRenderer}
        ></SelectInput>
      </SimpleForm>
    </Edit>
  );
};

export const UserShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="summary">
        <TextField label="Id" source="id" />
        <TextField source="username" />
        <TextField source="email" />
        <TextField source="phone_number" />
        <TextField source="authorization_level" />
        <TextField source="created_at" label="joined at" />
        {/* <TextField source="created_at" /> */}
        <ReferenceField source="department_id" reference="departments">
          <TextField source="department" />
        </ReferenceField>
      </Tab>
      {/* <Tab label="quizzes" path="quizzes">
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
      </Tab> */}
    </TabbedShowLayout>
  </Show>
);
