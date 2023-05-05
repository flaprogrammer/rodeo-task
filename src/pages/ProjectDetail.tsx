import { RouteComponentProps } from 'react-router-dom';
import { getProjectById} from 'api/api';
import { useQuery } from '@tanstack/react-query';
import InvoiceList from 'components/InvoiceList';
import Box from 'shared/Box/Box';
import Typography from 'shared/Typography/Typography';
import Spinner from 'shared/Spinner/Spinner';
import { Project } from 'types/types';

type Props = RouteComponentProps<{
  projectId: string
}> & {
  project?: Project
}

const ProjectDetail = (props: Props) => {
  const { projectId } = props.match.params;

  const { isLoading, status, data: project } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => getProjectById(projectId)
  });

  return (
    <Box>
      { isLoading ? <Spinner /> : status === 'success' && (
        <>
          <Typography variant="h4" mb={2}>{project.name}</Typography>
          <Typography variant="h6">Client: {project.client}</Typography>
          <Typography variant="h6" mb={4}>Description: {project.description}</Typography>
        </>
      )}
      <InvoiceList projectId={projectId} />
      
    </Box>
  );
};

export default ProjectDetail;