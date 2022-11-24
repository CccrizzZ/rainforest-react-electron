import { Button } from '@mui/material';
import Plant from '../utilities/Types';
import PlantUpdationPopup from './PlantUpdationPopup';
import '../style/PlantCard.css';

// plant card component for a single plant
const RenderPlantCards = (plant: Plant, key: number) => {
  const borderColorNormal = '#000';
  const borderColorHovered = '#ff7b00';
  const { name, dominant, amount, thc, cbd, stage } = plant;

  const mouseEnterHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.borderColor = borderColorHovered;
  };

  const mouseExitHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.borderColor = borderColorNormal;
  };

  return (
    <div
      className="plantCard"
      key={key}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseExitHandler}
    >
      <h2 style={{ padding: '0px', borderColor: borderColorNormal }}>{name}</h2>
      <p>Dominant: {dominant}</p>
      <p>Amount of plants: {amount}</p>
      <p>THC content: {thc}%</p>
      <p>CBD content: {cbd}%</p>
      <p>Stage: {stage}</p>
    </div>
  );
};

export default RenderPlantCards;
