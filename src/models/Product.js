// Import necessary modules
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

// Define the Product model
const Product = sequelize.define('Product', {
    intProductDataId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    strProductName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    strProductDesc: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    strProductCode: {
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false,
    },
    dtmAdded: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    dtmDiscontinued: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    stmTimestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
}, {
    tableName: 'tblProductData', // Specify the table name
    timestamps: true, // Enable timestamps
});

export default Product;
