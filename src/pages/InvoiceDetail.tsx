import React, { useMemo } from 'react';
import { getInvoiceById } from 'api/api';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Button from 'shared/Button/Button';
import Box from 'shared/Box/Box';
import { LineItemByHours, LineItemFixed } from 'types/types';
import Typography from 'shared/Typography/Typography';
import Table from 'shared/Table/Table';
import Spinner from 'shared/Spinner/Spinner';
import {
  filterLineItemsByHours,
  filterLineItemsFixed,
  countSubtotal,
  countFee,
  countTotal
} from 'utils/invoice';
import { RouteComponentProps } from 'react-router-dom';

dayjs.extend(relativeTime)

type Props = RouteComponentProps<{
  invoiceId: string
}>;

const InvoiceDetail = (props: Props) => {
  const { invoiceId } = props.match.params;

  const { isLoading, status, data: invoice } = useQuery({
    queryKey: ['invoice', invoiceId],
    queryFn: () => getInvoiceById(invoiceId)
  });

  const lineItems = useMemo(() => invoice?.lineItems || [], [invoice?.lineItems]);

  const lineItemsByHours = useMemo(() => {
    return filterLineItemsByHours(lineItems);
  }, [lineItems]);

  const lineItemsFixed = useMemo(() => {
    return filterLineItemsFixed(lineItems);
  }, [lineItems]);

  const subtotal = useMemo(() => {
    return countSubtotal(lineItems);
  }, [lineItems]);

  const fee = useMemo(() => {
    if (!invoice?.fee) return 0;
    return countFee(lineItems, invoice?.fee);
  }, [lineItems, invoice?.fee]);

  const total = useMemo(() => {
    if (!invoice?.fee) return 0;
    return countTotal(lineItems, invoice?.fee);
  }, [lineItems, invoice?.fee]);

  if (isLoading) return <Spinner />;

  if (status === 'error') return <div>Something went wrong</div>;

  return (
    <Box>
      <Typography variant="h4">Invoice {invoice.number}</Typography>
      <Typography variant="h6" mb={4}>Due Date: {invoice.dueDate}&nbsp;
      <span className='no-print'>({dayjs(invoice.dueDate).fromNow()})</span>
      </Typography>

      <Typography>Hourly items</Typography>
      <Table
        headers={[
          {
            label: 'Description',
            key: 'description'
          },
          {
            label: 'Hours spent',
            key: 'hours'
          },
          {
            label: 'Rate',
            key: 'rate'
          },
          {
            label: 'Tax Rate',
            key: 'taxRate'
          },
          {
            label: 'Total',
            key: 'total',
            body: (item: LineItemByHours) => item.rate * item.hours * (1 + item.taxRate / 100)
          }
        ]}
        data={lineItemsByHours}
      />

      <br />
      <Typography >Fixed price items</Typography>
      <Table
        headers={[
          {
            label: 'Description',
            key: 'description'
          },
          {
            label: 'Price',
            key: 'fixedPrice'
          },
          {
            label: 'Tax Rate',
            key: 'taxRate'
          },
          {
            label: 'Total',
            key: 'total',
            body: (item: LineItemFixed) => item.fixedPrice * (1 + item.taxRate / 100)
          }
        ]}
        data={lineItemsFixed}
      />
      
      <Typography variant="h6" mt={4}>Subtotal: {subtotal} USD</Typography>
      <Typography variant="subtitle1" mb={1}>Fee/Discount: {fee > 0 && '+'}{fee} USD ({invoice.fee}%)</Typography>
      <Typography variant="h6" mb={2}>Total: {total} USD</Typography>
      <Button className="no-print" onClick={() => window.print()}>Print Invoice</Button>
    </Box>
  );
};

export default InvoiceDetail;