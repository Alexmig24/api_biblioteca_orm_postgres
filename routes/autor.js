const express = require('express');
const router = express.Router();
const Autor = require('../models/autor');

router.get('/', async (req, res) => {
    try {
        const autores = await Autor.findAll();
        res.json(autores);
    } catch (error) {
        console.error('Error al obtener los autores:', error);
        res.status(500).json({ error: 'Error al obtener los autores' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const autor = await Autor.findByPk(id);
        if (!autor) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        res.json(autor);
    } catch (error) {
        console.error('Error al obtener los autores:', error);
        res.status(500).json({ error: 'Error al obtener los autores' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre, nacionalidad } = req.body;
        const autor = await Autor.create({nombre, nacionalidad});
        res.status(201).json(autor);
    } catch (error) {
        console.error('Error al crear el autor:', error);
        res.status(500).json({ error: 'Error al crear el autor' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;   
        const { nombre, nacionalidad } = req.body;

        const autor = await Autor.findByPk(id);
        if (!autor) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }

        await Autor.update({ nombre, nacionalidad }, { where: { id } });
        const autorActualizado = await Autor.findByPk(id);
        res.status(200).json(autorActualizado);
    } catch (error) {
        console.error('Error al actualizar el autor:', error);
        res.status(500).json({ error: 'Error al actualizar el autor' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const autor = await Autor.findByPk(id);
        if (!autor) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        await Autor.destroy({ where: { id } });
        res.status(200).json({ message: 'Autor eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el autor:', error);
        res.status(500).json({ error: 'Error al eliminar el autor' });
    }
});

module.exports = router;