const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');
const Autor = require('../models/autor');
const Genero = require('../models/genero');
const { where } = require('sequelize');

router.get("/autor/:id_autor", async (req, res) => {
    try {
        const { id_autor } = req.params;
        const libros = await Libro.findAll({
            where: { id_autor }
        });
        if (libros.length == 0) {
            return res.status(404).json({ error: 'No se encontraron libros para el autor especificado' });
        }
        res.json(libros);
    } catch (error) {
        console.log('Error al obtener los libros por autor:', error);
        res.status(500).json({ error: 'Error al obtener los libros por autor' });
    }
});

router.get("/genero/id_genero", async (req, res) => {
    try {
        const { id_genero } = req.params;
        const generos = await Genero.findAll({
            where: { id_genero }
        });
        if (generos.length == 0) {
            return res.status(404).json({ error: 'No se encontraron libros para el genero especificado' });
        }
        res.json(generos);
    } catch (error) {
        console.log('Error al obtener los libros por genero:', error);
        res.status(500).json({ error: 'Error al obtener los libros por genero' });
    }
});

router.get('/', async (req, res) => {
    try {
        const libros = await Libro.findAll({
            include: [
                {
                    model: Autor,
                    as: 'autor',
                    attributes: ['id', 'nombre', 'nacionalidad'],
                },
                {
                    model: Genero,
                    as: 'genero',
                    attributes: ['id', 'nombre', 'descripcion'],
                }
            ]
        });
        res.json(libros);
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        res.status(500).json({ error: 'Error al obtener los libros' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await Libro.findOne({
            where: { id },
            include: [
                {
                    model: Autor,
                    as: 'autor',
                    attributes: ['id', 'nombre', 'nacionalidad'],
                },
                {
                    model: Genero,
                    as: 'genero',
                    attributes: ['id', 'nombre', 'descripcion'],
                }
            ]
        });
        if (!libro) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        res.json(libro);
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        res.status(500).json({ error: 'Error al obtener los libros' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { titulo, editorial, id_autor, id_genero } = req.body;
        const autor = await Autor.findByPk(id_autor);
        if (!autor) {
            return res.status(404).json({ error: 'Autor no existe' });
        }
        const genero = await Genero.findByPk(id_genero);
        if (!genero) {
            return res.status(404).json({ error: 'Genero no existe' });
        }
        const libro = await Libro.create({titulo, editorial, id_autor, id_genero});
        res.status(201).json(libro);
    } catch (error) {
        console.error('Error al crear el libro:', error);
        res.status(500).json({ error: 'Error al crear el libro' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;   
        const { titulo, editorial, id_autor, id_genero } = req.body;
        
        const libro = await Libro.findByPk(id);
        if (!libro) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        const autor = await Autor.findByPk(id_autor);
        if (!autor) {
            return res.status(404).json({ error: 'Autor no existe' });
        }
        const genero = await Genero.findByPk(id_genero);
        if (!genero) {
            return res.status(404).json({ error: 'Genero no existe' });
        }
        
        await Libro.update({titulo, editorial, id_autor, id_genero}, { where: { id } });
        const libroActualizado  = await Libro.findByPk(id);
        res.status(200).json(libroActualizado );
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await Libro.findByPk(id);
        if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
        await Libro.destroy({ where: { id } });
        res.status(200).json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        res.status(500).json({ error: 'Error al eliminar el libro' });
    }
});

module.exports = router;