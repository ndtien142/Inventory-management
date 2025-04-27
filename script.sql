CREATE DATABASE inventory_management;
-- DROP TABLE inventory_management.dbo.payment_methods;

CREATE TABLE payment_methods (
	id int IDENTITY(1,1) NOT NULL,
	name nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	description nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	is_active bit NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__payment___3213E83F0FA72780 PRIMARY KEY (id)
);


-- inventory_management.dbo.tb_api_key definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_api_key;

CREATE TABLE tb_api_key (
	id int IDENTITY(1,1) NOT NULL,
	[key] nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	status bit NULL,
	permission nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	is_block bit NOT NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_api_k__3213E83FE5806382 PRIMARY KEY (id)
);


-- inventory_management.dbo.tb_brand definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_brand;

CREATE TABLE tb_brand (
	id int IDENTITY(1,1) NOT NULL,
	brand_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	brand_description nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_brand__3213E83FF8CA6BC1 PRIMARY KEY (id)
);


-- inventory_management.dbo.tb_provider definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_provider;

CREATE TABLE tb_provider (
	id int IDENTITY(1,1) NOT NULL,
	name nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	contact_info nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	is_active bit NOT NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_provi__3213E83F51DC578F PRIMARY KEY (id)
);


-- inventory_management.dbo.tb_role definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_role;

CREATE TABLE tb_role (
	id tinyint IDENTITY(1,1) NOT NULL,
	role_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	role_description nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	is_active bit NOT NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_role__3213E83F457D46E6 PRIMARY KEY (id)
);


-- inventory_management.dbo.tb_unit definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_unit;

CREATE TABLE tb_unit (
	id int IDENTITY(1,1) NOT NULL,
	name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_unit__3213E83F0F324D85 PRIMARY KEY (id)
);


-- inventory_management.dbo.tb_account definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_account;

CREATE TABLE tb_account (
	user_code nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	username nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	password nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	fk_role_id tinyint NOT NULL,
	is_active bit NOT NULL,
	is_block bit NOT NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_accou__EDC4140E92EB6913 PRIMARY KEY (user_code),
	CONSTRAINT FK__tb_accoun__fk_ro__4AD81681 FOREIGN KEY (fk_role_id) REFERENCES tb_role(id)
);


-- inventory_management.dbo.tb_cart definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_cart;

CREATE TABLE tb_cart (
	id int IDENTITY(1,1) NOT NULL,
	fk_user_code nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	total decimal(18,0) NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_cart__3213E83F39E7E5BE PRIMARY KEY (id),
	CONSTRAINT FK__tb_cart__fk_user__4BCC3ABA FOREIGN KEY (fk_user_code) REFERENCES tb_account(user_code)
);


-- inventory_management.dbo.tb_category definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_category;

CREATE TABLE tb_category (
	id int IDENTITY(1,1) NOT NULL,
	name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	description nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	parent_category_id int NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_categ__3213E83FD2FA6BE4 PRIMARY KEY (id),
	CONSTRAINT FK__tb_catego__paren__4CC05EF3 FOREIGN KEY (parent_category_id) REFERENCES tb_category(id)
);


-- inventory_management.dbo.tb_customer_address definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_customer_address;

CREATE TABLE tb_customer_address (
	id int IDENTITY(1,1) NOT NULL,
	fk_user_code nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	address_line1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	address_line2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	city nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	state_province nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	postal_code nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	country nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	is_deleted bit NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_custo__3213E83F8DCF3FDB PRIMARY KEY (id),
	CONSTRAINT FK__tb_custom__fk_us__4DB4832C FOREIGN KEY (fk_user_code) REFERENCES tb_account(user_code) ON DELETE CASCADE
);


-- inventory_management.dbo.tb_key_token definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_key_token;

CREATE TABLE tb_key_token (
	id int IDENTITY(1,1) NOT NULL,
	fk_user_code nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	privateKey nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	publicKey nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	refreshToken nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_key_t__3213E83FE663C054 PRIMARY KEY (id),
	CONSTRAINT FK__tb_key_to__fk_us__5C02A283 FOREIGN KEY (fk_user_code) REFERENCES tb_account(user_code)
);


-- inventory_management.dbo.tb_order definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_order;

