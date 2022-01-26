import * as React from "react";
import { Admin, Resource } from "react-admin";
import balewiteDataProvider from "./balewiteDataProvider";
import authProvider from "./authProvider";
import MyLoginPage from "./Login";
import MyLogoutButton from "./LogoutButton";
import {
  FacultyList,
  FacultyEdit,
  FacultyCreate,
  FacultyIcon,
} from "./resources/faculties";
import {
  DepartmentList,
  DepartmentEdit,
  DepartmentCreate,
  DepartmentIcon,
  DepartmentShow,
} from "./resources/departments";

import {
  QuizList,
  QuizEdit,
  QuizCreate,
  QuizIcon,
  QuizShow,
} from "./resources/quizzes";
import { UserEdit, UserIcon, UserList, UserShow } from "./resources/users";
import {
  AnnouncementCreate,
  AnnouncementEdit,
  AnnouncementIcon,
  AnnouncementList,
  AnnouncementShow,
} from "./resources/announcements";
import {
  ArticleCreate,
  ArticleEdit,
  ArticleIcon,
  ArticleList,
  ArticleShow,
} from "./resources/article";
import { QuestionCreate } from "./resources/questions";
import { DayCreate, DayEdit, DayIcon, DayList } from "./resources/days";
import {
  PeriodCreate,
  PeriodEdit,
  PeriodIcon,
  PeriodList,
} from "./resources/periods";
import {
  LevelCreate,
  LevelEdit,
  LevelIcon,
  LevelList,
} from "./resources/level";
import {
  CourseCreate,
  CourseEdit,
  CourseIcon,
  CourseList,
  CourseShow,
} from "./resources/courses";
import {
  MaterialCreate,
  MaterialEdit,
  MaterialIcon,
  MaterialList,
  MaterialShow,
} from "./resources/materials";
import {
  LectureCreate,
  LectureEdit,
  LectureIcon,
  LectureList,
  LectureShow,
} from "./resources/lectures";
const App = () => (
  <Admin
    authProvider={authProvider}
    // loginPage={MyLoginPage}
    logoutButton={MyLogoutButton}
    dataProvider={balewiteDataProvider}
  >
    <Resource
      name="faculties"
      list={FacultyList}
      edit={FacultyEdit}
      create={FacultyCreate}
      icon={FacultyIcon}
    />
    <Resource
      name="periods"
      list={PeriodList}
      edit={PeriodEdit}
      create={PeriodCreate}
      icon={PeriodIcon}
    />
    <Resource
      name="levels"
      list={LevelList}
      edit={LevelEdit}
      create={LevelCreate}
      icon={LevelIcon}
    />
    <Resource
      name="days"
      list={DayList}
      edit={DayEdit}
      create={DayCreate}
      icon={DayIcon}
    />
    <Resource
      name="departments"
      list={DepartmentList}
      edit={DepartmentEdit}
      create={DepartmentCreate}
      icon={DepartmentIcon}
      show={DepartmentShow}
    />

    <Resource
      name="courses"
      list={CourseList}
      edit={CourseEdit}
      create={CourseCreate}
      icon={CourseIcon}
      show={CourseShow}
    />
    <Resource
      name="materials"
      list={MaterialList}
      edit={MaterialEdit}
      create={MaterialCreate}
      icon={MaterialIcon}
      show={MaterialShow}
    />
    <Resource
      name="lectures"
      list={LectureList}
      edit={LectureEdit}
      create={LectureCreate}
      icon={LectureIcon}
      show={LectureShow}
    />
    <Resource
      name="quizzes"
      list={QuizList}
      edit={QuizEdit}
      show={QuizShow}
      create={QuizCreate}
      icon={QuizIcon}
    />
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      show={UserShow}
      icon={UserIcon}
    />
    <Resource
      name="announcements"
      list={AnnouncementList}
      edit={AnnouncementEdit}
      show={AnnouncementShow}
      create={AnnouncementCreate}
      icon={AnnouncementIcon}
    />
    <Resource
      name="articles"
      list={ArticleList}
      edit={ArticleEdit}
      show={ArticleShow}
      create={ArticleCreate}
      icon={ArticleIcon}
    />
    <Resource name="questions" create={QuestionCreate} />
  </Admin>
);

export default App;
