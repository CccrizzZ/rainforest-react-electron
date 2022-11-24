// import { useState, forwardRef, useImperativeHandle } from 'react';
// import {
//   Input,
//   Radio,
//   Grid,
//   RadioGroup,
//   Chip,
//   FormControlLabel,
//   Backdrop,
//   Modal,
//   Fade,
//   Typography,
// } from '@mui/material';
// import Plant from '../utilities/Types';
import '../style/PlantUpdationPopup.css';

export interface UpdationPopupProps {
  handleOpen(): void;
}
// fix type
// const PlantUpdationPopup = forwardRef<UpdationPopupProps, {}>((props, ref) => {
//   const [open, setOpen] = useState(false);
//   useImperativeHandle(ref, () => ({
//     handleOpen() {
//       setOpen(true);
//     },
//   }));
//   // const handleClose = () => setOpen(false);

//   return (
//     <div className="PlantUpdationPopup">
//       <h1>Plant</h1>
//       <Grid container spacing={2}>
//         <Grid item xs={4}>
//           Name:
//         </Grid>
//         <Grid item xs={8}>
//           <Input />
//         </Grid>
//         <Grid item xs={4}>
//           Dominant:
//         </Grid>
//         <Grid item xs={8}>
//           <RadioGroup
//             aria-labelledby="demo-radio-buttons-group-label"
//             defaultValue="female"
//             name="radio-buttons-group"
//           >
//             <FormControlLabel
//               value="Indica"
//               control={<Radio />}
//               label="Indica"
//             />
//             <FormControlLabel
//               value="Hybrid"
//               control={<Radio />}
//               label="Hybrid"
//             />
//             <FormControlLabel
//               value="Sativa"
//               control={<Radio />}
//               label="Sativa"
//             />
//           </RadioGroup>
//         </Grid>
//         <Grid item xs={4}>
//           Amount:
//         </Grid>
//         <Grid item xs={8}>
//           <Input />
//         </Grid>
//         <Grid item xs={4}>
//           THC:
//         </Grid>
//         <Grid item xs={8}>
//           <Input />
//         </Grid>
//         <Grid item xs={4}>
//           CBD:
//         </Grid>
//         <Grid item xs={8}>
//           <Input />
//         </Grid>
//         <Grid item xs={4}>
//           Plant Date:
//         </Grid>
//         <Grid item xs={8}>
//           <Input />
//         </Grid>
//         <Grid item xs={4}>
//           Stage:
//         </Grid>
//         <Grid item xs={8}>
//           <RadioGroup>Germ</RadioGroup>
//         </Grid>
//       </Grid>
//       <div className="PopupFooter">
//         <Chip label="Confirm" />
//         <Chip label="Close" variant="outlined" />
//       </div>
//     </div>
//   );
// });

// export default PlantUpdationPopup;
