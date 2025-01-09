import redisClient from "../connections/redisClient";
import * as services from "../services/lookupService";

export const getDetails = async (url: string) => {
  const cacheData = await redisClient.get(url);
  if (cacheData) {
    return JSON.parse(cacheData);
  }
  const details = await services.fetchDomainDetails(url);

  if (details.body) {
    redisClient.set(url, JSON.stringify(details.body), { EX: 300 });
    return details.body;
  }
  return;
};
