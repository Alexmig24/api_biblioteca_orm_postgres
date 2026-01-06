const express = require('express');
const router = express.Router();
const Genero = require('../models/genero');

router.get('/', async (req, res) => {
    try {
        const generos = await Genero.findAll();
        res.json(generos);
    } catch (error) {
        console.error('Error al obtener los generos:', error);
        res.status(500).json({ error: 'Error al obtener los generos' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findByPk(id);
        if (!genero) {
            return res.status(404).json({ error: 'Genero no encontrado' });
        }
        res.json(genero);
    } catch (error) {
        console.error('Error al obtener los generos:', error);
        res.status(500).json({ error: 'Error al obtener los generos' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const genero = await Genero.create({nombre, descripcion});
        res.status(201).json(genero);
    } catch (error) {
        console.error('Error al crear el genero:', error);
        res.status(500).json({ error: 'Error al crear el genero' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;   
        const genero = await Genero.findByPk(id);
        const { nombre, descripcion } = req.body;
        if (!genero) return res.status(404).json({ error: 'Genero no encontrado' });

        await Genero.update({nombre, descripcion}, { where: { id } });
        const updated = await Genero.findByPk(id);
        res.status(200).json(updated);
    } catch (error) {
        console.error('Error al actualizar el genero:', error);
        res.status(500).json({ error: 'Error al actualizar el genero' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findByPk(id);
        if (!genero) return res.status(404).json({ error: 'Genero no encontrado' });

        await Genero.destroy({ where: { id } });
        res.status(200).json({ message: 'Genero eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el genero:', error);
        res.status(500).json({ error: 'Error al eliminar el genero' });
    }
});

module.exports = router;