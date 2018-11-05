# POS, Online-Shop and Inventory all in one

> This tool gives you everything you need to set up your shop.

## Required accounts

``` bash
# get firebase account
firebase.google.com

# get github account
www.github.com
```

## Preparations and settings

``` bash
# database preparation
products
intakes

# authorization enabled
firebase authorization

# firebaseConfig
create file firebaseConfig.js in src/components folder
and copy credentials from firebase

# cors setup
install gcloud util
follow cors instructions

```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Features 

``` bash
# already existing
- mass loading for new products seems as we need to load all fields even if empty
- different user roles (employee); 
- automated size adjustment when uploading thumb picture
- download images
- multi language
- picture carousel
- manual entry and remove from cart

# in the pipeline

- resizing is right now making it much smaller but should keep it white and 
put the picture in the middle

- printout receipt; https://www.npmjs.com/package/node-thermal-printer; 
https://reference.epson-biz.com/modules/ref_epos_sdk_js_en/index.php?content_id=1

- buttons in display only when logged in (evtl this has to go into the store right away)
because it is also in the router

- prices in better number format

# not highest priority
- diagrams on sells and profit overview
- search and tags
- user authentication email https://firebase.google.com/docs/auth/web/email-link-auth
    (some whitelisting of url is necessary)

```