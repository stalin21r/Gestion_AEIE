SELECT 
"Casillero"."id" AS "Casillero_id", 
"Casillero"."numero" AS "Casillero_numero", 
"Casillero"."ocupado" AS "Casillero_ocupado", 
"Casillero"."propietario" AS "Casillero_propietario", 
"Casillero"."correo" AS "Casillero_correo", 
"Casillero"."telefono" AS "Casillero_telefono", 
"Casillero"."registrado_por" AS "Casillero_registrado_por", 
"Casillero"."bloque" AS "Casillero_bloque" 
FROM "private"."casilleros" "Casillero" 
WHERE (("Casillero"."id" = $1)) LIMIT 1 -- PARAMETERS: ["clear-bloque"]
 
 select * from private.casilleros c order by id;
 
 select * from private.bloque b ;
 
 select * from private.casilleros c where c.id = 21;
 
 
 select * from private.asistencia a ;
 
 select * from public.vista_asistencias va ;
 
truncate private.productos;

CREATE TABLE private.external_services (
    id SERIAL PRIMARY KEY,
    service_name TEXT NOT NULL,
    token TEXT NOT NULL
);

Select token from private.external_services where service_name = 'IMGUR_ACCESS_TOKEN';

select token from private.external_services es where es.service_name = 'IMGUR_ACESS_TOKEN';



ALTER TABLE private.casilleros
ADD COLUMN comprobante bytea NULL;



SELECT pg_column_size(t.*) AS size_in_bytes 
FROM private.casilleros t 
WHERE id = 140;

select * from private.productos p ;

SELECT pg_column_size(t.*) AS size_in_bytes 
FROM private.productos t 
WHERE id = 2;

------------------------------------------------------------------------------------------------------
CREATE DATABASE aeie_gestor;

\c aeie_gestor;

CREATE SCHEMA private;

---TABLAS

-- Tabla de usuarios
CREATE TABLE private.usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    rol BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla de turnos
CREATE TABLE private.turnos (
    id SERIAL PRIMARY KEY,
    usuario INTEGER REFERENCES private.usuarios(id) ON DELETE CASCADE,
    dia INTEGER CHECK (dia BETWEEN 1 AND 5),
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);

-- Tabla de asistencia
CREATE TABLE private.asistencia (
    id SERIAL PRIMARY KEY,
    usuario INTEGER REFERENCES private.usuarios(id) ON DELETE CASCADE,
    dia DATE NOT NULL,
    hora_llegada TIME,
    hora_salida TIME
);

