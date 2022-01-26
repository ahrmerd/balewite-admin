import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  SimpleFormIterator,
  BooleanInput,
  ArrayInput,
  TextField,
} from "react-admin";
import { useLocation } from "react-router";

export const QuestionCreate = (props) => {
  const location = useLocation();
  console.log(location);
  console.log(location.state.record.quiz_id);
  const quiz_id =
    location.state && location.state.record
      ? location.state.record.quiz_id
      : undefined;
  const redirect = quiz_id ? `/quizzes/${quiz_id}/show/questions` : false;
  return (
    <Create title="Add A Question" {...props}>
      <SimpleForm redirect={redirect}>
        <TextInput source="question" />
        <TextInput source="answer" />
        <ArrayInput source="incorrect" label="incorrect choices">
          <SimpleFormIterator>
            <TextInput label="choice" />
            {/* <BooleanInput source="is_answer" /> */}
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};
