import { Session } from "next-auth";

export async function createOrg(session: Session, type: 'org' | 'solo', name?: string, image?: string, description?: string){
    if(type==='org'){
        if(!name){
            return new Error("Organization name is required")
        }
    }
    
}