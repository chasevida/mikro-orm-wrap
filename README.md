# Mikro ORM wrap

First of, really digging Mikro ORM - thank you!



This is a demo repo for testing how to wrap updates for an entity that contains a collection where some of those entities will be updated.



After reading the issues here https://github.com/mikro-orm/mikro-orm/issues/467 it was still not clear how this would be achieved so I creatd a small demo repo to reproduce the issue as I understand it.



## Run the demo



```
git clone git@github.com:chasevida/mikro-orm-wrap.git
cd mikro-orm-wrap

yarn install // or npm install
docker-compose up -d

yarn mikro-orm migration:up

yarn start
```



## Expected Behaviour

Rightly or wrongly (I'm still pouring through the mikro-orm docs) I expected the `wrap` method to update child collections of the entity with the `mergeObjects: true` flag. However, that is not happening. It may be that I'm simply missing some additional paramaters in the call or in the entity itself (maybe a some sort of cascading).

Any and all help welcome :)