import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ILocalStorageProvider {
  set: (key: string, value: object) => Promise<void>;
  get: <T>(key: string) => Promise<T | null>;
  remove: (key: string) => Promise<void>;
}

export class LocalStorageProvider implements ILocalStorageProvider {
  public async set(key: string, value: any): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  public async get<T>(key: string): Promise<T | null> {
    const rawItem = await AsyncStorage.getItem(key);

    if (rawItem == null) return null;

    const restoreDates = (_: string, v: string): string | Date => {
      const isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

      if (isoDateRegex.test(v)) {
        const d = new Date(v);
        if (d instanceof Date && d.toISOString() === v) return d;
      }

      return v;
    };

    const item: T = JSON.parse(rawItem, restoreDates);

    return item;
  }

  public async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}
