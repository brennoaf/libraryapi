const express = require('express');
const { User } = require('../../../models');
const router = express.Router();

router.get('/', async (req, res) =>{
    try{
        const users = await User.findAll();
        console.log(`Rota: /`);

        res.json(users);

    } catch (error){
        res.status(500).json({
            error: error.message
        });
    }
});

router.post('/', async (req, res) =>{
    try{
        const newUser = await User.create(req.body);

        res.status(201).json({
            newUser
        });

    } catch(error){
        res.status(400).json({
            erro: error.message
        });
    }
});

router.get('/:id', async (req, res) =>{
    try{
        const user = await User.findByPk(req.params.id);
        console.log(`Rota: /${req.params.id}`);

        if(!user) return res.status(400).json({ message: 'Usuário não encontrado.' });

        res.json(user);

    } catch(error){
        res.status(500).json({
            error: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        console.log('apagando...');

        if(!user) res.status(400).json({ message: 'Usuário não encontrado.' });

        await user.destroy();

        return res.status(200).json({ message: 'Usuário excluído com sucesso.' });

    } catch(error){
        res.status(500).json({
            error: error.message
        });

    }
});

router.put('/:id', async (req, res) => {
    try {

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        await user.update(req.body);

        return res.status(200).json({ message: 'Usuário atualizado com sucesso.', user });

    } catch (error) {

        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;