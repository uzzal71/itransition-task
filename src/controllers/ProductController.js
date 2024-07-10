import csvParser from 'csv-parser';
import fs from 'fs';
import models from '../models';

export const newProductCreate = (req, res) => {
    res.render('product_create_form', { messages: req.flash('info'), title: "Add Product", layout: './layouts/sidebar'  });
};

export const newProductDataSave = async (req, res) => {
    const { productName, productDesc, productCode, productStock, productPrice } = req.body;
    const stock = parseInt(productStock, 10);
    const price = parseFloat(productPrice);
    if (stock === 0 || price === 0) {
        req.flash('info', 'Product stock or price will not be zero.');
        return res.redirect('/products/create');
    }

    // Rule-based validation
    if ((price < 5 && stock < 10) || price > 1000) {
        req.flash('info', 'Product does not meet the import criteria.');
        return res.redirect('/products/add');
    }

    try {
        const existingProduct = await models.Product.findOne({
            where: { strProductCode: productCode }
        });

        if (existingProduct) {
            req.flash('info', 'Product already exists.');
        } else {
            await models.Product.create({
                strProductName: productName,
                strProductDesc: productDesc,
                strProductCode: productCode,
                dtmAdded: new Date(),
                dtmDiscontinued: new Date(),
                Stock: stock,
                Price: price
            });
            req.flash('info', 'Product added successfully.');
        }
    } catch (error) {
        console.log(error)
        req.flash('info', 'An error occurred while processing the product.');
    }

    res.redirect('/products/add');
};

export const importProduct = (req, res) => {
    res.render('import_product', { messages: req.flash('info'), title: "Import Product", layout: './layouts/sidebar'  });
};

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

const validateData = (data) => {
    const stock = parseInt(data['Stock'], 10);
    const price = parseFloat(data['Cost in GBP']);
    if (price < 5 || stock < 10 || price > 1000 || stock === 0 || price === 0 || isNaN(stock) || isNaN(price)) {
        return false;
    }
    return { stock, price };
};

const handleProductUpdate = async (data, stock, price) => {
    const existingProduct = await models.Product.findOne({
        where: { strProductCode: data['Product Code'] }
    });

    if (existingProduct) {
        await existingProduct.update({
            strProductName: data['Product Name'],
            strProductDesc: data['Product Description'],
            dtmAdded: new Date(),
            dtmDiscontinued: new Date(),
            Stock: stock,
            Price: price
        });
        return 'updated';
    } else {
        await models.Product.create({
            strProductName: data['Product Name'],
            strProductDesc: data['Product Description'],
            strProductCode: data['Product Code'],
            dtmAdded: new Date(),
            dtmDiscontinued: new Date(),
            Stock: stock,
            Price: price
        });
        return 'created';
    }
};

export const processData = async (req, res) => {
    const file = req.body.uploaded_file;

    if (!file || !file.path) {
        req.flash('info', 'No file uploaded.');
        return res.redirect('/products/import');
    }

    const fileExtension = file.path.split(".").pop();

    if (!['csv', 'xlsx', 'xls'].includes(fileExtension)) {
        req.flash('info', 'Invalid file type. Only CSV and Excel files are allowed.');
        return res.redirect('/products/import');
    }

    const filePath = file.path;
    try {
        const parsedData = await parseCSV(filePath);
        let processed = 0;
        let successful = 0;
        let updated = 0;
        let skipped = 0;
        let failed = 0;
        let duplicated = 0;

        await models.ProductFailed.truncate();
        await models.ProductDuplicated.truncate();

        for (const data of parsedData) {
            processed++;
            const validationResult = validateData(data);

            if (!validationResult) {
                skipped++;
            
                const existingFailedProduct = await models.ProductFailed.findOne({
                    where: { strProductCode: data['Product Code'] }
                });
        
            
                if (!existingFailedProduct) {
                    await models.ProductFailed.create({
                        strProductCode: data['Product Code'],
                        strProductName: data['Product Name'],
                        strProductDesc: data['Product Description'],
                        Stock: data['Stock'],
                        Price: data['Cost in GBP'],
                    });
                } else {
                    duplicated++;
                        await models.ProductDuplicated.create({
                            strProductCode: data['Product Code'],
                            strProductName: data['Product Name'],
                            strProductDesc: data['Product Description'],
                            Stock: data['Stock'],
                            Price: data['Cost in GBP'],
                        });
                }
            
                continue;
            }

            try {
                const result = await handleProductUpdate(data, validationResult.stock, validationResult.price);
                if (result === 'updated') {
                    updated++;
                } else {
                    successful++;
                }
            } catch (insertError) {
                failed++;
                console.error(`Failed to process product with code ${data['Product Code']}:`, insertError);
            }
        }

        req.flash('info', `Processed: ${processed}`);
        req.flash('info', `Successful: ${successful}`);
        req.flash('info', `Updated: ${updated}`);
        req.flash('info', `Skipped: ${skipped}`);
        req.flash('info', `Failed: ${failed}`);
        req.flash('info', `Duplicated: ${duplicated}`);
        res.redirect('/products/import');
    } catch (error) {
        req.flash('info', 'An error occurred while processing the file.');
        res.redirect('/products/import');
    }
};

export const productSuccessList = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; 
    const offset = (page - 1) * limit;

    let products = [];
    let totalProducts = 0;
    
    try {
        const { count, rows } = await models.Product.findAndCountAll({
            offset: offset,
            limit: limit,
        });
        products = rows;
        totalProducts = count;
    } catch (error) {
        req.flash('info', 'An error occurred while fetching the product list.');
    }

    const totalPages = Math.ceil(totalProducts / limit);

    res.render('product_success_list', { 
        messages: req.flash('info'), 
        products: products, 
        totalProducts: totalProducts,
        currentPage: page, 
        totalPages: totalPages,
        title: "Product Failed List", 
        layout: './layouts/sidebar' 
    });
};

export const productFailedList = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; 
    const offset = (page - 1) * limit;

    let products = [];
    let totalProducts = 0;
    
    try {
        const { count, rows } = await models.ProductFailed.findAndCountAll({
            offset: offset,
            limit: limit,
        });
        products = rows;
        totalProducts = count;
    } catch (error) {
        req.flash('info', 'An error occurred while fetching the product list.');
    }

    const totalPages = Math.ceil(totalProducts / limit);

    res.render('product_failed_list', { 
        messages: req.flash('info'), 
        products: products, 
        totalProducts: totalProducts,
        currentPage: page, 
        totalPages: totalPages,
        title: "Product Failed List", 
        layout: './layouts/sidebar' 
    });
};


export const productDuplicatedList = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; 
    const offset = (page - 1) * limit;

    let products = [];
    let totalProducts = 0;
    
    try {
        const { count, rows } = await models.ProductDuplicated.findAndCountAll({
            offset: offset,
            limit: limit,
        });
        products = rows;
        totalProducts = count;
    } catch (error) {
        req.flash('info', 'An error occurred while fetching the product list.');
    }

    const totalPages = Math.ceil(totalProducts / limit);

    res.render('product_duplicated_list', { 
        messages: req.flash('info'), 
        products: products,
        totalProducts: totalProducts,
        currentPage: page, 
        totalPages: totalPages,
        title: "Product Failed List", 
        layout: './layouts/sidebar' 
    });
};