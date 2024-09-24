import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
        this.loadUser();
    }

    async saveUser(user: User) {
        this.user = user;
        await this.setStoredUser(user);
    }

    async loadUser() {
        const storedUser = await this.getStoredUser();
        if (storedUser) {
            this.user = storedUser;
        }
    }

    clearUser() {
        this.user = null;
        this.setStoredUser(null);
    }

    private async getStoredUser(): Promise<User | null> {
        try {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                return JSON.parse(storedUser);
            }
            return null;
        } catch (error) {
            console.error('Failed to load user from AsyncStorage:', error);
            return null;
        }
    }

    private async setStoredUser(user: User | null) {
        try {
            if (user) {
                await AsyncStorage.setItem('user', JSON.stringify(user));
            } else {
                await AsyncStorage.removeItem('user');
            }
        } catch (error) {
            console.error('Failed to save user to AsyncStorage:', error);
        }
    }
}

export default new UserStore();
