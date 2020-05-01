# Yoga-Shala
This is a full-stack app, developed using Express and Node.js and created with the purpose to learn building a business website. This business website is specifically meant to serve the yoga instructors. I attempted to recreate the website of my yoga instructor. It simulates some of the core functionalities of his business website. 

### Application is deployed at: 
```sh
https://yoga-shala.herokuapp.com/
```


## Functionalities 
* Home page with all the info about the yoga center and the Class Schedule page are open to view by all. For everything else,  one has to login. Website has security features through which it authenticates a user and this functionality is achieved by passport and session maintenance.
* Here students can register and see all their classes once they create an account on the website. Their account is personalized in a unique way so that when they register for any class, they will know if they have already registered for it. They can customize the view of a particular set of class which they have registered by filters. Their profile page is beautifully designed with a different inspiration quote to see everytime they login. They have the ability to cancel their classes and they can also see the ones they cancelled.
* Instructors can view, add, cancel and update classes. They can see all the students who have registered for each class and those who have cancelled it. The GUI is very user friendly to perform all the operations. Another unique feature of this web-app is that instructors can also sort the classes using filters to see a particular set of classes.
* Fully responsive, mobile-friendly website.


## What It Includes

* Local Auth (email and passport)
* Passport and passport-local
* Sessions for saving user info and displaying flash messages
* Hashed passwords
* EJS templating and EJS layouts
* Sequelize User model
* Materialize styling- nav and footer, W3CSS Home Page, Google Fonts
* Uses Two APIs: One pulls yoga data and another quotes
* Models uses N:M, 1:M and also 1:1 reltionships. Classes and Students/Users are in N:M relationship. Their Join table is class_users. This model has 1:M relationship with class and user/student where one class has multiple entries in class_user table. Location and Instructor table have 1:1 relationships respectively with class.

## Included Models

**User/Student Model**

|  Column | Type | Notes |
|----------------|---------------|------------------------|
| id | Integer | Serial primary key | 
| firstname | String | Required length > 1 |
| lastname | String | - |
| email | String | Unique Login |
| password |String | Hash |
| birthday | Date | - |
| admin | Boolean | Defaulted to False |
| pic | String | - |
| bio | Text | - |
| address | Text | - |
| city | Text | - |
| state | Text | - |
| zipcode | Integer | - |
| createdAt | Date | Automatically added by Sequelize |
| updatedAt | Date | Automatically added by Sequelize |


**Classevent Model**

|  Column | Type | Notes |
|----------------|---------------|------------------------|
| id | Integer | Serial primary key | 
| classname | String | - |
| classtype | String | - |
| date | Date | - |
| starttime | String | - |
| endtime | String | - |
| price | Float | - |
| instructorId | Integer | Foreign Key |
| locationId | Integer | Foreign Key |
| createdAt | Date | Automatically added by Sequelize |
| updatedAt | Date | Automatically added by Sequelize |

**Class-User Model**

|  Column | Type | Notes |
|----------------|---------------|------------------------|
| id | Integer | Serial primary key | 
| classeventId | Integer | Foreign Key |
| userId | Integer | Foreign Key |
| registerCancel | Text | - |
| createdAt | Date | Automatically added by Sequelize |
| updatedAt | Date | Automatically added by Sequelize |

**Location Model**

|  Column | Type | Notes |
|----------------|---------------|------------------------|
| id | Integer | Serial primary key | 
| centername | Text | - |
| address | Text | - |
| city | Text | - |
| state | Text | - |
| zipcode | Integer | - |
| createdAt | Date | Automatically added by Sequelize |
| updatedAt | Date | Automatically added by Sequelize |

**Instructor Model**

|  Column | Type | Notes |
|----------------|---------------|------------------------|
| id | Integer | Serial primary key | 
| firstname | String | - |
| lastname | String | - |
| qualifications | Text | - |
| userId | Integer | - |
| createdAt | Date | Automatically added by Sequelize |
| updatedAt | Date | Automatically added by Sequelize |


## Included Routes

**Routes in Index**

| Method | Path | Purpose |
|------------|------------------------------|------------------------|
| GET | ' /  ' | Home page |
| GET | ' * ' | Catch-all for 404s |

