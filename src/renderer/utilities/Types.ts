import * as spacetime from 'spacetime';

// grow room plant data
interface Plant {
  id: string;
  name: string;
  dominant: string;
  amount: number;
  thc: number;
  cbd: number;
  plantDate: spacetime.Spacetime | string;
  stage: string;
  seedType: string;
}

// financial ledger item
type Item = {
  name: string;
  cost: number;
  quantity: number;
};

export { Plant, Item };
