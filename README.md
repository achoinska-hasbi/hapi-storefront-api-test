# hapi-storefronts-api

API Endpoints:

http://localhost:3000/storefronts/1  
http://localhost:3000/search?categoryCode=rec  
http://localhost:3000/search?city=New%20York&state=NY  


#### Task #1 
- Given storefront route defined in [entrypoints.js](https://github.com/achoinska-hasbi/hapi-storefront-api-test/blob/master/src/entrypoints.js)
- Update the `fetch` methods so that it returns storefront filtered out by id
- Assure that all the tests are pasing

#### Task #2 
- Given search route defined in [entrypoints.js](https://github.com/achoinska-hasbi/hapi-storefront-api-test/blob/master/src/entrypoints.js)
- Update the `fetchStorefronts` methods so that it returns storefront filtered out by category code
- Assure that all the tests are pasing

#### Task #3 (TO BE ADDED)
- Given search route defined in [entrypoints.js](https://github.com/achoinska-hasbi/hapi-storefront-api-test/blob/master/src/entrypoints.js)
- Update the `fetchStorefronts` methods so that it returns storefronts filtered out by market code if city and state are provided
- Assure that all the tests are pasing

#### Task #4 
- Given search route defined in [entrypoints.js](https://github.com/achoinska-hasbi/hapi-storefront-api-test/blob/master/src/entrypoints.js)
- Update the `fetchOrderedStorefronts` methods so that it returns storefronts ordered by order defined in `orderedStorefrons` method
- Assure that all the `fetchOrderedStorefronts` unit tests are pasing
- Update search handler so that now it returns ordered storefronts
- Assure that all the test are passing

#### Questions: 
What are the edge cases?  
What status code should be returned if query param is missing (eg: city, state)?  
What status code should be returned in case of database error?   
Is the solution efficient?  
Could execution be paralelized?  
What tests should be added?  

### Additional Questions: 
##### SQL
- Constraints: what is index, primary key, foreign, unique key?
- Joins? Types?
- What is a view?
- What is normalization/denoramlization?
- What are stored procedures, triggers?
##### NoSQL
- What is noSQL?
- Difference between SQL and NoSQL? Features of NoSQL?
- Experience with ES?
      -  What is a cluster?
      -  What is an index?
      -  Explain mapping?
      -  What is a document?
      -  What is sharding?
      -  What are replicas?
##### JS 
- Sync vs asyc code execution, when to use it?
- What are promisses?
- What are the states of the promise?
- What are usecases of Promise.all? What happens if one of promisses fails?
- How NodeJs handles threads?
- What's the benefit of using asyc/await?
##### Caching
- What is caching?
- Advantages of using cache?
##### Docker & k8
- What is visualization? 
- What is containerization?
- What is a container?
- What are images?
- What is a dockerfile?
- How is Kubernetes related to Docker?
- Benefits of Kubernetes?
- What is a pod? node on Kubernetes?
##### AWS
- How familiar are you with S3, EB, EC2, SQS, SNS, Lambdas?
- Vertical/horizontal scaling?
- Autoscaling?
- Load balancer?
##### APIs
- What is RESTful API? 
- Methods supported by HTTP protocol?
- How RESTful API differs from GraphQL?
##### Sessions
- Server load balancer and storing user sessions?
- What is a session?
- What is a session ID?
- What are the ways of session tracking?
##### Design Patterns
- Factory
- Singelton
- Decorator
- Proxy
##### OOP
- Polymorphism
- Encapsulation
- Inheritance
- What is a class? instace of the class?
- What is a constructor?
- What is a super keyword?
##### System Architecture
- Service abstraction?
- Microservice oriented architecure vs monolith application?
- Advantages/disadvantages of microservices?


## Test Project
Run tests inside your container
```Text
make run
```

## Start Server
```Text
make docker-run
```


