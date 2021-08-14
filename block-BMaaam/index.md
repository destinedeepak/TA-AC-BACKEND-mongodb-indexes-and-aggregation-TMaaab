writeCode

Insert the data present in users.json into local mongodb database using `mongoimport` into a database called sample and collection named as users.

Write aggregation queries to perform following tasks.

1. Find all users who are active.
   db.users.aggregate({$match:{isActive:true}})

2. Find all users whose name includes `blake` case insensitive.
   db.users.createIndex({name:"text"});
   db.users.find({$text:{$search:"blake"}})

3. Find all males.
   db.users.aggregate({$match:{gender:'male'}}).pretty()

4. Find all active males.
   db.users.aggregate([
     {$match:{gender:'male'}},
     {$match:{isActive:true}}
     ])

5. Find all active females whose age is >= 25.

  db.users.aggregate([
   {$match:{gender:'female', isActive:true, age : { $gte : 25}}}
  ])

6. Find all 40+ males with green eyecolor.
db.users.aggregate([
  {$match:{ gender:'male', eyeColor:'green', age:{$gte:40} }}
])

7. Find all blue eyed men working in 'USA'.
db.users.aggregate([
  {$match:{ eyeColor:'blue', 'company.location.country':'USA'}}
])

8. Find all female working in Germany with green eyes and apple as favoriteFruit.
db.users.aggregate([
  {$match: {gender:'female', 'company.location.country':'Germany', eyeColor:'green', favoriteFruit: 'apple'}}
])

9. Count total male and females.
db.users.aggregate([
  {
  $group:{
    _id:'$gender',
    count: {$sum: 1},
  }}
])

10. Count all whose eyeColor is green.
db.users.aggregate([
  {$match:{eyeColor: 'green'}},
  {$group:{
      _id: 'eyeColor',
      count: {$sum:1}
  }}
])

11. Count all 20+ females who have brown eyes.
db.users.aggregate([
  {$match:{ gender:'female', age:{$gt:20}, eyeColor:'brown' }},
  {$group:{
    _id:'femalesCount',
    count:{$sum:1}
  }}
])

12. Count all occurences of all eyeColors.
    Something like:-

```
blue -> 30
brown -> 67
green -> 123
```
db.users.aggregate([
  {$group: {
    _id: '$eyeColor',
    count:{$sum:1}
  }}
])
13. Count all females whose tags array include `amet` in it.
db.users.aggregate([
  {$match:{ gender:'female',tags:{$in:['amet']} }},
  {$group:{
    _id:'femalesWithAmetInTag',
    count:{$sum:1}
  }}
])

14. Find the average age of entire collection
db.users.aggregate([
  {$group:{
    _id:'averageAge',
    'avg_age':{$avg:"$age"}
  }}
])

15. Find the average age of males and females i.e. group them by gender.
db.users.aggregate([
  {$group:{
    _id:'$gender',
    'avg_age':{$avg:"$age"}
  }}
])

16. Find the user with maximum age.
db.users.aggregate([
  {$group:{
    _id:null,
    maxAge: {$max: "$age"}
  }}
])

17. Find the document with minimum age.
db.users.aggregate([
  {$group:{
    _id:null,
    maxAge: {$min: "$age"}
  }}
])

18. Find the sum of ages of all males and females.
db.users.aggregate([
  {$group:{
    _id:'$age',
    count: {$sum:1}
  }}
])

19. Group all males by their eyeColor.

20. group all 30+ females by their age.

21. Group all 23+ males with blue eyes working in Germany.

22. Group all by tag names i.e. use \$unwind since tags are array.

23. Group all males whose favoriteFruit is `banana` who have registered before 2015.

24. Group all females by their favoriteFruit.

25. Scan all the document to retrieve all eyeColors(use db.COLLECTION_NAME.distinct);

26. Find all apple loving blue eyed female working in 'USA'. Sort them by their registration date in descending order.

27. Find all 18+ inactive men and return only the fields specified below in the below provided format

```js
{
  name: "",
  email: '';
  identity: {
    eye: '',
    phone: '',
    location: ''
  }
}
```
