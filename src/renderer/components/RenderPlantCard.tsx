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
import moment from 'moment';
import { Edit } from '@mui/icons-material';
import { Plant } from '../utilities/Types';
import capitalizeString from '../utilities/StringUtils';
import {
  textColor,
  indicaColor,
  sativaColor,
  hybridColor,
  lightDarkColor,
} from '../style/GlobalStyle';
import '../style/PlantCard.css';

// grow room props to determine which card user clicked
interface GrowRoomProps {
  openEditPlantPopup: (selectedPlant: Plant) => void;
}

// plant card component for a single plant
const RenderPlantCards = (plant: Plant, key: number, props: GrowRoomProps) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, name, dominant, amount, thc, cbd, stage, seedType, plantDate } =
    plant;
  const borderColorNormal = '#000';
  const borderColorHovered = textColor;

  const mouseEnterHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.borderColor = borderColorHovered;
  };

  const mouseExitHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.borderColor = borderColorNormal;
  };

  const mouseDownHandler = () => {
    props.openEditPlantPopup(plant);
  };

  const getDateDifference = () => {
    const diff = Math.abs(moment(plantDate).diff(moment(), 'days'));
    const week = (diff - (diff % 7)) / 7;
    const day = (diff % 7) + 1;
    return `Week ${week + 1} Day ${day}`;
  };

  const getColor = () => {
    switch (dominant) {
      case 'indica':
        return indicaColor;
      case 'sativa':
        return sativaColor;
      case 'hybrid':
        return hybridColor;
      default:
        return '#333';
    }
  };

  const renderDominantChip = (): JSX.Element => {
    const chipStyle = {
      color: 'white',
      backgroundColor: getColor(),
      fontFamily: 'sfPro',
    };

    return <Chip label={capitalizeString(dominant)} style={chipStyle} />;
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

  const ChipStyle = {
    fontSize: '10px',
    color: 'white',
    backgroundColor: lightDarkColor,
    fontFamily: 'sfPro',
  };

  return (
    <div
      className="plantCard"
      key={key}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseExitHandler}
    >
      <div style={{ marginBottom: '20px', padding: '5px', textAlign: 'left' }}>
        <h2 style={{ color: '#fff', marginBottom: '10px', marginLeft: '10px' }}>
          {name}
        </h2>
        <Chip label={_id} size="small" style={ChipStyle} />
        <Chip
          label={getDateDifference()}
          size="medium"
          style={{
            ...ChipStyle,
            color: textColor,
            fontSize: '16px',
            marginTop: '20px',
          }}
        />
      </div>
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
          size="small"
          aria-label="plant-info"
          style={{ backgroundColor: lightDarkColor }}
        >
          <TableBody>
            {renderRow('Dominant: ', renderDominantChip())}
            {renderRow('Amount of plants: ', amount)}
            {renderRow('THC content: ', thc)}
            {renderRow('CBD content: ', cbd)}
            {renderRow('Stage: ', capitalizeString(stage))}
            {renderRow('Seed Type: ', capitalizeString(seedType))}
            {renderRow('Plant Date: ', plantDate)}
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton
        color="success"
        aria-label="add to shopping cart"
        onClick={mouseDownHandler}
        style={{ left: '80%' }}
      >
        <Edit />
      </IconButton>
    </div>
  );
};

export default RenderPlantCards;
