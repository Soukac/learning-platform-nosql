// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : les variable d'environnement contient toujours des variables et des donnes sensible et crucial (comme les URL, les Service externe comme AIP_key) et 
// si ces variablles sont pas bien valide l'app risque de ne pas fonctionner.  

// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : l'application va pas fonctionner des fois et lancer des erreur, ou des comportement innattendu , ainsi pafois des resultas errone 

const dotenv = require('dotenv');

const path = require('path');

// Fix the path to .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation
  // Si une variable manque, lever une erreur explicative
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      console.log(`Checking environment variable: ${varName}`);
      console.log(`Value: ${process.env[varName] || 'Not set'}`);
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  });

}

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};
