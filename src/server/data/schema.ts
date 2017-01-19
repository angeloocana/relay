import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} from 'graphql';

function Schema(db){

    var counter = 42;
    var data = [42, 43, 44];

    var counters = [{counter: 42}, {counter: 43}];
    var counterType = new GraphQLObjectType({
        name: 'Counter',
        fields: () => ({
            counter: {type: GraphQLInt}
        })
    });

    var store = {};
    var linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => ({
            _id: {type: GraphQLString},
            title: {type: GraphQLString},
            url: { type: GraphQLString}
        })
    });

    var storeType = new GraphQLObjectType({
        name: 'Store',
        fields: () => ({
            links: {
                type: new GraphQLList(linkType),
                resolve: () => db.collection('links').find({}).toArray()
            }
        })
    });

    var schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({           
                store:{
                    type: storeType,
                    resolve: () => store
                },
                counter:{
                    type: GraphQLInt,
                    resolve: ()=> counter
                },
                message:{
                    type: GraphQLString,
                    resolve: ()=> "Hello GraphQL!"            
                },
                data: {
                    type: new GraphQLList(GraphQLInt),
                    resolve: () => data            
                },
                counters: {
                    type: new GraphQLList(counterType),
                    resolve: () => counters
                },
                links:{
                    type: new GraphQLList(linkType),
                    resolve: () => db.collection('links').find({}).toArray()
                }
            })
        }),

        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: () => ({
                incrementCounter: {
                    type: GraphQLInt,
                    resolve: () => ++counter
                }
            })
        })    
    });

    return schema;
}

export default Schema;
