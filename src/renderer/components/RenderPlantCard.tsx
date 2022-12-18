import {
  IconButton,
  Chip,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  TableBody,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Plant } from '../utilities/Types';
import {
  textColor,
  indicaColor,
  sativaColor,
  hybridColor,
  lightDarkColor,
} from '../style/GlobalStyle';
import '../style/PlantCard.css';

interface GrowRoomProps {
  openEditPlantPopUp: (selectedPlant: Plant) => void;
}

// plant card component for a single plant
const RenderPlantCards = (plant: Plant, key: number, props: GrowRoomProps) => {
  // const { openEditPlantPopUp } = props;
  const { id, name, dominant, amount, thc, cbd, stage, seedType } = plant;
  const borderColorNormal = '#000';
  const borderColorHovered = textColor;

  const mouseEnterHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.borderColor = borderColorHovered;
  };

  const mouseExitHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.borderColor = borderColorNormal;
  };

  const mouseDownHandler = () => {
    props.openEditPlantPopUp(plant);
  };

  const getColor = () => {
    switch (dominant) {
      case 'indica':
        return '#9a3981';
      case 'sativa':
        return '#ba4c33';
      case 'hybrid':
        return '#60ab2b';
      default:
        return '#fff';
    }
  };

  const renderDominantChip = (): JSX.Element => {
    const chipStyle = {
      color: 'white',
      backgroundColor: getColor(),
    };

    switch (dominant) {
      case 'indica':
        chipStyle.backgroundColor = indicaColor;
        break;
      case 'sativa':
        chipStyle.backgroundColor = sativaColor;
        break;
      case 'hybrid':
        chipStyle.backgroundColor = hybridColor;
        break;
      default:
        break;
    }

    return <Chip label={dominant} style={chipStyle} />;
  };

  const renderRow = (
    rowKey: string,
    rowValue: number | string | JSX.Element
  ): JSX.Element => {
    return (
      <TableRow>
        <TableCell style={{ color: textColor, border: '0px' }}>
          {rowKey}
        </TableCell>
        <TableCell style={{ color: '#fff', border: '0px' }}>
          {rowValue}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div
      className="plantCard"
      key={key}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseExitHandler}
    >
      <h2 style={{ marginLeft: '20px', color: '#fff' }}>{name}</h2>
      <h4>{id}</h4>
      <TableContainer
        component={Paper}
        style={{
          color: textColor,
          borderRadius: '1em',
          backgroundColor: 'transparent',
        }}
      >
        <Table
          sx={{
            minWidth: 0,
            '& .MuiTableCell-root': {
              fontFamily: 'sfPro',
            },
          }}
          size="medium"
          aria-label="plant-info"
          style={{ backgroundColor: lightDarkColor }}
        >
          <TableBody>
            {renderRow('Dominant: ', renderDominantChip())}
            {renderRow('Amount of plants: ', amount)}
            {renderRow('THC content: ', thc)}
            {renderRow('CBD content: ', cbd)}
            {renderRow('Stage: ', stage)}
            {renderRow('Seed Type: ', seedType)}
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton
        color="success"
        aria-label="add to shopping cart"
        onClick={mouseDownHandler}
      >
        <Edit />
      </IconButton>
    </div>
  );
};

export default RenderPlantCards;
