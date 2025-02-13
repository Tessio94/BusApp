CREATE TABLE buses (
    id SERIAL PRIMARY KEY,
    bus_name VARCHAR NOT NULL,
    details TEXT NOT NULL,
    total_seats INTEGER NOT NULL,
    stoppages TEXT[] NOT NULL,
    fare DECIMAL(10, 2) NOT NULL,
    start_time TIME NOT NULL,
    speed INTEGER NOT NULL,
    service VARCHAR(50) NOT NULL,
    routes VARCHAR
);

CREATE TABLE journey (
    id SERIAL PRIMARY KEY,
    bus_name VARCHAR NOT NULL,
    origin VARCHAR NOT NULL,
    destination VARCHAR NOT NULL,
    doj VARCHAR NOT NULL,
    passenger_name VARCHAR NOT NULL,
    seat_no VARCHAR NOT NULL,
    mobile_no VARCHAR NOT NULL,
    email VARCHAR,
    stoppages TEXT[] NOT NULL,
    fare DECIMAL(10, 2) NOT NULL,
    start_time TIME NOT NULL, 
    paymentID VARCHAR,
    payment_status BOOLEAN
);
  
CREATE TYPE stop AS (
    name VARCHAR(100),
    distance_from_last INTEGER
);

CREATE TABLE bus_routes (
    id SERIAL PRIMARY KEY,
    route_name VARCHAR(255) NOT NULL,
    distance stop[]
);

INSERT INTO bus_routes (route_name, distance) VALUES ('CRO94_ZD2DB',  ARRAY[
    ROW('Zadar', 0)::stop,
    ROW('Šibenik', 88)::stop,
    ROW('Trogir', 56)::stop,
    ROW('Split', 27)::stop,
    ROW('Makarska', 86)::stop,
    ROW('Ploče', 53)::stop,
    ROW('Ston', 53)::stop,
    ROW('Dubrovnik', 54)::stop,
]);

INSERT INTO bus_routes (route_name, distance) VALUES ('CRO95_DB2ZD',  ARRAY[
    ROW('Dubrovnik', 0)::stop,
    ROW('Ston', 54)::stop,
    ROW('Ploče', 53)::stop,
    ROW('Makarska', 53)::stop,
    ROW('Split', 86)::stop,
    ROW('Trogir', 27)::stop,
    ROW('Šibenik', 56)::stop,
    ROW('Zadar', 88)::stop,
]);

INSERT INTO bus_routes (route_name, distance) VALUES ('CRO25_ZD2ZG',  ARRAY[
    ROW('Zadar', 0)::stop,
    ROW('Gospić', 122)::stop,
    ROW('Otočac', 57)::stop,
    ROW('Karlovac', 109)::stop,
    ROW('Zagreb', 55)::stop
]);

INSERT INTO bus_routes (route_name, distance) VALUES ('CRO25_ZG2ZD',  ARRAY[
    ROW('Zagreb', 0)::stop,
    ROW('Karlovac', 55)::stop,
    ROW('Otočac', 109)::stop,
    ROW('Gospić', 57)::stop,
    ROW('Zadar', 122)::stop,
]);

----------Busevi Zadar - Dubrovnik-----------
INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Croatia Travels',
    'Non A/C Seater Pushback 2+1',
    36,
    ARRAY['Zadar', 'Šibenik', 'Trogir', 'Split', 'Makarska', 'Ploče', 'Ston', 'Dubrovnik'],
    1.44,
    '20:00',
    41,
    'night',
    'CRO94_ZD2DB'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Dalmacija ASTC',
    'Volvo A/C Pushback 2+2',
    48,
    ARRAY['Zadar', 'Šibenik', 'Trogir', 'Split', 'Makarska', 'Ploče', 'Ston'],
    13.99,
    '08:30',
    110,
    'day',
    'CRO94_ZD2DB'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Slavonija Bus',
    'Benz A/C 2+1 Seater',
    36,
    ARRAY['Šibenik', 'Trogir', 'Split', 'Makarska', 'Ploče', 'Ston', 'Dubrovnik'],
    14.99,
    '07:30',
    110,
    'day',
    'CRO94_ZD2DB'
);


