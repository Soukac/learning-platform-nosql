// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :Définissez des stratégies pour invalider le cache lorsque les données sous-jacentes changent.
//Pour des données volumineuses, envisagez de compresser les données avant de les stocker.
//Mettez en cache uniquement les données qui sont fréquemment accédées ou coûteuses à calculer.

// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :Utilisez des noms de clés lisibles et descriptifs, comme user:123:profile.
// Conventions de Nom: Séparez les parties de la clé par des délimiteurs comme :.
// Longueur de la Clé: Gardez les clés courtes pour économiser de la mémoire.
// Espaces de Nom: Utilisez des préfixes pour organiser les clés, par exemple, app1: ou cache: pour éviter les conflits.
const redisdb = require('../config/db');
// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
  // TODO: Implémenter une fonction générique de cache
  const redisClient = await redisdb.connectRedis();
  try {
    await redisClient.set(key, JSON.stringify(data), { EX: ttl });

  } catch (error) {
    console.error("Error caching data:", error);
  }
}

async function getCachedData(key) {
  // get cash data implemenatation
  const redisClient = await redisdb.connectRedis();
  try {
    const data = await redisClient.get(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error("Error getting cached data:", error);
    return null;
  }

}

module.exports = {
  // TODO: Exporter les fonctions utilitaires
  cacheData,
  getCachedData
};
