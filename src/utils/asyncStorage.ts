import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem(key: string, value: string): Promise<void> {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    return;
  }
}

export async function getItem(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    return;
  }
}
