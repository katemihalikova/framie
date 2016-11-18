# *Framie* client
![GitHub version](https://img.shields.io/github/release/katemihalikova/framie-server.svg?style=flat-square)

> *Framie* - Dynamic photo frame made simple

# Introduction

With *Framie* you can make up a simple photo frame from your old tablet. Upload new pictures via internet.

# Usage

Android version is included, iOS version should work out-of-the-box too.

You will also need some server part ([framie-server](https://github.com/katemihalikova/framie-server)) and some way to upload files ([framie-uploader](https://github.com/katemihalikova/framie-uploader)).

# Installation

- clone the repo
- `npm install`
- `ionic state restore`
- set your configuration
- `ionic run android`

# Configuration

Set your own application id in `config.xml`.

Set your own settings in `app/config.ts`.

- `url` - base URL of your *Framie* server
- `numberOfImages` - number of images that cycle in the app, older ones are discarded
- `durationOfImage` - function returning number of milliseconds between images

You can also change transition duration in `src/pages/frame/frame.scss`