**Routes in controllers/auth.js**

| Method | Path | Purpose |
|------------|------------------------------|------------------------|
| GET | '/auth/login' | Render login form |
| POST | '/auth/login' | Process login data |
| GET | '/auth/signup' | Render signup form |
| POST | '/auth/signup' | Process signup data |
| GET | '/auth/logout' | Remove user from session + redirect |

**Routes in controllers/profile.js**

| Method | Path | Purpose |
|------------|------------------------------|------------------------|
| GET | '/profile/user' | Show user dashboard (authorized user only) |
| GET | '/profile/admin' | Show admin dashboard (authorized admin only) |
| GET | '/profile/guest/:id' | View user dashboard as guest (authorized user only) |


**Routes in controllers/class.js**

| Method | Path | Purpose |
|------------|------------------------------|------------------------|
| GET | '/class/schedule' | Render class schedule page which anyone can see (whether logged in or not) |
| GET | '/class/new' | Page to add a new class (by the instructor) |
| POST | '/class/show' | Process data when a new class is added |
| GET | '/class/show' | Render page to view all classes- by instructor (only instructor can see it) as show page |
| GET | '/class/:id' | Render page to edit the class info- by instructor |
| PUT | '/class/show' | Updates the already existing class info by instructor and redirects to show page |
| GET | '/class/sort' | To filter classes by category for instructor |
| GET | '/class/sortToday' | To filter classes by category for instructor |
| DELETE | '/class/:id' |  Delete a particular class- by instructor |
| GET | '/class/registerclass' | Page for student to see all the classes and register |
| POST | '/class/userclass' | Register the student to a class |
| GET | '/class/userclass' | Show thw student/user his classes (registered) |
| GET | '/class/userUpcoming' | Filter the classes of a student by category |
| GET | '/class/userHistory' | Filter the classes of a student by category |
| PUT | '/class/cancel' | Process data when user cancels a class |

## Directions For Use

### 1. Fork this repository. Click clone and copy the HTTPS link. On your local choose the directory where you can add this project (cd into the directory of your choice). If you would like to use this project for reference for your own project then just clone it.

Run the following command on the terminal:

```sh
git clone <repo_link> <new_name>
```
**For example**

```sh
git clone https://github.com/ruchitasir/node-auth-boiler.git my-new-project
```

### 2. Install the modules from package.json

```sh
npm i
```

### 3. Customize the new project if you would like to use this project as a reference for your website

Remove defaulty stuff. For example:

* Title in `layout.ejs`
* Logo field in the nav bar
* Description and Repository fields in package.json
* Remove this boilerplate's readme content
* Switch Favicon to porject-specific one (in `layout.ejs` head section)

### 4. Create a new database for the new project

```sh
createdb <new_db_name>
```

**For example**

```sh
createdb my_new_db
```

### 5. Alter Sequelize Config File

In `config/config.json`, update the database name to the one created in step 4. Other settings likely okay, but check username, password and dialect.

### 6. Create user models as specified above or create the ones relevant to your project's needs

For example, if the new project doesn't need a birthday field, then delete it from the user model and user migration files.

### 7. Run the sequelize migrations

```sh
sequelize db:migrate
```
### 8. Create a file for environment variables

```sh
touch .env
```

> Alternatively just create via text editor

Include the following .env variables:

* SESSION_SECRET - this is a key for the session to use

### 9. Run the server and make sure it works

**with nodemon**

```sh
nodemon
```

**without nodemon**

```sh
node index.js
```

## Steps 10-12 are applicable if you have only cloned this repository and not forked it. If you have forked it, you can run the git command to push all your changes to your forked repository on GitHub website.

### 10. Delete the origin that points to this repository

Currently if we run this command:

```sh
git remote -v
```

It will show `origin` as being hooked up with the boilerplate repository. We want a fresh repository instead, so let's delete the origin remote:


```sh
git remote remove origin
```

### 11. Create an empty git repository

Via the Github website. Follow directions as they show up when you create a new repository:

```sh
git init
git add .
git commit -m "Initial commit"
git remote add origin <new_repo_link>
git push origin master
```

**Enjoy running this project and happy developing for your own project!**








