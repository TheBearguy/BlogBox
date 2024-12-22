import {Client, ID, Databases, Storage, Query} from "appwrite";
import conf from "../conf/conf.js"

export class configServer{

    client = new Client();
    databases;
    bucket; //storage

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite Error :: createPost :: catch Error :: ", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Error :: updatePost  :: catch Error :: ", error);

        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Error :: deletePost  :: catch Error :: ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Error :: getPost :: Error :: ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", ["active"])]) {
        // get active posts only
        try {
            // it'll return a list of documents
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                // queries can only be made on attributes whose index is made (or availble)
                queries
            )
        } catch (error) {
            console.log("Appwrite Error :: getPosts :: Error :: " , error);
            return false
        }
    }

    //! file upload service
    // here pass the blog of the file (the actual file, not just the name of the file)
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Error :: uploadFile :: Error :: " , error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return false;
        } catch (error) {
            console.log("Appwrite Error :: deleteFile :: Error :: " , error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }
}

export const service = new configServer();

export default configServer;
