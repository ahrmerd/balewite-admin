import { linkToRecord, useRecordContext, useGetOne } from "react-admin";
import { Link } from "react-router-dom";
import { useQuery, Loading, Error } from "react-admin";
import { List, ListItem, Button } from "@material-ui/core";
const DepartmentCourses = ({ record }) => {
  const { data, loading, error } = useQuery({
    type: "getMany",
    resource: `departments/${record.id}/courses`,
    payload: { id: record.id },
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;
  return (
    <List>
      {data.map((course) => {
        const courseShowPage = linkToRecord("/courses", course.id, "show");
        return (
          <ListItem key={course.id}>
            <Link to={courseShowPage}>{course.code}</Link>
          </ListItem>
        );
      })}
    </List>
  );
};

export default DepartmentCourses;
