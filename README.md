## Requirement : 
* `Docker / Docker Desktop (Windows/Mac)` [Ref](https://docs.docker.com/get-docker/) 
* `docker-compose` [Ref](https://docs.docker.com/compose/install/)
* `yarn` [Ref](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

# Cara Deploy atau run Project 
## Run di docker : 
* Pertama copy file `env.example` yang ada di backend ke file baru namanya `.env`
* Kemudian pastikan pwd nya itu di `root` atau `/`  trus run `docker-compose build` untuk mem-build image dockernya 
* Kemudian untuk menjalankan image nya run `docker-compose up`
* Kalo mau digabung bisa run `docker-compose up --build` 
* Kalo acces denied kasih `sudo` sebelum `docker-compose`
* Kalo udah di run nanti kelihatan di `Docker Desktop` image sama containernya atau bisa cek dengan command `docker-compose ps`
## Penting
* Jangan lupa uncomment bagian yang ada `localhost` sama `db.localhost` yang ada di `/ltdb-nginx/nginx.conf` dan comment baris yang ada domain `lantabur.sch.id` supaya bisa di akses lewat `localhost` untuk development. 
* Untuk deploy ke server comment bagian `localhost` dan uncomment baris yang ada `lantabur.sch.id` 
