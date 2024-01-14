import { FlatMeet, Meet } from "@/interfaces/Meet";
import { addDocument, getDocument, updateDocument } from "@/utils/firestore";
import { getUser } from "@/apis/user";

export const getMeet = async (meetId: Meet["id"]): Promise<Meet> => {
  const meet = await getDocument<FlatMeet>("meet", meetId);

  return {
    ...meet,
    attendees: await Promise.all(meet.attendeeIds.map((id) => getUser(id))),
  };
};

export const createMeet = async (
  meet: Omit<Meet, "id" | "attendees">
): Promise<Meet["id"]> => {
  return addDocument<Omit<FlatMeet, "id">>("meet", {
    ...meet,
    attendeeIds: [],
  });
};

export const patchMeet = async (
  meetId: Meet["id"],
  meet: Partial<Omit<FlatMeet, "id">>
): Promise<void> => {
  return updateDocument("meet", meetId, meet);
};
