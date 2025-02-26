create table cars (
    id_car SERIAL PRIMARY KEY,
    make text, 
    model text,
    year int
);

create table users_cars (
    email varchar(30) primary key, 
    name text,
    last_name text,
    password text
);

select * from cars;


select * from users_cars;