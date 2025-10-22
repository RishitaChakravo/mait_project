import jwt, {JwtPayload} from 'jsonwebtoken'

export default async function getDatafromToken(token: string){
    try {
        if(!token) {
            console.error("NO TOKEN: Maybe not logged in")
            return null;
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!)
        if (typeof decodedToken === "string") {
            return null;
        }
        return (decodedToken as JwtPayload).id
    } catch (error) {
        console.error("Couldn't get data from token", error)
    }
}