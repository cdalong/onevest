# Onevest Federated Data Demo Code

# Installation

```sh
npm i && npm run server
```

# Thoughts:

## Testing:
    It seems that testing these sorts of things is done with federation-testing-tool (https://github.com/xolvio/federation-testing-tool) but for the life of me I can't seem to get it to resolve both schemas during testing. In the case where we're not using an Apollo Gateway, it seems relatively straightforward but testing the gateway itself adds some complexity.

    That said, I could just be missing something incredibly obvious.

    Cases:
        User with post
        User with Multiple Posts
        User with No Posts
        Post with no Valid author
        Invalid data? -- How would I model this case, can I assume clean data?


## Users
    fetchUser($userId: ID!): User!
        returns a post from a specific Id. Found in users/users.js
        Resolver just pulls from the mock JSON data in the REST API filtering by ID. Expects one unique ID
    fetchAllUsers: [User!]!
        Fetches all Users without ID

## Posts

    fetchPost($postId: ID!): Post!
        returns a post from a specific Id. Found in posts/posts.js
        The resolver is just pulling from the mock REST API response of filtering by ID. A primary assumption is there will only be one ID

    fetchAllPosts()
        returns all posts
        Resolver just pulls from mock rest API


## Cross Querying

Getting All Posts from a User; 
{
	fetchUser(id: 1){
    name,
    fetchAllPosts{
      content
      postDate
    }
  }
}

Cannot get User info from Post author just yet... I might be missing some directive in the schema (@provides or something...) that will allow me to relate the two.


## Typescript versus Javascript
Most of the literature for Apollo is Javascript, might have to forgive my naivety but is there an easy way to convert between the two? What's the primary benefit to Onevest to use Typescript in this case? (Strong typing)?