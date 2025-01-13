// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Un contrôleur est responsable de la logique métier de l'application, tandis qu'une route est responsable de l'acheminement des requêtes HTTP vers les contrôleurs appropriés.

// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Séparer la logique métier des routes permet de rendre le code plus modulaire, plus facile à maintenir et à tester, et de faciliter la réutilisation de la logique métier dans différentes parties de l'application.

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const course = req.body;
    const result = await mongoService.insertOne('course', course);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
}

async function getCourse(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }
    let course = await redisService.getCachedData(id);

    if (!course) {
      course = await mongoService.findOneById('course', id);

      if (course) {
        await redisService.cacheData(id, course, 3600);
      }
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
}

// get course stats like number of courses, average rating, etc.
async function getCourseStats(req, res) {
  try {
    const dbInstance = db.getdb();
    const collection = dbInstance.collection('course');

    // Get collection stats
    const stats = await dbInstance.command({ collStats: 'course' });
    
    // const count = stats.count;
    // const size = stats.size;
    //   const avgObjSize = stats.avgObjSize;

    res.status(200).json({
      stats

    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course stats' });
  }
}
// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getCourseStats
};
