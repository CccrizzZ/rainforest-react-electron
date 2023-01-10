// grow room plant data
interface Plant {
  _id: string;
  name: string;
  dominant: string;
  seedType: string;
  amount: number;
  thc: number;
  cbd: number;
  plantDate: string; // MM/DD/YYYY
  stage: string;
}

// financial ledger item
interface Item {
  name: string;
  cost: number;
  quantity: number;
}

export { Plant, Item };
