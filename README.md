# Yoga-Shala
This is a boilerplate for an Express app with local user authentication. It exits so I have a customized boilerplate and don't have to start from scratch on all my projects.

## What It Includes

* Local Auth (email and passport)
* Passport and passport-local
* Sessions for saving user info and displaying flash messages
* Hashed passwords
* EJS templating and EJS layouts
* Sequelize User model
* Materialize styling- nav and footer

## Included Models

**User Model**

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

## Directions For Use

### 1. Clone the repository, but with a different name

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

### 3. Customize the new project

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

### 6. Check user model for relevance to new project's needs

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

### 10. Delete the origin that points to the boilerplate repository

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

**Happy developing!**








