CREATE DATABASE notas_personales;

USE notas_personales;

CREATE TABLE notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(50) NOT NULL,
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    cuerpo TEXT NOT NULL,
    clasificacion ENUM('personal', 'laboral', 'escolar', 'otros') NOT NULL
);