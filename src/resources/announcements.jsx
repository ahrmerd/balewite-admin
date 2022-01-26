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
  BooleanInput,
  DateInput,
  ImageField,
  ReferenceField,
  ReferenceInput,
  useRecordContext,
  ReferenceManyField,
} from "react-admin";
import AIcon from "@material-ui/icons/NewReleases";

export const AnnouncementIcon = AIcon;

const filters = [
  <TextInput source="title" label="title" alwaysOn />,
  <TextInput source="label" label="label" alwaysOn />,
  <TextInput source="q" label="search in announcement text" alwaysOn />,
  <ReferenceInput
    source="user_id"
    label="posted by"
    reference="users"
    allowEmpty
  >
    <SelectInput optionText="username" />
  </ReferenceInput>,
];

export const AnnouncementList = (props) => (
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

const AnnouncementTitle = ({ record }) => {
  return <span>Announcement {record ? `"${record.title}"` : ""}</span>;
};

export const AnnouncementEdit = (props) => (
  <Edit title={<AnnouncementTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="created_at" />
      <ReferenceInput disabled source="user_id" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="title" />
      <BooleanInput source="image" />
      <TextInput source="image_url" />
      <TextInput source="announcement" />
      <TextInput source="label" />
      <TextInput source="priority" type="number" />
    </SimpleForm>
  </Edit>
);

export const AnnouncementCreate = (props) => (
  <Create title="Create a Announcement" {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput multiline source="announcement" />
      <TextInput source="label" />
      <BooleanInput source="image" />
      <TextInput source="image_url" />
      <TextInput source="priority" type="number" />
    </SimpleForm>
  </Create>
);

export const AnnouncementShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="summary">
        <TextField label="Id" source="id" />
        <TextField source="title" />
        <TextField source="announcement" />
        <TextField source="label" />
        <TextField source="priority" />
        <TextField source="created_at" />
        <ConditionalImageField {...props}></ConditionalImageField>
        <ReferenceField source="user_id" reference="users">
          <TextField source="username" />
        </ReferenceField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

const ConditionalImageField = (props) => {
  const record = useRecordContext(props);
  console.log(props);
  return record && record.image ? (
    <ImageField label="image" source="image_url" {...props}></ImageField>
  ) : null;
};
