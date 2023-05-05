import { Link } from 'react-router-dom';
import { getInvoices} from 'api/api';
import { useQuery } from '@tanstack/react-query';
import Spinner from 'shared/Spinner/Spinner';
import InvoiceListItem from './InvoiceListItem';
import Typography from 'shared/Typography/Typography';

type Props = {
  projectId: string
}

const InvoiceList = ({ projectId }: Props) => {

  const { isLoading, data, status } = useQuery({
    queryKey: ['invoices', projectId],
    queryFn: () => getInvoices(projectId)
  });

  return (
    <div>
      <Typography variant="h5">Invoices</Typography>

      { isLoading ? <Spinner /> : (
        <div>
          {status === 'success' && data.map((invoice) => (
            <Link
              key={invoice.id}
              to={`/projects/${projectId}/invoices/${invoice.id}`}
            >
              <InvoiceListItem invoice={invoice} />
            </Link>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default InvoiceList;