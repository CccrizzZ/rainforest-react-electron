import { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  TableHead,
  Grid,
} from '@mui/material';
import '../style/LedgerBook.css';

const bucketList: Array<Item> = [
  {
    name: 'nug',
    itemCost: 3000,
    quantity: 2,
  },
  {
    name: 'cone',
    itemCost: 250,
    quantity: 10,
  },
];

type Item = {
  name: string;
  itemCost: number;
  quantity: number;
};

const renderPurchases = () => {
  return bucketList.map((item: Item) => {
    return (
      <TableRow key={bucketList.indexOf(item)}>
        <TableCell>{item.name}</TableCell>
        <TableCell align="right">{item.itemCost}</TableCell>
        <TableCell align="right">{item.quantity}</TableCell>
        <TableCell align="right">{item.itemCost * item.quantity}</TableCell>
      </TableRow>
    );
  });
};

const LedgerBook = () => {
  const [showAddPopup, setShowAddPopup] = useState(false);
  // const [jsonDB, setJsonDB] = useState({} as TypedJsonDB<JsonDBSchema>);

  useEffect(() => {
    // async function connectToDB() {
    // }
    // connectToDB();
    // setJsonDB(new TypedJsonDB<JsonDBSchema>('config.json'));
    // const result = jsonDB.get('/login');
    // console.log(result);
  }, []);

  return (
    <div className="LedgerBook">
      <Grid container spacing={2}>
        <Grid item xs={8} className="Purchase">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="purchase">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Unit Cost</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderPurchases()}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={4}>
          <h1>xs=4</h1>
        </Grid>
        <Grid item xs={8} className="Sales">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="sales">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderPurchases()}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={4}>
          <h1>xs=4</h1>
        </Grid>
      </Grid>
    </div>
  );
};

export default LedgerBook;
