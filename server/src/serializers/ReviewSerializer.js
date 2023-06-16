import UserSerializer from './UserSerializer.js'

class ReviewSerializer {
    static async getSummary(review) {
        const allowedAttributes = ["id", "reviewBody", "createdAt", "bookId", 'username']
        let serializedReview = {}
        for (const attribute of allowedAttributes) {
            serializedReview[attribute] = review[attribute]
        }
        serializedReview.user = await UserSerializer.userDetails(review.userId)
        return serializedReview
    }
}

export default ReviewSerializer;