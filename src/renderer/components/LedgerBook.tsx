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
  Chip,
  Fade,
} from '@mui/material';
import { Item } from '../utilities/Types';
import '../style/LedgerBook.css';

const purchase: Array<Item> = [
  {
    name: 'nug',
    cost: 3000,
    quantity: 2,
  },
  {
    name: 'cone',
    cost: 250,
    quantity: 10,
  },
];

const sales: Array<Item> = [
  {
    name: 'buds',
    cost: 2,
    quantity: 2000,
  },
  {
    name: 'vapes',
    cost: 15,
    quantity: 100,
  },
];

const LedgerBook = () => {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [purchaseArr, setPurchaseArr] = useState([] as Array<Item>);
  const [salesArr, setSalesArr] = useState([] as Array<Item>);

  useEffect(() => {
    setPurchaseArr(purchase);
    setSalesArr(sales);
  }, []);

  const addSalesItem = () => {
    console.log('add sales');
  };

  const addPurchaseItem = () => {
    console.log('add purchase');
  };

  const getTotalCost = (itemArray: Array<Item>): number => {
    if (itemArray.length <= 0) {
      alert('Item list empty');
    }
    let total = 0;
    itemArray.forEach((item) => {
      total += item.cost * item.quantity;
    });
    return total;
  };

  const renderRow = (itemArray: Array<Item>) => {
    return itemArray.map((item: Item) => {
      return (
        <TableRow key={itemArray.indexOf(item)}>
          <TableCell>{item.name}</TableCell>
          <TableCell align="right">{item.cost}</TableCell>
          <TableCell align="right">{item.quantity}</TableCell>
          <TableCell align="right">{item.cost * item.quantity}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Fade in>
      <div className="ledgerBook componentWindow unselectable">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h2 className="purchase">💸 Purchase</h2>
            <Chip
              style={{ backgroundColor: '#fa9078', color: '#fff' }}
              label="Add Item"
              onClick={addPurchaseItem}
            />
          </Grid>
          <Grid item xs={6}>
            <h2 className="sales">💵 Sales</h2>
            <Chip
              style={{ backgroundColor: '#40d397', color: '#fff' }}
              label="Add Item"
              onClick={addSalesItem}
            />
          </Grid>
          <Grid item xs={6}>
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
                <TableBody>{renderRow(purchase)}</TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
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
                <TableBody>{renderRow(sales)}</TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            <h2 className="purchase">
              Purchase Total: ${getTotalCost(purchase)}
            </h2>
          </Grid>
          <Grid item xs={6}>
            <h2 className="sales">Sales Total: ${getTotalCost(sales)}</h2>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default LedgerBook;
