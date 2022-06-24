rm -r static
rm robots.txt
rm manifest.json
rm index.html
rm asset-manifest.json
(cd ./listening-portals && npm run build)
git add . && git commit -am "asd" && git push