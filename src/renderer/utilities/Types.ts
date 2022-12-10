import * as spacetime from 'spacetime';

interface Plant {
  name: string;
  dominant: string;
  amount: number;
  thc: number;
  cbd: number;
  plantDate: spacetime.Spacetime | string;
  stage: string;
}

type Item = {
  name: string;
  cost: number;
  quantity: number;
};

export { Plant, Item };
