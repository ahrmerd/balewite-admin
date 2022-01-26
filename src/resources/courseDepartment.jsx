import { linkToRecord, useRecordContext, useGetOne } from "react-admin";
import { Link } from "react-router-dom";
import { useQuery, Loading, Error } from "react-admin";
import { List, ListItem, Button } from "@material-ui/core";
const CourseDepartments = ({ record }) => {
  const { data, loading, error } = useQuery({
    type: "getMany",
    resource: `courses/${record.id}/departments`,
    payload: { id: record.id },
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;
  return (
    <List>
      {data.map((department) => {
        const departmentShowPage = linkToRecord(
          "/departments",
          department.id,
          "show"
        );
        return (
          <ListItem key={department.id}>
            <Link to={departmentShowPage}>{department.department}</Link>
          </ListItem>
        );
      })}
    </List>
  );
};

export default CourseDepartments;