-- obrnuti smjer---
INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Croatia Travels',
    'Non A/C Seater Pushback 2+1',
    36,
    ARRAY['Dubrovnik','Ston', 'Ploče', 'Makarska', 'Split', 'Trogir', 'Šibenik', 'Zadar'],
    15.99,
    '20:00',
    120,
    'night',
    'CRO94_DB2ZD'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Dalmacija ASTC',
    'Volvo A/C Pushback 2+2',
    48,
    ARRAY['Ston', 'Ploče', 'Makarska', 'Split', 'Trogir', 'Šibenik', 'Zadar'],
    13.99,
    '20:00',
    110,
    'day',
    'CRO94_DB2ZD'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Slavonija Bus',
    'Benz A/C 2+1 Seater',
    36,
    ARRAY['Dubrovnik','Ston', 'Ploče', 'Makarska', 'Split', 'Trogir', 'Šibenik'],
    14.99,
    '07:30',
    110,
    'day',
    'CRO94_DB2ZD'
);

----------Busevi Zadar - Zagreb-----------
INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Croatia Travels',
    'Non A/C Seater Pushback 2+1',
    36,
    ARRAY['Zadar', 'Gospić', 'Otočac', 'Karlovac', 'Zagreb'],
    15.99,
    '07:30',
    120,
    'day',
    'CRO25_ZD2ZG'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Bili Brig Travels',
    'Non A/C Seater Pushback 2+2',
    48,
    ARRAY['Zadar', 'Gospić', 'Otočac', 'Karlovac', 'Zagreb'],
    16.99,
    '07:30',
    130,
    'day',
    'CRO25_ZD2ZG'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Banine Travels',
    'Benz A/C 2+1',
    36,
    ARRAY['Zadar', 'Gospić', 'Otočac', 'Karlovac', 'Zagreb'],
    13.99,
    '21:00',
    130,
    'night',
    'CRO25_ZD2ZG'
);

-----obrnuti smjer----

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Croatia Travels',
    'Non A/C Seater Pushback 2+1',
    36,
    ARRAY['Zagreb', 'Karlovac', 'Otočac', 'Gospić', 'Zadar'],
    0.05,
    '07:30',
    120,
    'day',
    'CRO25_ZG2ZD'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Bili Brig Travels',
    'Non A/C Seater Pushback 2+2',
    48,
    ARRAY['Zagreb', 'Karlovac', 'Otočac', 'Gospić', 'Zadar'],
    0.05,
    '07:30',
    120,
    'day',
    'CRO25_ZG2ZD'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Banine Travels',
    'Benz A/C 2+1',
    36,
    ARRAY['Zagreb', 'Karlovac', 'Otočac', 'Gospić', 'Zadar'],
    0.06,
    '21:00',
    130,
    'night',
    'CRO25_ZG2ZD'
);

SELECT seat_no, bus_name FROM journey WHERE doj = '2024-09-02' AND 'Nagaon' = ANY(stoppages) OR 'Dibrugarh' = ANY(stoppages) AND array_position(stoppages, 'Nagaon') < array_position(stoppages, 'Dibrugarh');

SELECT seat_no FROM journey WHERE doj = '2024-09-02' AND 'Nagaon' = ANY(stoppages) AND 'Dibrugarh' = ANY(stoppages) AND array_position(stoppages, 'Nagaon') < array_position(stoppages, 'Dibrugarh') AND bus_name = 'Network Travels';



 WITH stop_data AS ( --This part creates a temporary result set (stop_data) which
      SELECT        --Retrieves the route_name and the stops along the route from the bus_routes table.
        route_name,
        (stop_data).name AS stop_name,
        ROW_NUMBER() OVER () AS stop_index --For each stop, it assigns a unique index (ROW_NUMBER() OVER () AS stop_index), and extracts the stop's name ((stop_data).name AS stop_name).
      FROM bus_routes, 
      UNNEST(distance) AS stop_data --UNNEST(distance) is used to "explode" the distance array (which holds the stops with their respective distances) into individual rows.
      WHERE route_name = $3 --the route_name is also used in the query to ensure the stops belong to the specified route.
    )
      SELECT array_agg(stop_name) --This part aggregates the stop names between the origin and destination into an array.
      FROM stop_data
      WHERE stop_index >= ( --It finds the stop_index for the origin stop and ensures that only stops from the origin (inclusive) onwards are selected.
        SELECT stop_index
        FROM stop_data
        WHERE stop_name = $1
        LIMIT 1
    )
    AND stop_index < ( --It limits the stops to those that come before the destination (exclusive), i.e., only stops between origin and destination are included.
      SELECT stop_index
      FROM stop_data
      WHERE stop_name = $2
      LIMIT 1
    );