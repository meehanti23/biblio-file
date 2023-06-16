class UserSerializer {
    static userDetails(user) {
        const allowedAtributes = ["id", "username", "createdAt"]
        let serializedUser = {}
        for (const attribute of allowedAtributes) {
            serializedUser[attribute] = user[attribute]
        }
        return serializedUser
    }
}

export default UserSerializer;