-- Tabla de productos-categorias
CREATE TABLE private.productos_categorias (
    id SERIAL PRIMARY KEY,
    categoria VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla de productos
CREATE TABLE private.productos (
	id serial4 NOT NULL,
	nombre varchar(50) NOT NULL,
	precio numeric(10, 2) NOT NULL,
	categoria int4 NULL,
	imagen text NULL,
	delete_hash text NULL,
	CONSTRAINT productos_pkey PRIMARY KEY (id),
	CONSTRAINT productos_categoria_fkey FOREIGN KEY (categoria) REFERENCES private.productos_categorias(id) ON DELETE CASCADE
);

-- Tabla de bloque
CREATE TABLE private.bloque (
    id SERIAL PRIMARY KEY,
    letra CHAR(1) UNIQUE NOT NULL
);

-- Tabla de casilleros
CREATE TABLE private.casilleros (
	id serial4 NOT NULL,
	bloque int4 NULL,
	numero int4 NOT NULL,
	ocupado bool DEFAULT false NULL,
	propietario varchar(50) NULL,
	correo varchar(100) NULL,
	telefono varchar(10) NULL,
	registrado_por text NULL,
	comprobante bytea NULL,
	CONSTRAINT casilleros_pkey PRIMARY KEY (id),
	CONSTRAINT casilleros_bloque_fkey FOREIGN KEY (bloque) REFERENCES private.bloque(id) ON DELETE CASCADE
);

--insert de categorias de productos
INSERT INTO private.productos_categorias (categoria)
VALUES
    ('Snacks'),
    ('Bebidas'),
    ('Comida'),
    ('Helados'),
    ('Alquileres'),
    ('Electrónica'),
	('Juegos');


---INSTALACION DE PLPERL EN LA BD
--SELECT * FROM pg_available_extensions WHERE name = 'plperl';
--CREATE EXTENSION plperl; --comando para instalar
--SELECT lanname FROM pg_language;

---FUNCIONES

--Funcion para crear bloques de casilleros
-- DROP FUNCTION private.crear_bloque_y_casilleros(bool);

CREATE OR REPLACE FUNCTION private.crear_bloque_y_casilleros(de_derecha_a_izquierda boolean)
 RETURNS integer
 LANGUAGE plperl
AS $function$
    eval {
        my ($de_derecha_a_izquierda) = @_;
        my $letra;
        my $nuevo_bloque_id;
        my $rows = 4;
        my $columns = 5;

        # Obtener la letra del nuevo bloque
        my $sth = spi_exec_query("SELECT MAX(letra::TEXT) as letra FROM private.bloque");
        $letra = $sth->{rows}->[0]->{letra};
        $letra = ($letra eq '') ? 'A' : chr(ord($letra) + 1);

        # Insertar el nuevo bloque
        $sth = spi_exec_query("INSERT INTO private.bloque (letra) VALUES ('$letra') RETURNING id");
        $nuevo_bloque_id = $sth->{rows}->[0]->{id};

        # Crear casilleros
        if ($de_derecha_a_izquierda eq 't') {
            for (my $i = 1; $i <= ($rows * $columns); $i++) {
                elog(INFO, $i);
                spi_exec_query("INSERT INTO private.casilleros (bloque, numero) VALUES ($nuevo_bloque_id, $i)");
            }
        } else {
            for (my $i = 1; $i <= $rows; $i++) {
                for (my $j = 0; $j < $columns; $j++) {
                    my $num = $i + $j * $rows;
                    elog(INFO, $num);
                    spi_exec_query("INSERT INTO private.casilleros (bloque, numero) VALUES ($nuevo_bloque_id, $num)");
                }
            }
        }
        return 1;
    } or do {
        my $error = $@ || 'Unknown error';
        elog(ERROR, "Error al crear bloque y casilleros: $error");
        return 0;
    };
$function$
;


--Funcion para loggear usuario
CREATE OR REPLACE FUNCTION private.login_usuario(usuario_input text)
 RETURNS TABLE(id integer, contrasena character varying, nombre character varying, apellido character varying, rol boolean)
 LANGUAGE plperl
 SECURITY DEFINER
AS $function$
	use strict;
	use warnings;
    my $usuario_input = $_[0];
    my $query = "
        SELECT id, contrasena, nombre, apellido, rol
        FROM private.usuarios
        WHERE correo = '$usuario_input' OR usuario = '$usuario_input';
    ";
	
	my $sth = spi_query($query);
	
	while (defined (my $row = spi_fetchrow ($sth))) {
		return_next ($row);
	}	
	
	return;
    
$function$
;



---VISTAS

--Vista Turnos
CREATE VIEW public.vista_turnos AS
SELECT 
    t.id,
    u.nombre,
    u.apellido,
    CASE
        WHEN dia = 1 THEN 'Lunes'
        WHEN dia = 2 THEN 'Martes'
        WHEN dia = 3 THEN 'Miércoles'
        WHEN dia = 4 THEN 'Jueves'
        WHEN dia = 5 THEN 'Viernes'
    END AS dia,
    t.hora_inicio,
    t.hora_fin
FROM private.turnos t
INNER JOIN private.usuarios u ON t.usuario = u.id;

--Vista Asistencias
create view public.vista_asistencias as
select 
	a.id, 
	a.usuario, 
	u.nombre, 
	u.apellido, 
	a.dia, 
	a.hora_llegada, 
	a.hora_salida  
from private.asistencia a 
inner join private.usuarios u on a.usuario = u.id;
