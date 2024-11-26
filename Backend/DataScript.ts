import fs from "fs";
import csvParser from "csv-parser";
import mongoose, { Schema, Document, model } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
interface Data extends Document {
    name: string;
    category: string;
    price: number;
    quantity: number;
}

const dataSchema = new Schema<Data>({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const DataModel = model<Data>("sales", dataSchema);

const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL ?? "mongodb";
        if (!mongoUrl) {
            throw new Error("MONGO_URL is not defined in environment variables.");
        }
        await mongoose.connect(mongoUrl); 
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};


const validateRow = (row: any): Partial<Data> | null => {
    const name = row.name?.trim();
    const category = row.category?.trim();
    const price = parseFloat(row.price);
    const quantity = parseInt(row.quantity, 10);

    if (!name || !category || isNaN(price) || isNaN(quantity)) {
        console.error("Invalid row detected:", row);
        return null;
    }

    return { name, category, price, quantity };
};

const migrateData = async (filePath: string) => {
    const results: Partial<Data>[] = [];
    let validRows = 0;

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
            const parsedRow: Partial<Data> = {
                name: row.ProductID || "Unknown Product", 
                category: "Sales Data",
                price: row.TotalAmount ? parseFloat(row.TotalAmount) : 0, 
                quantity: row.Quantity ? parseInt(row.Quantity, 10) : 0, 
            };

            if (
                parsedRow.name ) {
                results.push(parsedRow);
                validRows++;
            } else {
                console.error("Invalid row detected:", row);
            }
        })
        .on("end", async () => {
            console.log(`Parsed ${results.length + validRows} rows. Valid rows: ${validRows}`);
            if (results.length > 0) {
                try {
                    await DataModel.insertMany(results);
                    console.log("Data migration completed successfully.");
                } catch (error) {
                    console.error("Error inserting data into MongoDB:", error);
                }
            } else {
                console.warn("No valid data to migrate.");
            }
            mongoose.connection.close();
        });
};




const main = async () => {
    await connectDB();
    const filePath = `./data/${process.env.FILE_TO_MIGRATE}`;
    await migrateData(filePath);
};

main().catch((error) => {
    console.error("Migration script failed:", error);
});
