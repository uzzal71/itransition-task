import models from '../models';


export const dashboard = async (req, res) => {
    try {
        const total_success_product = await models.Product.count();
        const total_failed_product = await models.ProductFailed.count();
        const total_duplicated_product = await models.ProductDuplicated.count();
        const data = {total_success_product, total_failed_product, total_duplicated_product}

        res.render('dashboard', { data: data, title: 'Dashboard', layout: './layouts/sidebar' })
    } catch (error) {
        console.error('Error fetching products:', error);
        req.flash('info', 'An error occurred while fetching the product list.');
        res.redirect('/');
    }
};
