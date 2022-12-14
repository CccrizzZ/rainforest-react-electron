import { IconButton, Chip } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Plant } from '../utilities/Types';
import '../style/PlantCard.css';

interface GrowRoomProps {
  openEditPlantPopUp: (selectedPlant: Plant) => void;
}

// plant card component for a single plant
const RenderPlantCards = (plant: Plant, key: number, props: GrowRoomProps) => {
  // const { openEditPlantPopUp } = props;
  const { id, name, dominant, amount, thc, cbd, stage, seedType } = plant;
  const borderColorNormal = '#000';
  const borderColorHovered = '#ff7b00';

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
        chipStyle.backgroundColor = '#9B59B6';
        break;
      case 'sativa':
        chipStyle.backgroundColor = '#E67E22';
        break;
      case 'hybrid':
        chipStyle.backgroundColor = '#27AE60';
        break;
      default:
        break;
    }

    return <Chip label={dominant} style={chipStyle} />;
  };

  return (
    <div
      className="plantCard"
      key={key}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseExitHandler}
    >
      <h2 style={{ padding: '0px', borderColor: borderColorNormal }}>{name}</h2>
      <h4>{id}</h4>
      <div>Dominant: {renderDominantChip()}</div>
      <p>Amount of plants: {amount}</p>
      <p>THC content: {thc}%</p>
      <p>CBD content: {cbd}%</p>
      <p>Stage: {stage}</p>
      <p>Seed Type: {seedType}</p>
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
