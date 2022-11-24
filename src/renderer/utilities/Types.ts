import * as spacetime from 'spacetime';

type Plant = {
  name: string;
  dominant: string | 'sativa' | 'indica' | 'hybrid';
  amount: number;
  thc: number;
  cbd: number;
  plantDate: spacetime.Spacetime | string;
  stage: string | 'germination' | 'vegetation' | 'flowering' | 'harvested';
};

export default Plant;
