// Question: Comment organiser le point d'entrée de l'application ?
// Réponse: Organisez le point d'entrée de l'application en regroupant les différentes parties du code, en les initialisant et en les démarrant de manière ordonnée et cohérente.
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Réponse: La meilleure façon de gérer le démarrage de l'application est de séparer les différentes étapes de l'initialisation, de gérer les erreurs de manière appropriée et de démarrer le serveur de manière asynchrone.

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
app.use(cors());  // This allows requests from any origin

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux base de donnees
    await db.connectMongo();
    await db.connectRedis();
    // TODO: Configurer les middlewares Express
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // TODO: Monter les routes
    app.use('/api', courseRoutes);

    // TODO: Démarrer le serveur
    app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  try {
    await db.closeMongo();
    await db.closeRedis();
    console.log('Server shutting down...');
  } catch (error) {
    console.error('Failed to shutdown server:', error);
  }
});

startServer();
