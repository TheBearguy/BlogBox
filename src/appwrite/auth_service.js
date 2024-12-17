import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite"

// normally we would connect the appwrite project and endpoint here directly and handle the user authentication,
// !but then wherever we want to use this auth functionality, we would have to import it again and again and pass in the new email / pwd (so basically redundant running the code)
// *there's a  better way to do it -> create class of this funcitonality
// *create an object of this class and simply export it
// *whichever component requires it wil import it and then all of the behaviours and properties of the class will be accessible to those components via the object

export class AuthService {

    client = new Client();
    account;

    constructor(client, account) {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique() ,email, password, name);
            if (userAccount) {
                //* call another method -> if account created, then login
                return this.login({email, password});
                // return userAccount;
            }
            // throw new Error("Some error in creating an account ")
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession();
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService();

export default authService;
