# WordPress Ndpi Plugin

## Requirement 
- Composer [HERE](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)
- Nodejs [HERE](https://nodejs.org/en/download/)
- PHP >= 8.0.11 
## install
- Clone git repository
```shell script
git clone git@github.com:therakib7/ndpi.git
cd ndpv
```
- Generate vendor autoload files
```shell script
composer dumpautoload -o 
```
- Install Node package
```shell script
npm install
```

## Changes
- You need to change NCPI Project to your plugin name
- You need to change ndpv to your plugin slug
- Set name space composer.json psr-4 to tour unique namespace for the app folder
```json
{
  "Ndpi\\": "app"
}
```
- Rename app/Ndpi.php to your app class name
```php
final class Ndpi{

}
// TO =>
final class YourPluginInitClass{

}
//================ Start up function ==============
function ndpi() {
    return Ndpi::getInstance();
}

ndpi();
// TO =>
function your_ndpv_function() {
    return Ndpi::getInstance();
}

your_ndpv_function();
```

## NPM Helper comment
```shell script
npm run dev
```
```shell script
npm run prod
```  
```shell script
npm run package 
``` 
```shell script
npm run zip 
``` 

## Task list
- [ ] Add Laravel mix support to compile gutenberg block 
- [ ] Add some helper Class 
- [ ] Add some feature that can add extra functions to a class