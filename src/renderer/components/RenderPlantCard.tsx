/* eslint-disable @typescript-eslint/naming-convention */
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
import { globalColor } from '../style/GlobalStyle';
import '../style/PlantCard.css';

// grow room props to determine which card user clicked
interface GrowRoomProps {
  openEditPlantPopup: (selectedPlant: Plant) => void;
}

// plant card component for a single plant
const RenderPlantCards = (plant: Plant, key: number, props: GrowRoomProps) => {
  const {
    _id,
    name,
    dominant,
    amount,
    thc,
    cbd,
    stage,
    seedType,
    plantDate,
    growingMedia,
  } = plant;
  const borderColorNormal = '#000';
  const borderColorHovered = '#fff';

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
        return globalColor.indicaColor;
      case 'sativa':
        return globalColor.sativaColor;
      case 'hybrid':
        return globalColor.hybridColor;
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
        <TableCell style={{ color: globalColor.textColor, border: '0px' }}>
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
    backgroundColor: globalColor.lightDarkColor,
    fontFamily: 'sfPro',
  };

  const getCardBackground = () => {
    switch (dominant) {
      case 'indica':
        return {
          background:
            'linear-gradient(to top, #7d00af, #9e0096, #b1007f, #bb006b, #be245a)',
        };
      case 'sativa':
        return {
          background:
            'linear-gradient(to bottom, #e56c00, #de5e0a, #d64f12, #cd4017, #c4301b)',
        };
      case 'hybrid':
        return {
          background:
            'linear-gradient(to top, #00b74d, #00a95a, #009b63, #008d67, #007e67)',
        };
      default:
        return { background: '#333' };
    }
  };

  return (
    <div
      className="plantCard"
      key={key}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseExitHandler}
      style={getCardBackground()}
    >
      <div style={{ marginBottom: '20px', padding: '5px', textAlign: 'left' }}>
        <h2
          style={{
            color: '#fff',
            marginBottom: '10px',
            marginLeft: '10px',
          }}
        >
          {name}
        </h2>
        <Chip label={_id} size="small" style={ChipStyle} />
        <Chip
          label={getDateDifference()}
          size="medium"
          style={{
            ...ChipStyle,
            color: globalColor.textColor,
            fontSize: '16px',
            marginTop: '10px',
          }}
        />
      </div>
      <TableContainer
        component={Paper}
        style={{
          color: globalColor.textColor,
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
          style={{ backgroundColor: globalColor.lightDarkColor }}
        >
          <TableBody>
            {renderRow('Dominant: ', renderDominantChip())}
            {renderRow('Number of plants: ', amount)}
            {renderRow('THC content: ', thc)}
            {renderRow('CBD content: ', cbd)}
            {renderRow('Stage: ', capitalizeString(stage))}
            {renderRow('Seed Type: ', capitalizeString(seedType))}
            {renderRow('Plant Date: ', plantDate)}
            {renderRow('Growing Media: ', growingMedia)}
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton
        color="default"
        aria-label="edit"
        onClick={mouseDownHandler}
        style={{ left: '80%' }}
      >
        <Edit style={{ color: 'white' }} />
      </IconButton>
    </div>
  );
};

export default RenderPlantCards;
