// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Centralisation et réutilisation : Code de connexion regroupé en un seul endroit, facilitant la maintenance et la réutilisation.
//Abstraction : Isolation du reste de l'application des détails spécifiques de la base de données, permettant un changement de SGBD plus aisé

// Question : Comment gérer proprement la fermeture des connexions ?

// Réponse :
// Utilisation  des fonctions close() ou équivalentes après utilisation.
// Pools de connexions : Gérer correctement la fermeture du pool en fin d'exécution.
// utilisation de try...finally afin de garantir la fermeture même en cas d'erreur.


const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB

  mongoClient = new MongoClient(config.mongodb.uri);
  try {
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("not connected from bd.js");
  }
  // Gérer les erreurs et les retries     

}


async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  const redisClient = redis.createClient();
  try {
    await redisClient.connect({
      host: config.redis, port: config.port
    });
    console.log("data base connected");
  } catch (error) {
    console.log("data base not connected");
  }
  return redisClient;
}
function getdb() {
  if ((!db)) {
    throw new Error("mongodb not found not connected")
  } else {
    return db;
  }
}
// close connections
async function closeMongo() {
  await mongoClient.close();
  console.log("MongoDB connection closed");
}
async function closeRedis() {
  await redisClient.quit();
  console.log("Redis connection closed");
}

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  getdb,
  closeMongo,
  closeRedis,


  // TODO: Exporter les clients et fonctions utiles
};