CREATE TABLE tb_order (
	id int IDENTITY(1,1) NOT NULL,
	fk_user_code nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	fk_address_id int NOT NULL,
	fk_payment_id int NOT NULL,
	order_date datetimeoffset NOT NULL,
	total decimal(18,0) NOT NULL,
	order_status tinyint NOT NULL,
	fk_payment_method_id int NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_order__3213E83FDCD24BE4 PRIMARY KEY (id),
	CONSTRAINT FK__tb_order__fk_add__4F9CCB9E FOREIGN KEY (fk_address_id) REFERENCES tb_customer_address(id),
	CONSTRAINT FK__tb_order__fk_pay__5090EFD7 FOREIGN KEY (fk_payment_method_id) REFERENCES payment_methods(id) ON DELETE SET NULL,
	CONSTRAINT FK__tb_order__fk_use__4EA8A765 FOREIGN KEY (fk_user_code) REFERENCES tb_account(user_code)
);


-- inventory_management.dbo.tb_profile definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_profile;

CREATE TABLE tb_profile (
	id int IDENTITY(1,1) NOT NULL,
	fk_user_code nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	first_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	last_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	phone_number nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	address nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	created_time datetimeoffset NOT NULL,
	updated_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_profi__3213E83F460CC21F PRIMARY KEY (id),
	CONSTRAINT FK__tb_profil__fk_us__51851410 FOREIGN KEY (fk_user_code) REFERENCES tb_account(user_code)
);


-- inventory_management.dbo.tb_purchase definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_purchase;

CREATE TABLE tb_purchase (
	id int IDENTITY(1,1) NOT NULL,
	fk_provider_id int NOT NULL,
	expected_arrival_date datetimeoffset NOT NULL,
	total_amount decimal(18,0) NOT NULL,
	status tinyint NOT NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_purch__3213E83F0772937E PRIMARY KEY (id),
	CONSTRAINT FK__tb_purcha__fk_pr__52793849 FOREIGN KEY (fk_provider_id) REFERENCES tb_provider(id)
);


-- inventory_management.dbo.tb_refresh_token_used definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_refresh_token_used;

CREATE TABLE tb_refresh_token_used (
	id int IDENTITY(1,1) NOT NULL,
	token nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	fk_api_key_id int NULL,
	CONSTRAINT PK__tb_refre__3213E83F6A414AEE PRIMARY KEY (id),
	CONSTRAINT FK__tb_refres__fk_ap__5CF6C6BC FOREIGN KEY (fk_api_key_id) REFERENCES tb_key_token(id) ON DELETE SET NULL
);


-- inventory_management.dbo.detail_purchase_activity definition

-- Drop table

-- DROP TABLE inventory_management.dbo.detail_purchase_activity;

CREATE TABLE detail_purchase_activity (
	status tinyint NOT NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	fk_purchase_id int NOT NULL,
	fk_admin_id nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__detail_p__BD83143FEFF69541 PRIMARY KEY (fk_purchase_id,fk_admin_id),
	CONSTRAINT FK__detail_pu__fk_ad__6225902D FOREIGN KEY (fk_admin_id) REFERENCES tb_account(user_code) ON DELETE CASCADE,
	CONSTRAINT FK__detail_pu__fk_pu__61316BF4 FOREIGN KEY (fk_purchase_id) REFERENCES tb_purchase(id) ON DELETE CASCADE
);


-- inventory_management.dbo.payment_transactions definition

-- Drop table

-- DROP TABLE inventory_management.dbo.payment_transactions;

CREATE TABLE payment_transactions (
	id int IDENTITY(1,1) NOT NULL,
	fk_order_id int NOT NULL,
	fk_payment_method_id int NOT NULL,
	transaction_date datetimeoffset NULL,
	amount decimal(18,2) NOT NULL,
	transaction_status nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	transaction_details nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__payment___3213E83FFD3F93A0 PRIMARY KEY (id),
	CONSTRAINT FK__payment_t__fk_or__536D5C82 FOREIGN KEY (fk_order_id) REFERENCES tb_order(id),
	CONSTRAINT FK__payment_t__fk_pa__546180BB FOREIGN KEY (fk_payment_method_id) REFERENCES payment_methods(id)
);


-- inventory_management.dbo.sd_product definition

-- Drop table

-- DROP TABLE inventory_management.dbo.sd_product;

CREATE TABLE sd_product (
	product_id nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	product_name nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	product_desc nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	product_status tinyint NULL,
	product_attrs nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	thumbnail nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	sort int NULL,
	is_active bit NOT NULL,
	is_deleted bit NOT NULL,
	product_category_id int NOT NULL,
	product_brand_id int NOT NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__sd_produ__47027DF5D2F6BDE3 PRIMARY KEY (product_id),
	CONSTRAINT FK__sd_produc__produ__5555A4F4 FOREIGN KEY (product_category_id) REFERENCES tb_category(id),
	CONSTRAINT FK__sd_produc__produ__5649C92D FOREIGN KEY (product_brand_id) REFERENCES tb_brand(id)
);


