// Question: Pourquoi créer des services séparés ?
// Réponse: Créer des services séparés offre une clarté en organisant le code par responsabilité, facilite la réutilisation des fonctionnalités dans différentes parties du projet,
// et assure une modularité en isolant les composants pour simplifier leur gestion

const { ObjectId } = require('mongodb');
const mongodb = require('../config/db');
// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  await mongodb.connectMongo();
  const instance = mongodb.getdb();
  const collectionName = instance.collection(collection);
  return await collectionName.findOne({ _id: new ObjectId(id) });
}
async function insertOne(collectionName, document) {
  const dbInstance = mongodb.getdb();
  console.log("ana hna");
  const collection = dbInstance.collection(collectionName);
  return await collection.insertOne(document);
}





// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  insertOne
};
