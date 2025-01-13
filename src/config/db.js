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
  // Gérer les erreurs et les retries
  const maxRetries = 3;
  let nbRetries = 0;

  while(nbRetries<maxRetries){
    try{
      mongoClient = new MongoClient(config.mongodb.uri);
      await mongoClient.connect();
      db = mongoClient.db(config.mongodb.dbName);
    } catch(e){
      nbRetries++;
      if(nbRetries>=maxRetries) throw new Error('Erreur lors de la connexion à MongoDB après plusieurs tentatives :', e.message);
      await new Promise(res => setTimeout(res, 2000)); // Attendre un peu avant de réessayer
    }
  } 
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  const maxRetries = 3;
  let nbRetries = 0;


  while(nbRetries<maxRetries){
    try{
      redisClient = redis.createClient({
        url: config.redis.uri,
      });

      redisClient = redis.createClient({ url: config.redis.uri });

      redisClient.on('connect', () => {
      });

      redisClient.on('error', (err) => {
        console.error('Error connecting to Redis:', err);
      });

      await redisClient.connect();
    } catch(e){
      nbRetries++;
      if(nbRetries>= maxRetries) throw new Error('Erreur Redis :', e.message);
      await new Promise(res => setTimeout(res, 2000)); // Attendre un peu avant de réessayer
    }
  }
}


function getDb(){
  return db;
}

function getRedisClient(){
  return redisClient;
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  getRedisClient,
  getDb,
};
