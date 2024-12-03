const express = require('express');
const router = express.Router();
const { Loan, User, Book } = require('../../models');

router.post('/', async (req, res) => {
    const { user_id, book_id, loan_date, due_date } = req.body;

    try {
        const activeLoans = await Loan.count({
            where: { user_id, return_date: null }
        });

        if (activeLoans >= 3) return res.status(400).json({ message: 'Usuário já possui 3 empréstimos ativos.' });


        const newLoan = await Loan.create({
            user_id,
            book_id,
            loan_date,
            due_date,
            return_date: null,
            status: 'active',
        });

        return res.status(201).json({ message: 'Empréstimo registrado com sucesso.', loan: newLoan });

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const loan = await Loan.findByPk(id);

        if (!loan) return res.status(404).json({ message: 'Empréstimo não encontrado.' });

        if (loan.return_date) return res.status(400).json({ message: 'Este empréstimo já foi devolvido.' });

        loan.return_date = new Date();
        loan.status = 'returned';

        await loan.save();

        return res.status(200).json({ message: 'Devolução registrada com sucesso.', loan });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const loans = await Loan.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                },
                {
                    model: Book,
                    as: 'book',
                },
            ],
        });

        return res.status(200).json(loans);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});




module.exports = router;