const express = require('express');
const { Book } = require('../../models')
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const books = await Book.findAll();

        res.json({ books })

    } catch(error){
        res.status(500).json({ error: error.message });
    }

});

router.get('/:id', async (req, res) => {
    try{
        const book = await Book.findByPk(req.params.id);

        res.json({ book })

    } catch(error){
        res.status(500).json({ error: error.message });
    }

});

router.post('/', async (req, res) => {
    try {
        const existingBook = await Book.findOne({ where: { title: req.body.title } });

        if (existingBook) {
            return res.status(400).json({ message: 'Um livro com este título já existe.' });
        }

        const newBook = await Book.create(req.body);

        return res.status(201).json({ message: 'Livro criado com sucesso.', book: newBook });

    } catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const book = await Book.findByPk(req.params.id);

        if(!book) return res.status(400).json({ message: 'Livro não encontrado.' })

        await book.destroy();
        res.status(200).json({ message: 'Livro excluído com sucesso!'});

    } catch(error){
        res.status(500).json({ error: error.message })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);

        if (!book) return res.status(404).json({ message: 'Livro não encontrado.' });

        await book.update(req.body);

        return res.status(200).json({ message: 'Livro atualizado com sucesso.', book });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
