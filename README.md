# McNugget

## Personnel
Team Lead - Syaf,
Digital Producer - Greg,
Account Director - Omar / Nathan,
Tech Lead - Bianca,
Dev Ops - Kevin / Richard,
Front-end  - Olivia / Petr,
Back-end - Jon / Takuya,
Design / UX / UI - Terry / Cindy,

# Petr 30.09.2017

** Added components
*** gem for Bootstrap v 4.0.0 beta
*** more requirements to application.js

** Removed components
*** @import "bootstrap-sprockets"; from application.scss as it was causing problems and the app couldn't start
*** gem 'bootstrap-sass', '~> 3.3.6' from gemfile. This one is for Bootstrap 3

** Possible steps to be done before the Rails server gets started:
*** Postgres could not connect to server
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start

** One-off solution to migrate database to Postgresql
** FATAL: database "myapp_development" does not exist Extracted source (around line #661)
1. cd /your/app/path
2. bundle install
3. bundle exec rake db:create
4. bundle exec rake db:migrate
5. bundle exec rails server

*** Changed file structure of the application so there is just one main McTwitter folder containing everything.