-- inventory_management.dbo.sku definition

-- Drop table

-- DROP TABLE inventory_management.dbo.sku;

CREATE TABLE sku (
	sku_no nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	price decimal(38,0) NOT NULL,
	stock int NOT NULL,
	fk_product_id nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	is_default bit NULL,
	is_deleted bit NULL,
	fk_unit_id int NOT NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__sku__EAC96BCE3E41EADA PRIMARY KEY (sku_no),
	CONSTRAINT FK__sku__fk_product___573DED66 FOREIGN KEY (fk_product_id) REFERENCES sd_product(product_id) ON DELETE CASCADE,
	CONSTRAINT FK__sku__fk_unit_id__5832119F FOREIGN KEY (fk_unit_id) REFERENCES tb_unit(id)
);


-- inventory_management.dbo.tb_unit_conversion definition

-- Drop table

-- DROP TABLE inventory_management.dbo.tb_unit_conversion;

CREATE TABLE tb_unit_conversion (
	id int IDENTITY(1,1) NOT NULL,
	base_unit_id int NOT NULL,
	conversion_unit_id int NOT NULL,
	rate_conversion float NOT NULL,
	is_deleted bit NULL,
	fk_product_id nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	CONSTRAINT PK__tb_unit___3213E83F9E3A7124 PRIMARY KEY (id),
	CONSTRAINT FK__tb_unit_c__base___592635D8 FOREIGN KEY (base_unit_id) REFERENCES tb_unit(id),
	CONSTRAINT FK__tb_unit_c__conve__5A1A5A11 FOREIGN KEY (conversion_unit_id) REFERENCES tb_unit(id),
	CONSTRAINT FK__tb_unit_c__fk_pr__5B0E7E4A FOREIGN KEY (fk_product_id) REFERENCES sd_product(product_id) ON DELETE SET NULL
);


-- inventory_management.dbo.cart_line_item definition

-- Drop table

-- DROP TABLE inventory_management.dbo.cart_line_item;

CREATE TABLE cart_line_item (
	quantity int NOT NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	fk_cart_id int NOT NULL,
	fk_sku_no nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__cart_lin__1630C37F3B0F2EC6 PRIMARY KEY (fk_cart_id,fk_sku_no),
	CONSTRAINT FK__cart_line__fk_ca__753864A1 FOREIGN KEY (fk_cart_id) REFERENCES tb_cart(id) ON DELETE CASCADE,
	CONSTRAINT FK__cart_line__fk_sk__762C88DA FOREIGN KEY (fk_sku_no) REFERENCES sku(sku_no) ON DELETE CASCADE
);


-- inventory_management.dbo.detail_purchase definition

-- Drop table

-- DROP TABLE inventory_management.dbo.detail_purchase;

CREATE TABLE detail_purchase (
	quantity int NOT NULL,
	unit_price decimal(18,2) NOT NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	fk_purchase_id int NOT NULL,
	fk_sku_no nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__detail_p__F2464CC6B19ADA10 PRIMARY KEY (fk_purchase_id,fk_sku_no),
	CONSTRAINT FK__detail_pu__fk_pu__7908F585 FOREIGN KEY (fk_purchase_id) REFERENCES tb_purchase(id) ON DELETE CASCADE,
	CONSTRAINT FK__detail_pu__fk_sk__79FD19BE FOREIGN KEY (fk_sku_no) REFERENCES sku(sku_no) ON DELETE CASCADE
);


-- inventory_management.dbo.order_line_item definition

-- Drop table

-- DROP TABLE inventory_management.dbo.order_line_item;

CREATE TABLE order_line_item (
	quantity int NOT NULL,
	price_per_unit decimal(18,2) NOT NULL,
	unit_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	sub_total decimal(18,2) NOT NULL,
	create_time datetimeoffset NOT NULL,
	update_time datetimeoffset NOT NULL,
	fk_order_id int NOT NULL,
	fk_sku_no nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__order_li__AD9711DD7D6632F4 PRIMARY KEY (fk_order_id,fk_sku_no),
	CONSTRAINT FK__order_lin__fk_or__7CD98669 FOREIGN KEY (fk_order_id) REFERENCES tb_order(id) ON DELETE CASCADE,
	CONSTRAINT FK__order_lin__fk_sk__7DCDAAA2 FOREIGN KEY (fk_sku_no) REFERENCES sku(sku_no) ON DELETE CASCADE
);