import { Link } from 'react-router-dom';
import type { Project } from 'types/types';
import Card from 'shared/Card/Card';
import Typography from 'shared/Typography/Typography';

type Props = {
    project: Project;
}

const ProjectListItem = ({ project }: Props) => {
    return (
        <Link key={project.id} to={`/projects/${project.id}`}>
            <Card>
                <Typography variant="h6">{project.name}</Typography>
                <Typography variant="body2">
                    {project.client}
                </Typography>
                <Typography color="text.secondary">
                    {project.description}
                </Typography>
                
            </Card>
        </Link>
    );
};

export default ProjectListItem;