import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY_CHATS = "cached_chats";
const CACHE_KEY_MESSAGES_PREFIX = "cached_messages_";

export const cacheMessages = async (chatId: string, messages: any[]) => {
  try {
    await AsyncStorage.setItem(
      `${CACHE_KEY_MESSAGES_PREFIX}${chatId}`,
      JSON.stringify(messages)
    );
  } catch (error) {
    console.error("Error caching messages:", error);
  }
};

export const getCachedMessages = async (chatId: string) => {
  try {
    const messages = await AsyncStorage.getItem(
      `${CACHE_KEY_MESSAGES_PREFIX}${chatId}`
    );
    return messages ? JSON.parse(messages) : [];
  } catch (error) {
    console.error("Error getting cached messages:", error);
    return [];
  }
};

export const clearOldCache = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    for (const key of keys) {
      if (key.startsWith(CACHE_KEY_MESSAGES_PREFIX)) {
        const messages = await getCachedMessages(
          key.replace(CACHE_KEY_MESSAGES_PREFIX, "")
        );
        const filteredMessages = messages.filter(
          (msg: any) => new Date(msg.created_at).getTime() > oneWeekAgo
        );
        await cacheMessages(
          key.replace(CACHE_KEY_MESSAGES_PREFIX, ""),
          filteredMessages
        );
      }
    }
  } catch (error) {
    console.error("Error clearing old cache:", error);
  }
};

export const cleanupOldMessages = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const messageKeys = keys.filter((key) =>
      key.startsWith(CACHE_KEY_MESSAGES_PREFIX)
    );

    for (const key of messageKeys) {
      const chatId = key.replace(CACHE_KEY_MESSAGES_PREFIX, "");
      const messages = await getCachedMessages(chatId);
      // Keep last 100 messages per chat
      if (messages.length > 100) {
        await cacheMessages(chatId, messages.slice(0, 100));
      }
    }
  } catch (error) {
    console.error("Error cleaning up old messages:", error);
  }
};
