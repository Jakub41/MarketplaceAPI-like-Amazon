CREATE TABLE public.product
(
    _id serial,
    name character varying(35),
    description character varying(50),
    brand character varying(40),
    "imageUrl" character varying(500),
    price numeric,
    category character varying(20),
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    PRIMARY KEY (_id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.product
    OWNER to postgres;


CREATE TABLE public.reviews
(
    _id serial,
    comment character varying(100),
    rate integer,
    "productId" character varying(80),
    "createdAt" timestamp without time zone
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.reviews
    OWNER to postgres;
