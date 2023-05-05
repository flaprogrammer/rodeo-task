import { useQuery } from '@tanstack/react-query';
import Typography from 'shared/Typography/Typography';
import Box from 'shared/Box/Box';

import { getProjects } from 'api/api';
import ProjectListItem from 'components/ProjectListItem';
import Spinner from 'shared/Spinner/Spinner';

const ProjectList = () => {

  const { data, isLoading, status } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects()
  });

  return (
    <Box>
      <Typography variant="h4" mb={2} mt={2} >All Projects List</Typography>
      {isLoading ? <Spinner /> : (
        <>
          {status === 'success' && data.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </>
      )}
    </Box>
  );
};

export default ProjectList;