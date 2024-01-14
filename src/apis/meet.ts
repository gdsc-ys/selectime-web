import { FlatMeet, Meet } from "@/interfaces/Meet";
import { addDocument, getDocument, updateDocument } from "@/utils/firestore";
import { getUser } from "@/apis/user";

export const getMeet = async (meetId: Meet["id"]): Promise<Meet> => {
  const { attendeeIds, ...meet } = await getDocument<FlatMeet>("meet", meetId);

  return {
    ...meet,
    attendees: await Promise.all(attendeeIds.map((id) => getUser(id))),
  };
};

export const createMeet = async (
  meet: Omit<FlatMeet, "id">
): Promise<Meet["id"]> => {
  return addDocument("meet", meet);
};

export const patchMeet = async (
  meetId: Meet["id"],
  meet: Partial<Omit<FlatMeet, "id">>
): Promise<void> => {
  return updateDocument("meet", meetId, meet);
};
