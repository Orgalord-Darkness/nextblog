export interface User {
    id: number, 
    email:string, 
    password: string,
    name:string,
    role:string,
    blogs:Blog, 
    Post:Post[], 
}

export interface Blog {
    id:number, 
    author:User, 
    avatar:Image, 
    bio:string, 
    published: boolean ,

}

export interface Image {
    id: number, 
    path: string,
    size: number,
    format: string
}

export interface Post {
    id: number, 
    author: User, 
    content: string, 
    created_at: Date,
    image: Image, 
    published: Boolean,
    title: string, 
}

export type SessionPayload = {
    userId: string
    role: string
    expiresAt: Date
  }
