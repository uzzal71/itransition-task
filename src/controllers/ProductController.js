import path from 'path';
import csvParser from 'csv-parser';
import fs from 'fs';
import models from '../models'

export const uploadForm = (req, res) => {
    const indexPath = path.join(__dirname, '../../public/index.html');
    res.sendFile(indexPath);
};

export const saveData = async (req, res) => {
    const file = req.body.uploaded_file;

    if (!file || !file.path) {
        return res.status(400).send('No file uploaded.');
    }

    const fileExtension = file.path.split(".")[1];

    if (fileExtension !== 'csv' && fileExtension !== 'xlsx' && fileExtension !== 'xls') {
        return res.status(400).send('Invalid file type. Only CSV and Excel files are allowed.');
    }

    const filePath = file.path;

    // Convert the CSV parsing into a Promise-based function
    const parseCSV = (filePath) => {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    };

    try {
        const parsedData = await parseCSV(filePath);

        for (const data of parsedData) {
            // Check if a product with the same strProductCode exists
            const existingProduct = await models.Product.findOne({
                where: { strProductCode: data['Product Code'] }
            });

            if (existingProduct) {
                // Update existing product
                await existingProduct.update({
                    strProductName: data['Product Name'],
                    strProductDesc: data['Product Description'],
                    dtmAdded: new Date(),
                    dtmDiscontinued: data.Discontinued ? new Date() : null
                });
            } else {
                // Create new product
                await models.Product.create({
                    strProductName: data['Product Name'],
                    strProductDesc: data['Product Description'],
                    strProductCode: data['Product Code'],
                    dtmAdded: new Date(),
                    dtmDiscontinued: data.Discontinued ? new Date() : null
                });
            }
        }

        res.redirect('/products/?message=File uploaded and data parsed successfully.');
    } catch (error) {
        console.error('Error parsing file or saving data:', error);
        res.status(500).send('An error occurred while processing the file.');
    }
};

/*
{
    'Product Code': 'P0028',
    'Product Name': 'Bluray Player',
    'Product Description': "Plays bluray's",
    Stock: '32',
    'Cost in GBP': '1100.04',
    Discontinued: 'yes'
}
*/