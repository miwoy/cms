echo "$1"

openssl des3 -d -md sha256 -k mypass123$1 -in $1 | tar xzf - -C ./
cd deployment-prod
sh before_post.sh
sh install.sh
sh after_post.sh