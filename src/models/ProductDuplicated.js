// Import necessary modules
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

// Define the Product Duplicated model
const ProductDuplicated = sequelize.define('ProductDuplicated', {
    intProductDataId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    strProductCode: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    strProductName: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    strProductDesc: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Stock: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    Price: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    dtmAdded: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    dtmDiscontinued: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    stmTimestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
}, {
    tableName: 'tblProductDataDuplicated',
    timestamps: true,
});

export default ProductDuplicated;
