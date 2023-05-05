import { useMemo } from 'react';
import Typography from 'shared/Typography/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Card from 'shared/Card/Card';
import { countTotal } from 'utils/invoice';
import { Invoice } from 'types/types';

dayjs.extend(relativeTime);

type Props = {
  invoice: Invoice
}

const InvoiceListItem = ({ invoice }: Props) => {

  const total = useMemo(() => {
    return countTotal(invoice?.lineItems, invoice?.fee);
  }, [invoice?.lineItems, invoice?.fee]);

  return (
    <Card>
      <Typography variant='h6'>Invoice {invoice.number}</Typography>
      <Typography>Due date: {invoice.dueDate} ({dayjs(invoice.dueDate).fromNow()})</Typography>
      <Typography>Total: {total} USD</Typography>
    </Card>
  );
};

export default InvoiceListItem;