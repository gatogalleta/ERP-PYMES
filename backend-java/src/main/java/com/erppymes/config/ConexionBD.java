package com.erppymes.config;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConexionBD {

    private static final String ARCHIVO_CONFIGURACION = "db.properties";

    public static Connection conectar() {

        Properties propiedades = new Properties();

        try (InputStream archivo =
                     ConexionBD.class.getClassLoader()
                             .getResourceAsStream(ARCHIVO_CONFIGURACION)) {

            if (archivo == null) {
                System.out.println("No se encontró el archivo db.properties.");
                return null;
            }

            propiedades.load(archivo);

            String url = propiedades.getProperty("db.url");
            String usuario = propiedades.getProperty("db.username");
            String password = propiedades.getProperty("db.password");

            Connection conexion = DriverManager.getConnection(
                    url,
                    usuario,
                    password
            );

            System.out.println("Conexión a la base de datos exitosa.");

            return conexion;

        } catch (IOException e) {

            System.out.println(
                    "Error al leer la configuración de la base de datos."
            );

            System.out.println("Detalle: " + e.getMessage());

        } catch (SQLException e) {

            System.out.println(
                    "Error al conectar con la base de datos."
            );

            System.out.println("Detalle: " + e.getMessage());
        }

        return null;
    }
}