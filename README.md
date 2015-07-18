# gestionair public web frontend


## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt serve:dist` will build and serve the compiled version

## Deploy

1. `grunt build` will build to /dist
2. `cd dist`
3. `git add --all .`
4. `git commit -m 'release...'`
5. `git push` push to production branch (webhook in github will deploy)

