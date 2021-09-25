# InstagramClone
An Instagram Clone using Laravel and Reactjs

![alt text](https://github.com/kienndhn/InstagramClone/blob/main/front-end/public/demo/demo.gif?raw=true)

## Backend
### Usage
- Laravel Framework 8.50.0
- Sanctum 2.11
- MySQL 

### Get Start
- Go to the folder `cd backend`
- Install composer `composer install`
- Install npm package `npm install`
- Copy and edit .env file from .env.example `cp .env.example .env`
- Generate project key `php artisan key:generate`
- Create an empty database `test` for example
- In the .env file, change database information `DB_DATABASE=test`
- Migrate the database `php artisan migrate`
- Create symbolic link for storage `php artisan storage:link`
- Run project `php artisan serve`

## Frontend
### Usage
- React 17.0.2
- Bootstrap CSS 4.3.1
- axios 0.21.1
- react-icon 4.2.0
- react-router-dom 5.2.0
- react-redux 7.2.4
- redux 4.1.1
- redux-devtools-extension 2.13.9
- redux-thunk 2.3.0
### Get Start
- Go to the folder `cd front-end`
- Install npm package `npm install`
- Run project `php artisan serve`
