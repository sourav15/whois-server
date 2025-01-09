import superagent from "superagent";

export const fetchDomainDetails = async (url: string) => {
  return await superagent
    .get(`${process.env.API_URL}${url}`)
    .set("Authorization", process.env.API_SECRET)
    .set("accept", "json");
};
