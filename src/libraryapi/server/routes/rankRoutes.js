const express = require('express');
const router = express.Router();
const { Loan, Book } = require('../../../models');
const sequelize = require('sequelize');

router.get('/loans', async (req, res) => {
    try{
        const rankedBooks = await Loan.findAll({
            attributes: [
                'book_id',
                [sequelize.fn('COUNT', sequelize.col('book_id')), 'loan_count']
            ],
            group: ['book_id'],
            order: [[sequelize.literal('loan_count'), 'DESC']],
            include: {
                model: Book,
                as: 'book',
                attributes: ['title']
            },
        });

        res.json(rankedBooks);

    } catch(error){
        res.status(500).json({ error: error.message })
    }
})

router.get('/pendents', async (req, res) => {
    try{
        const activeLoans = await Loan.findAll({
            attributes: [
                'user_id',
                [sequelize.fn('COUNT', sequelize.col('id')), 'active_loans']
            ],
            where: { return_date: null },
            group: ['user_id'],
        });

        res.json(activeLoans);

    } catch(error){
        res.status(500).json({ error: error.message })
    }
})

module.exports = router;