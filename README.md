# Project: Blog website on firebase

My take on full-stack developing a blog website for food recipes sharing. 

The website allows viewers to see recipes from database (firebase-"{REDACTED}" due to security and expiration in February). Viewer can sign up or log in (user-authentication) to post recipes to firebase (cannot post picture on real-time, REQUIRED change in host machine due to free firebase's limitation). 

Viewer can also use search bar to search for specific recipe, or filter function to narrow down categories of dishes. For example, user can search for dinner recipes of european cuisine with the word "pasta". If the dish is in database, it will show up, otherwise the page will be blank. 

Viewer can also leave their email to subscribe to the database that store list of emails to send notifications for updates.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Database format
# foods
- Recipe ID
  - description: <string>
  - image: </pics/picture.png> <string>
  - ingredient (map):
    - part1 (array):
      - "Name of dish 1" <string>
      - "ingredient of dish 1" <string>
      - ...
    - part2 (array):
      - "Name of dish 2 or side dish" <string>
      - "ingredient of dish 2" <string>
      - ...
  - instructions (map):
    - part1 (array):
      - "Name of dish 1" <string>
      - "line of instruction for dish 1" <string>
      - ...
    - part2 (array):
      - "Name of dish 2 or side dish" <string>
      - "line of instruction for dish 2" <string>
      - ...
    - name: "Recipe name or title" <string>
    - series: "type of cuisine, choose one of the four (american/european/asian/african)" <string>
    - type: "meal type, choose one of the four (breakfast/lunch/dinner/dessert)" <string>

* Note: series and type affect the sorting function and filter function when user search for recipes in categories.

* Example:
- 10
  - description: "A comforting dinner featuring roasted turkey, mashed potatoes, gravy, green beans, and cranberry sauce." (string)
  - image: "/pics/american3.jpg" (string)
  - ingredient (map):
    - part1 (array):
      - 0: "Turkey:" (string)
      - 1: "1 whole turkey (10-12 lbs)" (string)
      - 2: "1/4 cup butter" (string)
      - 3: "Salt, pepper, rosemary, thyme" (string)
    - part2 (array):
      - 0: "Mashed Potatoes:" (string)
      - 1: "4 large potatoes" (string)
      - 2: "1/2 cup milk" (string)
      - 3: "2 tbsp butter" (string)
      - 4: "Salt and pepper" (string)
    - part3 (array):
      - ...
  - instructions (map):
    - part1 (array):
      - 0: "Turkey:" (string)
      - 1: "Preheat oven to 350°F (175°C). Rub turkey with butter, salt, pepper, rosemary, and thyme." (string)
      - 2: "Roast for 3-4 hours, basting occasionally, until internal temperature reaches 165°F (74°C)." (string)
    - part2 (array):
      - 0: "Mashed Potatoes:" (string)
      - 1: "Boil peeled potatoes until tender. Mash with milk, butter, salt, and pepper." (string)
    - part3 (array):
      - ...
  - name: "Thanksgiving-Style Roasted Turkey" (string)
  - series: "american" (string)
  - type: "dinner" (string)
 
# users
- User ID
  - email: <string>
  - password: <string>

* Example: 
- T7SeJl578FQg6X0a7jVn
  - email: "pippa@gmail.com" <string>
  - password: "1111" <string>
  
# subscribers
- Subcriber ID
  - email: <string>

* Example:
- XrchcuW8g86IGBmHdw0E
  - email: "divert@gmail.com" <string>   

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
