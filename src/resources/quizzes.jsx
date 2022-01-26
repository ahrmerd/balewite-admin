import * as React from "react";
import { Link } from "react-router-dom";
import {
  TabbedShowLayout,
  Tab,
  List,
  Datagrid,
  // Link,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  SelectInput,
  EditButton,
  TextInput,
  ArrayField,
  ReferenceField,
  BooleanField,
  ReferenceInput,
  Show,
  ShowButton,
  ReferenceManyField,
  CardActions,
} from "react-admin";
import QIcon from "@material-ui/icons/QuestionAnswer";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import { Button } from "react-admin";
export const QuizIcon = QIcon;

const filters = [
  <TextInput source="title" label="Search by title" alwaysOn />,
  <ReferenceInput
    source="course_id"
    label="course"
    reference="courses"
    allowEmpty
  >
    <SelectInput optionText="code" />
  </ReferenceInput>,
  <TextInput label="Year" source="year" />,
];

export const QuizList = (props) => (
  <List filters={filters} {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="course_id" reference="courses">
        <TextField source="code" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="year" />
      <DateField source="created_at" />
      <EditButton basePath="" />
      <ShowButton basePath="" />
    </Datagrid>
  </List>
);

const QuizTitle = ({ record }) => {
  return <span>Quiz {record ? `"${record.title}"` : ""}</span>;
};

export const QuizEdit = (props) => (
  <Edit title={<QuizTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="created_at" />
      <TextInput source="title" />
      <TextInput source="year" />
      <ReferenceInput source="course_id" reference="courses">
        <SelectInput optionText="code" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const QuizCreate = (props) => (
  <Create title="Create a Quiz" {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="year" />
      <ReferenceInput source="course_id" reference="courses">
        <SelectInput optionText="code" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

const AddNewQuestionButton = ({ record }) => {
  return (
    <Button
      component={Link}
      to={{
        pathname: "/questions/create",
        // Here we specify the initial record for the create view
        state: { record: { quiz_id: record.id } },
      }}
      label="Add a question"
    >
      <AddIcon />
    </Button>
  );
};

export const QuizShow = (props) => (
  <Show title={<QuizTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="summary">
        <TextField source="id" />
        <ReferenceField source="course_id" reference="courses">
          <TextField source="code" />
        </ReferenceField>
        <TextField source="title" />
        <TextField source="year" />
        <DateField source="created_at" />
      </Tab>
      <Tab label="questions" path="questions">
        <ReferenceManyField
          reference="questions"
          target="quiz_id"
          addLabel={false}
        >
          <Datagrid>
            <TextField source="question" />
            <ArrayField source="choices">
              <Datagrid>
                <TextField source="choice" />
                <BooleanField source="is_answer"></BooleanField>
              </Datagrid>
            </ArrayField>
            <DateField source="created_at" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
        <AddNewQuestionButton />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
