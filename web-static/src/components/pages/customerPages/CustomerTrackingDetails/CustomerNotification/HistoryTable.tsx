import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F2F5F7',
    color: '#537086',
    width: '215px',
    height: '47px',
    padding: '12px 24px',
    gap: '12px',
    borderTop: '1px solid #D2D3D3',
    borderBottom: '1px solid #F9F9F9',
    textAlign: 'left',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: '47px',
    padding: '12px 24px',
    gap: '12px',
    border: '1px solid #F9F9F9',
    textAlign: 'left',
    color: '#5D5D4C',
  },
  '&:first-child': {
    width: 'auto',
  },
  '&:nth-child(2)': {
    width: '539px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

/**
 * Returns the color associated with the given status.
 *
 * @param {string} status - The status to get the color for.
 * @return {string} The color associated with the given status.
 */
const getStatusColor = (status: string) => {
  switch (status.trim().toLowerCase()) {
    case 'delivered':
      return '#6EA011';
    case 'cancelled':
    case 'canceled': // Add alternative spelling
      return '#EA8389';
    case 'returned':
      return '#FF985D';
    case 'in transit': // Add additional status
      return '#87CEEB'; // Example color for "in transit"
    case 'pending': // Add additional status
      return '#FFA500'; // Example color for "pending"
    default:
      return '#5D5D4C';
  }
};

/**
 * Formats a given datetime string into a JSX element with the date on one line and the time on the next line.
 *
 * @param {string} datetime - The datetime string to format.
 * @return {JSX.Element} The formatted JSX element.
 */
const formatDateTime = (datetime: string) => {
  const [date, time] = datetime.split(' ');
  return (
    <span>
      {date}
      <br />
      <span style={{ color: '#C6C5B9' }}>{time}hrs</span>
    </span>
  );
};

interface CustomizedTablesProps {
  trackingData: any[];
}

/**
 * Renders a table of tracking data with columns for tracking number, date ordered, date delivered, and status.
 *
 * @param {CustomizedTablesProps} props - The props object containing the tracking data.
 * @return {JSX.Element|null} The rendered table of tracking data, or null if the tracking data is not an array.
 */
const CustomizedTables: React.FC<CustomizedTablesProps> = ({
  trackingData = [],
}) => {
  if (!Array.isArray(trackingData)) {
    console.error(
      'Invalid data prop passed to CustomizedTables. Expected an array.'
    );
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, border: '1px solid #D2D3D3' }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow sx={{ fontSize: '18px' }}>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Tracking Number</StyledTableCell>
            <StyledTableCell>Date Ordered</StyledTableCell>
            <StyledTableCell>Date Delivered</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trackingData.map((item: any, index: number) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                #{index + 1}
              </StyledTableCell>
              <StyledTableCell>{item.parcel_number}</StyledTableCell>
              <StyledTableCell>
                {formatDateTime(item.date_of_purchase)}
              </StyledTableCell>
              <StyledTableCell>
                {formatDateTime(item.delivery_date)}
              </StyledTableCell>
              <StyledTableCell style={{ color: getStatusColor(item.status) }}>
                {item.status}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomizedTables;
