import { Meet } from "@/interfaces/Meet";
import { addDocument, getDocument, updateDocument } from "@/utils/firestore";

export const getMeet = async (meetId: Meet["id"]): Promise<Meet> => {
  return getDocument("meet", meetId);
};

export const createMeet = async (
  meet: Omit<Meet, "id">
): Promise<Meet["id"]> => {
  return addDocument("meet", meet);
};

export const patchMeet = async (
  meetId: Meet["id"],
  meet: Partial<Omit<Meet, "id">>
): Promise<void> => {
  return updateDocument("meet", meetId, meet);
};
