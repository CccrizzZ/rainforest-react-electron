import { Schema, model, connect } from 'mongoose';
import Plant from './Types';

// 2. Create a Schema corresponding to the document interface.
const plantSchema = new Schema<Plant>({
  name: { type: String, required: true },
  dominant: { type: String, required: true },
  amount: { type: Number, required: true },
  thc: { type: Number, required: true },
  cbd: { type: Number, required: true },
  plantDate: { type: Number, required: true },
  stage: { type: String, required: true },
});

// 3. Create a Model.
const NewGrowRoomPlant = model<Plant>('NewGrowRoomPlant', plantSchema);

class MongoDBConnector {
  constructor() {
    console.log('MongoDBConnector constructed');
  }

  public connectDB = (url: string | undefined): void => {
    if (url !== undefined) {
      connect(url);
    }
  };

  writePlantsToDB = async (newPlant: Plant): Promise<void> => {
    // const plant = new NewPlant({
    //   name: newPlant.name,
    //   dominant: newPlant.dominant,
    //   amount: newPlant.amount,
    //   thc: newPlant.thc,
    //   cbd: newPlant.cbd,
    //   plantDate: newPlant.plantDate,
    //   stage: newPlant.stage,
    // });
    const plant = new NewGrowRoomPlant(newPlant);
    await plant.save();
  };

  readPlantsFromDB = (): void => {
    console.log('read plant from db');
  };
}

export default MongoDBConnector;
