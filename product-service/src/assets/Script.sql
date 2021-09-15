--create extension if not exists "uuid-ossp";

--create table Product_model (
--	id uuid primary key default uuid_generate_v4(),
--    title text,
--    description text,
--    price integer
--)

--create table stock_model (
--	product_id uuid primary key default uuid_generate_v4(),
--	count integer,
--	foreign key ("product_id") references "product_model" ("id")
--)

--insert into product_model (title, description, price) values
--('Sadness','Emotion of Sadness',2.4),
--('Happiness','Emotion of Happiness',10),
--('Anger','Emotion of Anger',4),
--('Interest','Emotion of Interest',7),
--('Fear','Emotion of Fear',2),
--('Adoration','Emotion of Adoration',8.5)

--insert into stock_model (product_id, count) values
--('ebd3779f-3286-40ff-93ef-3b9ec42da102',3),
--('c68a4107-33f4-4103-8510-888a66b73777',8),
--('4a17f108-1346-4ea6-9605-58fb5d73abfa',5),
--('26371ded-b90e-4d99-8f5e-117accd34d50',7),
--('50a03895-718a-49b1-92a5-15c07a7bc89f',2),
--('6fa30a0d-0881-4bd3-bd63-635500e67a75',10)

-- SELECT * FROM product_model WHERE title = 'Happiness'

-- SELECT * FROM (select * from product_model where product_model.id='c68a4107-33f4-4103-8510-888a'

-- insert into product_model (title, description, price) values ('Surprise','Emotion of Surprise',7)

-- SELECT * FROM product_model WHERE product_model.title='Surprise' and product_model.description='Emotion of Surprise' and product_model.price=7

-- insert into stock_model (product_id, count) values ('6fa30a0d-0881-4bd3-bd63-635500e67a75',12)

--delete from product_model where product_model.title='Surprise' and product_model.description='Emotion of Surprise' and product_model.price=7

-- delete from stock_model where stock_model.product_id='238ae75f-cbf8-4ed7-bd59-debe94926d93'
