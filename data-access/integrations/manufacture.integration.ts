import { manufacturingApi } from ".";

export const getAllRequestMan = () => manufacturingApi.get(`/request_man`);
export const getManSkillByPkid = (pkid: number) =>
  manufacturingApi.get("/man_skill/" + pkid);
