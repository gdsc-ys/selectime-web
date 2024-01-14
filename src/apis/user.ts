import { User } from "@/interfaces/User";
import { addDocument, getDocument, updateDocument } from "@/utils/firestore";

export const getUser = async (userId: User["id"]): Promise<User> => {
  return getDocument("user", userId);
};

export const createUser = async (
  user: Omit<User, "id">
): Promise<User["id"]> => {
  return addDocument("user", user);
};

export const patchUser = async (
  userId: User["id"],
  user: Omit<User, "id">
): Promise<void> => {
  return updateDocument("user", userId, user);
};
