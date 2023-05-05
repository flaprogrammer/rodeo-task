import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from '@mui/material';

type Header = {
  label: string;
  key: string;
  body?: (item: any) => string | number;
}

type Props = {
  headers: Header[];
  data: {
    [key: string]: string | number;
  }[];
}

const Table = (props: Props) => {
  const { headers, data } = props;

  return <TableContainer component={Paper}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={'header' + header.key}>{header.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {headers.map((header) => (
                  <TableCell key={'cell' + header.key}>{item[header.key] ?? (header.body && header.body(item))}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
};

export default Table;
