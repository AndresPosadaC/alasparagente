const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors"); // Import the cors middleware
const { validationResult, check } = require("express-validator");
const path = require("path"); // Import the path module

const app = express();

app.use(
  cors({
    // origin: "http://172.20.10.4:3000",
    origin: "http://192.168.10.14:3000",
    // origin: "http://192.168.0.12:3000",
    // origin: "http://192.168.0.7:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "S4nAndr3$P0",
  database: "alasparagente",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    res
      .status(500)
      .json({ error: "Error connecting to the database", details: err });
    return;
  }
  console.log("Connected to the database");
});

const useApiGet = (app, url, tableName, hasVoidedColumn = true) => {
  // Handle preflight requests
  app.options(url, cors());

  app.get(url, (req, res) => {
    let query = `SELECT * FROM alasparagente.${tableName}`;
    if (hasVoidedColumn) {
      query += ` WHERE voided = '0'`;
    }

    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error executing query: ", error);
        res
          .status(500)
          .json({ error: "Error fetching data from database", details: error });
        return;
      }
      // res.header("Access-Control-Allow-Origin", "http://172.20.10.4:3000");
      res.header("Access-Control-Allow-Origin", "http://192.168.10.14:3000");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE"
      );
      res.json(results);
    });
  });
};

// Usage of the custom hook for GET requests
useApiGet(app, "/api/users_json", "users");
useApiGet(app, "/api/medinvima_json", "medinvima");
useApiGet(app, "/api/med_store_json", "med_store");
useApiGet(app, "/api/medlist_json", "medlist", false);
useApiGet(app, "/api/brigadas_json", "brigadas");
useApiGet(app, "/api/med_movimientos_json", "med_movimientos");
useApiGet(app, "/api/med_brigada_json", "med_brigada", false);
useApiGet(app, "/api/patients_json", "patients", false);
useApiGet(app, "/api/pavanzada_json", "pavanzada"); // nueva estructura
useApiGet(app, "/api/ptriage_json", "ptriage"); // nueva estructura
useApiGet(app, "/api/optometry_json", "optometry");
useApiGet(app, "/api/farma_json", "farma");
useApiGet(app, "/api/generalmed_json", "generalmed");
useApiGet(app, "/api/odontology_json", "odontology");
useApiGet(app, "/api/asigna_json", "asigna");
useApiGet(app, "/api/pasignados_json", "pasignados", false);
useApiGet(app, "/api/odontograma_json", "odontograma");
useApiGet(app, "/api/tratamientodonto_json", "tratamientodonto");
//useApiGet(app, "/api/pruebas_json", "pruebas");

app.use(express.static(path.join(__dirname, "build"))); // Serve static files from the build directory

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html")); // Serve index.html for any route
});

// Middleware to validate the POST data
const validatePostData = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Create a new pruebas

// Create a new medinvima
app.post(
  "/api/medinvima_json",
  [
    check("principio_activo")
      .notEmpty()
      .withMessage("Nombre de principio activo requerido"),
    check("forma").notEmpty().withMessage("Empaque requerido"),
    check("concentracion").notEmpty().withMessage("Concentración es requerido"),
    check("presentacion").notEmpty().withMessage("Presentación es requerido"),
    check("unidad_medida").notEmpty().withMessage("unidad de medida requerida"),
    check("lote").notEmpty().withMessage("Lote requerido"),
  ],

  validatePostData,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      voided,
      date_received,
      principio_activo,
      forma,
      concentracion,
      presentacion,
      unidad_medida,
      registro_invima,
      lote,
      vencimiento,
      observaciones,
    } = req.body;

    const query =
      "INSERT INTO alasparagente.medinvima (voided, fecha_R, principio_activo, forma, concentracion, presentacion, unidad_medida , registro_invima, lote, vencimiento, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [
        voided,
        date_received,
        principio_activo,
        forma,
        concentracion,
        presentacion,
        unidad_medida,
        registro_invima,
        lote,
        vencimiento,
        observaciones,
      ],
      (error, results) => {
        if (error) {
          console.error("Error executing query: ", error);
          return res
            .status(500)
            .json({ error: "Error cargando nuevo movimiento de medicamento." });
        }

        // Respond with the newly created Medicine_Invima data
        res.status(201).json({
          id: results.insertId,
          voided,
          date_received,
          principio_activo,
          forma,
          concentracion,
          presentacion,
          unidad_medida,
          registro_invima,
          lote,
          vencimiento,
          observaciones,
        });
      }
    );
  }
);

// Create a new Brigada
app.post(
  "/api/brigadas_json",
  [
    check("location_b")
      .notEmpty()
      .withMessage("El nombre de la Brigada es requerido"),
  ],
  validatePostData,
  (req, res) => {
    const { voided, location_b } = req.body;

    if (!location_b) {
      return res
        .status(400)
        .json({ error: "Se requiere el nombre de la Brigada" });
    }

    const date_brigada = new Date(); // Get the current date and time

    const query =
      "INSERT INTO alasparagente.brigadas (voided, date_brigada, location_b) VALUES (?, ?, ?)";

    connection.query(
      query,
      [voided, date_brigada, location_b],
      (error, results) => {
        if (error) {
          console.error("Error executing query: ", error);
          return res
            .status(500)
            .json({ error: "Error cargando nueva Brigada." });
        }

        // Respond with the newly created Brigada data
        res.status(201).json({
          id_brigada: results.insertId,
          voided,
          date_brigada,
          location_b,
        });
      }
    );
  }
);

// Create a new medicine movement
app.post(
  "/api/med_movimientos_json",
  [
    check("brigada")
      .notEmpty()
      .withMessage("El nombre de la brigada es requerido"),
    check("medicine")
      .notEmpty()
      .withMessage("Nombre de principio activo requerido"),
    check("origen")
      .notEmpty()
      .withMessage("Almacén de origen del movimiento es requerido"),
    check("destination")
      .notEmpty()
      .withMessage("Almacén de destino del movimiento es requerido"),
    check("quantity")
      .isInt({ min: 1 })
      .withMessage("Ingrese una cantidad válida para registrar el movimiento"),
  ],
  validatePostData,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { voided, brigada, medicine, origen, destination, quantity } =
      req.body;

    const date_mov = new Date(); // Get the current date and time

    const query =
      "INSERT INTO alasparagente.med_movimientos (voided, date_mov, brigada, medicine, origen, destination, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [voided, date_mov, brigada, medicine, origen, destination, quantity],
      (error, results) => {
        if (error) {
          console.error("Error executing query: ", error);
          return res
            .status(500)
            .json({ error: "Error cargando nuevo movimiento de medicamento." });
        }

        // Respond with the newly created medicine data
        res.status(201).json({
          id_mov: results.insertId,
          voided,
          date_mov,
          brigada,
          medicine,
          origen,
          destination,
          quantity,
        });
      }
    );
  }
);

// Create a new pavanzada
app.post(
  "/api/pavanzada_json",
  [
    check("id_num_doc")
      .notEmpty()
      .withMessage("El número de documento de identiidad es requerido"),
    check("tipo_doc")
      .notEmpty()
      .withMessage("El tipo de documento de identidad es requerido"),
    check("nombres").notEmpty().withMessage("Nombre del paciente es requerido"),
    check("apellidos")
      .notEmpty()
      .withMessage("Apellido del paciente es requerido"),
    check("nacimiento")
      .notEmpty()
      .withMessage("Fecha de nacimiento del paciente es requerido"),
    check("celular")
      .notEmpty()
      .withMessage("Celular del paciente es requerido"),
  ],
  validatePostData,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      voided,
      id_num_doc,
      tipo_doc,
      nombres,
      apellidos,
      nacimiento,
      edad,
      estado_civil,
      sexo,
      celular,
      responsable,
      parentesco_responsable,
      etnia,
      aseguradora,
      tipo_vinculacion,
    } = req.body;

    const fecha_registro = new Date(); // Get the current date and time

    const query =
      "INSERT INTO alasparagente.pavanzada (voided, fecha_registro, id_num_doc, tipo_doc, nombres, apellidos, nacimiento, edad, estado_civil, sexo, celular, responsable, parentesco_responsable, etnia, aseguradora, tipo_vinculacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [
        voided,
        fecha_registro,
        id_num_doc.trim(),
        tipo_doc.trim(),
        nombres.trim(),
        apellidos.trim(),
        nacimiento,
        edad,
        estado_civil.trim(),
        sexo.trim(),
        celular.trim(),
        responsable ? responsable.trim() : null,
        parentesco_responsable ? parentesco_responsable.trim() : null,
        etnia ? etnia.trim() : null,
        aseguradora.trim(),
        tipo_vinculacion.trim(),
      ],
      (error, results) => {
        if (error) {
          console.error("Error ejecutando la query: ", error);
          return res
            .status(500)
            .json({ error: "Error cargando nuevo paciente." });
        }

        // Respond with the newly created Pacientes data
        res.status(201).json({
          id_cnt: results.insertId,
          voided,
          fecha_registro,
          id_num_doc,
          tipo_doc,
          nombres,
          apellidos,
          nacimiento,
          edad,
          estado_civil,
          sexo,
          celular,
          responsable,
          parentesco_responsable,
          etnia,
          aseguradora,
          tipo_vinculacion,
        });
      }
    );
  }
);

// Create a new ptriage
app.post(
  "/api/ptriage_json",
  [
    check("id_num_doc")
      .notEmpty()
      .withMessage("El número de documento de identiidad es requerido"),
    check("frec_cardiaca")
      .isInt({ min: 20 })
      .withMessage("La frecuencia cardiaca es requerida"),
    check("tension_arterial")
      .notEmpty()
      .withMessage("La tensión arterial es requerida"),
    check("frec_respiratoria")
      .isInt({ min: 1 })
      .withMessage("La frecuencia respiratoria es requerida"),
    check("sat_o2")
      .isInt({ min: 10 })
      .withMessage("La saturación de oxígeno es requerida"),
    check("temperatura")
      .isInt({ min: 20 })
      .withMessage("La temperatura es requerida"),
  ],
  validatePostData,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      voided,
      id_num_doc,
      frec_cardiaca,
      tension_arterial,
      frec_respiratoria,
      sat_o2,
      temperatura,
      peso,
      talla,
      dolor,
      valoracion,
    } = req.body;

    const fecha_registro = new Date(); // Get the current date and time

    const query =
      "INSERT INTO alasparagente.ptriage (voided, fecha_registro, id_num_doc, frec_cardiaca, tension_arterial, frec_respiratoria, sat_o2, temperatura, peso, talla, dolor, valoracion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [
        voided,
        fecha_registro,
        id_num_doc.trim(),
        frec_cardiaca,
        tension_arterial,
        frec_respiratoria,
        sat_o2,
        temperatura,
        peso,
        talla,
        dolor,
        valoracion,
      ],
      (error, results) => {
        if (error) {
          console.error("Error ejecutando la query: ", error);
          return res
            .status(500)
            .json({ error: "Error cargando nuevo paciente." });
        }

        // Respond with the newly created Pacientes data
        res.status(201).json({
          id_cnt: results.insertId,
          voided,
          fecha_registro,
          id_num_doc,
          frec_cardiaca,
          tension_arterial,
          frec_respiratoria,
          sat_o2,
          temperatura,
          peso,
          talla,
          dolor,
          valoracion,
        });
      }
    );
  }
);

// Create a new asigna
app.post(
  "/api/asigna_json",
  [
    check("id_num_doc")
      .notEmpty()
      .withMessage("El número de documento de identiidad es requerido"),
    check("location_b")
      .notEmpty()
      .withMessage("La brigada donde será atendido es requerida"),
    check("especialidad")
      .notEmpty()
      .withMessage("La especialidad para atender es requerida"),
  ],
  validatePostData,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { voided, id_num_doc, location_b, especialidad, motivo_consulta } =
      req.body;

    const fecha_asigna = new Date(); // Get the current date and time

    const query =
      "INSERT INTO alasparagente.asigna (voided, id_num_doc, location_b, especialidad, motivo_consulta, fecha_asigna) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [
        voided,
        id_num_doc.trim(),
        location_b.trim(),
        especialidad.trim(),
        motivo_consulta.trim(),
        fecha_asigna,
      ],
      (error, results) => {
        if (error) {
          console.error("Error ejecutando la query: ", error);
          return res
            .status(500)
            .json({ error: "Error cargando nuevo paciente." });
        }

        // Respond with the newly created Pacientes data
        res.status(201).json({
          id_cnt: results.insertId,
          voided,
          id_num_doc,
          location_b,
          especialidad,
          motivo_consulta,
          fecha_asigna,
        });
      }
    );
  }
);

// Create a new optometry
app.post(
  "/api/optometry_json",
  [
    check("lensometria_od").notEmpty().withMessage("Espacio requerido"),
    check("lensometria_oi").notEmpty().withMessage("Espacio requerido"),
    check("tonometria_od").notEmpty().withMessage("Espacio requerido"),
    check("tonometria_oi").notEmpty().withMessage("Espacio requerido"),
    check("cover_test").notEmpty().withMessage("Espacio requerido"),
    check("cover_test_6m").notEmpty().withMessage("Espacio requerido"),
    check("cover_test_30cm").notEmpty().withMessage("Espacio requerido"),
    check("oftalmoscopia_od").notEmpty().withMessage("Espacio requerido"),
    check("oftalmoscopia_oi").notEmpty().withMessage("Espacio requerido"),
    check("queratometria_od").notEmpty().withMessage("Espacio requerido"),
    check("queratometria_oi").notEmpty().withMessage("Espacio requerido"),
    check("test_color").notEmpty().withMessage("Espacio requerido"),
    check("estereopsis").notEmpty().withMessage("Espacio requerido"),
    check("retinoscopia_od").notEmpty().withMessage("Espacio requerido"),
    check("retinoscopia_od_avvl").notEmpty().withMessage("Espacio requerido"),
    check("retinoscopia_od_avvp").notEmpty().withMessage("Espacio requerido"),
    check("retinoscopia_oi").notEmpty().withMessage("Espacio requerido"),
    check("retinoscopia_oi_avvl").notEmpty().withMessage("Espacio requerido"),
    check("retinoscopia_oi_avvp").notEmpty().withMessage("Espacio requerido"),
    check("subjetivo_od").notEmpty().withMessage("Espacio requerido"),
    check("subjetivo_od_av").notEmpty().withMessage("Espacio requerido"),
    check("subjetivo_od_add").notEmpty().withMessage("Espacio requerido"),
    check("subjetivo_oi").notEmpty().withMessage("Espacio requerido"),
    check("subjetivo_oi_av").notEmpty().withMessage("Espacio requerido"),
    check("subjetivo_oi_add").notEmpty().withMessage("Espacio requerido"),
    check("impresion_diagnostica").notEmpty().withMessage("Espacio requerido"),
    check("cie10").notEmpty().withMessage("Espacio requerido"),
    check("conducta").notEmpty().withMessage("Espacio requerido"),
    check("formula_final_od").notEmpty().withMessage("Espacio requerido"),
    check("formula_final_od_add").notEmpty().withMessage("Espacio requerido"),
    check("formula_final_od_dp").notEmpty().withMessage("Espacio requerido"),
    check("formula_final_oi").notEmpty().withMessage("Espacio requerido"),
    check("formula_final_oi_add").notEmpty().withMessage("Espacio requerido"),
    check("formula_final_oi_dp").notEmpty().withMessage("Espacio requerido"),
    check("tipo").notEmpty().withMessage("Espacio requerido"),
    check("medicamentos").notEmpty().withMessage("Espacio requerido"),
    check("uso").notEmpty().withMessage("Espacio requerido"),
    check("control").notEmpty().withMessage("Espacio requerido"),
  ],
  validatePostData,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      voided,
      id_num_doc,
      mala_vision_lejos,
      mala_vision_cerca,
      ojo_rojo,
      prurito_ocular,
      dolor,
      hiperemia,
      lagrimeo,
      ardor_ocular,
      salto_renglon,
      cansancio_visual,
      caspa_parpados,
      otro,
      cual,
      diabetes,
      trauma_ocular,
      usa_correccion,
      hta,
      cirugia_ocular,
      cardiovasculares,
      vicios_reflaccion,
      artritis,
      ceguera,
      farmacos,
      otros,
      cuales,
      scvlod,
      scvloi,
      scvlao,
      ccvlod,
      ccvloi,
      ccvlao,
      lensometria_od,
      lensometria_oi,
      tonometria_od,
      tonometria_oi,
      cover_test,
      cover_test_6m,
      cover_test_30cm,
      oftalmoscopia_od,
      oftalmoscopia_oi,
      queratometria_od,
      queratometria_oi,
      test_color,
      estereopsis,
      retinoscopia_od,
      retinoscopia_od_avvl,
      retinoscopia_od_avvp,
      retinoscopia_oi,
      retinoscopia_oi_avvl,
      retinoscopia_oi_avvp,
      subjetivo_od,
      subjetivo_od_av,
      subjetivo_od_add,
      subjetivo_oi,
      subjetivo_oi_av,
      subjetivo_oi_add,
      impresion_diagnostica,
      cie10,
      conducta,
      formula_final_od,
      formula_final_od_add,
      formula_final_od_dp,
      formula_final_oi,
      formula_final_oi_add,
      formula_final_oi_dp,
      tipo,
      medicamentos,
      rx,
      uso,
      control,
    } = req.body;

    const fecha_registro = new Date(); // Get the current date and time

    const query =
      "INSERT INTO alasparagente.optometry (voided, id_num_doc, fecha_registro, mala_vision_lejos, mala_vision_cerca, ojo_rojo, prurito_ocular, dolor, hiperemia, lagrimeo, ardor_ocular, salto_renglon, cansancio_visual, caspa_parpados, otro, cual, diabetes, trauma_ocular, usa_correccion, hta, cirugia_ocular, cardiovasculares, vicios_reflaccion, artritis, ceguera, farmacos, otros, cuales, scvlod, scvloi, scvlao, ccvlod, ccvloi, ccvlao, lensometria_od, lensometria_oi, tonometria_od, tonometria_oi, cover_test, cover_test_6m, cover_test_30cm, oftalmoscopia_od, oftalmoscopia_oi, queratometria_od, queratometria_oi, test_color, estereopsis, retinoscopia_od, retinoscopia_od_avvl, retinoscopia_od_avvp, retinoscopia_oi, retinoscopia_oi_avvl, retinoscopia_oi_avvp, subjetivo_od, subjetivo_od_av, subjetivo_od_add, subjetivo_oi, subjetivo_oi_av, subjetivo_oi_add, impresion_diagnostica, cie10, conducta, formula_final_od, formula_final_od_add, formula_final_od_dp, formula_final_oi, formula_final_oi_add, formula_final_oi_dp, tipo, medicamentos, rx, uso, control) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [
        voided,
        id_num_doc,
        fecha_registro,
        mala_vision_lejos,
        mala_vision_cerca,
        ojo_rojo,
        prurito_ocular,
        dolor,
        hiperemia,
        lagrimeo,
        ardor_ocular,
        salto_renglon,
        cansancio_visual,
        caspa_parpados,
        otro,
        cual,
        diabetes,
        trauma_ocular,
        usa_correccion,
        hta,
        cirugia_ocular,
        cardiovasculares,
        vicios_reflaccion,
        artritis,
        ceguera,
        farmacos,
        otros,
        cuales,
        scvlod,
        scvloi,
        scvlao,
        ccvlod,
        ccvloi,
        ccvlao,
        lensometria_od,
        lensometria_oi,
        tonometria_od,
        tonometria_oi,
        cover_test,
        cover_test_6m,
        cover_test_30cm,
        oftalmoscopia_od,
        oftalmoscopia_oi,
        queratometria_od,
        queratometria_oi,
        test_color,
        estereopsis,
        retinoscopia_od,
        retinoscopia_od_avvl,
        retinoscopia_od_avvp,
        retinoscopia_oi,
        retinoscopia_oi_avvl,
        retinoscopia_oi_avvp,
        subjetivo_od,
        subjetivo_od_av,
        subjetivo_od_add,
        subjetivo_oi,
        subjetivo_oi_av,
        subjetivo_oi_add,
        impresion_diagnostica,
        cie10,
        conducta,
        formula_final_od,
        formula_final_od_add,
        formula_final_od_dp,
        formula_final_oi,
        formula_final_oi_add,
        formula_final_oi_dp,
        tipo,
        medicamentos,
        rx,
        uso,
        control,
      ],
      (error, results) => {
        if (error) {
          console.error("Error executing query: ", error);
          return res
            .status(500)
            .json({ error: "Error cargando nuevo paciente." });
        }

        // Respond with the newly created Pacientes data
        res.status(201).json({
          id_cnt: results.insertId,
          voided,
          id_num_doc,
          fecha_registro,
          mala_vision_lejos,
          mala_vision_cerca,
          ojo_rojo,
          prurito_ocular,
          dolor,
          hiperemia,
          lagrimeo,
          ardor_ocular,
          salto_renglon,
          cansancio_visual,
          caspa_parpados,
          otro,
          cual,
          diabetes,
          trauma_ocular,
          usa_correccion,
          hta,
          cirugia_ocular,
          cardiovasculares,
          vicios_reflaccion,
          artritis,
          ceguera,
          farmacos,
          otros,
          cuales,
          scvlod,
          scvloi,
          scvlao,
          ccvlod,
          ccvloi,
          ccvlao,
          lensometria_od,
          lensometria_oi,
          tonometria_od,
          tonometria_oi,
          cover_test,
          cover_test_6m,
          cover_test_30cm,
          oftalmoscopia_od,
          oftalmoscopia_oi,
          queratometria_od,
          queratometria_oi,
          test_color,
          estereopsis,
          retinoscopia_od,
          retinoscopia_od_avvl,
          retinoscopia_od_avvp,
          retinoscopia_oi,
          retinoscopia_oi_avvl,
          retinoscopia_oi_avvp,
          subjetivo_od,
          subjetivo_od_av,
          subjetivo_od_add,
          subjetivo_oi,
          subjetivo_oi_av,
          subjetivo_oi_add,
          impresion_diagnostica,
          cie10,
          conducta,
          formula_final_od,
          formula_final_od_add,
          formula_final_od_dp,
          formula_final_oi,
          formula_final_oi_add,
          formula_final_oi_dp,
          tipo,
          medicamentos,
          rx,
          uso,
          control,
        });
      }
    );
  }
);

// Create a new Farma
app.post(
  "/api/farma_json",
  [
    check("id_num_doc")
      .notEmpty()
      .withMessage("El ID del Paciente es requerido"),
    check("location_b")
      .notEmpty()
      .withMessage("El nombre de la Brigada es requerido"),
    check("medicine")
      .notEmpty()
      .withMessage("El nombre del Medicamento es requerido"),
    check("quantity")
      .isInt({ min: 1 })
      .withMessage("Ingrese una cantidad válida para registrar"),
  ],
  validatePostData,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { voided, id_num_doc, location_b, medicine, quantity } = req.body;

    const date_farma = new Date(); // Get the current date and time

    const query =
      "INSERT INTO alasparagente.farma (voided, id_num_doc, location_b, medicine, quantity, date_farma) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [voided, id_num_doc, location_b, medicine, quantity, date_farma],
      (error, results) => {
        if (error) {
          console.error("Error executing query: ", error);
          return res.status(500).json({
            error: "Error cargando a farmacia el medicamento solicitado.",
          });
        }

        // Respond with the newly created medicine data
        res.status(201).json({
          id_farma: results.insertId,
          voided,
          id_num_doc,
          location_b,
          medicine,
          quantity,
          date_farma,
        });
      }
    );
  }
);

// Create a new Generalmed
app.post(
  "/api/generalmed_json",
  [
    check("id_num_doc")
      .notEmpty()
      .withMessage("El ID del Paciente es requerido"),
  ],
  validatePostData,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      voided,
      especialidad,
      id_num_doc,
      paraclinicos,
      enfermedad_actual,
      gineco,
      gineco_gestaciones,
      gineco_partos,
      gineco_cesarias,
      gineco_abortos,
      gineco_vivos,
      alergias,
      med_alergias,
      med_antecedentes,
      transfusion_ant,
      quirurgicos_ant,
      alcohol_ant,
      fuma_ant,
      psicoactivas_ant,
      familia_ant,
      diagnostico,
      impresion_diagnostico,
      confirmado_diagnostico,
      cod_cie10,
      consulta_1vez,
      consulta_control,
      enfermedad_general,
      paciente_sano,
      maternidad,
      accidente_trabajo,
      enfermedad_profesional,
      plan,
      tratamiento,
      seguimiento,
      cual,
      remision,
      medicamentos,
    } = req.body;

    const fecha_registro = new Date(); // Get the current date and time

    const query =
      "INSERT INTO alasparagente.generalmed (voided, especialidad, id_num_doc, fecha_registro, paraclinicos, enfermedad_actual, gineco, gineco_gestaciones, gineco_partos, gineco_cesarias, gineco_abortos, gineco_vivos, alergias, med_alergias, med_antecedentes, transfusion_ant, quirurgicos_ant, alcohol_ant, fuma_ant, psicoactivas_ant, familia_ant, diagnostico, impresion_diagnostico, confirmado_diagnostico, cod_cie10, consulta_1vez, consulta_control, enfermedad_general, paciente_sano, maternidad, accidente_trabajo, enfermedad_profesional, plan, tratamiento, seguimiento, cual, remision, medicamentos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [
        voided,
        especialidad,
        id_num_doc,
        fecha_registro,
        paraclinicos,
        enfermedad_actual,
        gineco,
        gineco_gestaciones,
        gineco_partos,
        gineco_cesarias,
        gineco_abortos,
        gineco_vivos,
        alergias,
        med_alergias,
        med_antecedentes,
        transfusion_ant,
        quirurgicos_ant,
        alcohol_ant,
        fuma_ant,
        psicoactivas_ant,
        familia_ant,
        diagnostico,
        impresion_diagnostico,
        confirmado_diagnostico,
        cod_cie10,
        consulta_1vez,
        consulta_control,
        enfermedad_general,
        paciente_sano,
        maternidad,
        accidente_trabajo,
        enfermedad_profesional,
        plan,
        tratamiento,
        seguimiento,
        cual,
        remision,
        medicamentos,
      ],
      (error, results) => {
        if (error) {
          console.error("Error executing query: ", error);
          return res.status(500).json({
            error: "Error cargando a farmacia el medicamento solicitado.",
          });
        }

        // Respond with the newly created medicine data
        res.status(201).json({
          id_cnt: results.insertId,
          voided,
          especialidad,
          id_num_doc,
          fecha_registro,
          paraclinicos,
          enfermedad_actual,
          gineco,
          gineco_gestaciones,
          gineco_partos,
          gineco_cesarias,
          gineco_abortos,
          gineco_vivos,
          alergias,
          med_alergias,
          med_antecedentes,
          transfusion_ant,
          quirurgicos_ant,
          alcohol_ant,
          fuma_ant,
          psicoactivas_ant,
          familia_ant,
          diagnostico,
          impresion_diagnostico,
          confirmado_diagnostico,
          cod_cie10,
          consulta_1vez,
          consulta_control,
          enfermedad_general,
          paciente_sano,
          maternidad,
          accidente_trabajo,
          enfermedad_profesional,
          plan,
          tratamiento,
          seguimiento,
          cual,
          remision,
          medicamentos,
        });
      }
    );
  }
);

// Create a new Odontology
app.post(
  "/api/odontology_json",
  [
    check("id_num_doc")
      .notEmpty()
      .withMessage("El ID del Paciente es requerido"),
  ],
  validatePostData,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      voided,
      id_num_doc,
      fecha_ultima_visita,
      intolerancia_anestesia,
      medicacion_actual,
      alergias,
      convulsiones,
      diabetes,
      sinusitis,
      hepatitis,
      hipertension_arterial,
      hipotension_arterial,
      hematopoyetico,
      enf_infectocontagiosas,
      enf_cardiovasculares,
      enf_respiratorias,
      enf_endocrinas,
      fiebre_reumatoidea,
      cirugias,
      cual,
      otra_enfermedad,
      antecedentes,
      penicilina,
      otros_med,
      cuales,
      atm,
      ganglios,
      labios,
      lengua,
      paladar,
      piso_boca,
      glandula_salival,
      carrillos,
      fasetas_desgaste,
      fracturas,
      patologia_pulpar,
      patologia_tejidos,
      observaciones,
      frecuencia_cepillado,
      seda_dental,
      habitos,
      observaciones2,
      diagnostico,
      plan_tratamiento,
    } = req.body;

    const fecha_registro = new Date(); // Get the current date and time

    const query =
      "INSERT INTO alasparagente.odontology (voided, id_num_doc, fecha_registro, fecha_ultima_visita, intolerancia_anestesia, medicacion_actual, alergias, convulsiones, diabetes, sinusitis, hepatitis, hipertension_arterial, hipotension_arterial, hematopoyetico, enf_infectocontagiosas, enf_cardiovasculares, enf_respiratorias, enf_endocrinas, fiebre_reumatoidea, cirugias, cual, otra_enfermedad, antecedentes, penicilina, otros_med, cuales, atm, ganglios, labios, lengua, paladar, piso_boca, glandula_salival, carrillos, fasetas_desgaste, fracturas, patologia_pulpar, patologia_tejidos, observaciones, frecuencia_cepillado, seda_dental, habitos, observaciones2, diagnostico, plan_tratamiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [
        voided,
        id_num_doc,
        fecha_registro,
        fecha_ultima_visita,
        intolerancia_anestesia,
        medicacion_actual,
        alergias,
        convulsiones,
        diabetes,
        sinusitis,
        hepatitis,
        hipertension_arterial,
        hipotension_arterial,
        hematopoyetico,
        enf_infectocontagiosas,
        enf_cardiovasculares,
        enf_respiratorias,
        enf_endocrinas,
        fiebre_reumatoidea,
        cirugias,
        cual,
        otra_enfermedad,
        antecedentes,
        penicilina,
        otros_med,
        cuales,
        atm,
        ganglios,
        labios,
        lengua,
        paladar,
        piso_boca,
        glandula_salival,
        carrillos,
        fasetas_desgaste,
        fracturas,
        patologia_pulpar,
        patologia_tejidos,
        observaciones,
        frecuencia_cepillado,
        seda_dental,
        habitos,
        observaciones2,
        diagnostico,
        plan_tratamiento,
      ],
      (error, results) => {
        if (error) {
          console.error("Error executing query: ", error);
          return res.status(500).json({
            error: "Error cargando a farmacia el medicamento solicitado.",
          });
        }

        // Respond with the newly created medicine data
        res.status(201).json({
          id_cnt: results.insertId,
          voided,
          id_num_doc,
          fecha_registro,
          fecha_ultima_visita,
          intolerancia_anestesia,
          medicacion_actual,
          alergias,
          convulsiones,
          diabetes,
          sinusitis,
          hepatitis,
          hipertension_arterial,
          hipotension_arterial,
          hematopoyetico,
          enf_infectocontagiosas,
          enf_cardiovasculares,
          enf_respiratorias,
          enf_endocrinas,
          fiebre_reumatoidea,
          cirugias,
          cual,
          otra_enfermedad,
          antecedentes,
          penicilina,
          otros_med,
          cuales,
          atm,
          ganglios,
          labios,
          lengua,
          paladar,
          piso_boca,
          glandula_salival,
          carrillos,
          fasetas_desgaste,
          fracturas,
          patologia_pulpar,
          patologia_tejidos,
          observaciones,
          frecuencia_cepillado,
          seda_dental,
          habitos,
          observaciones2,
          diagnostico,
          plan_tratamiento,
        });
      }
    );
  }
);

// Create a new Odontograma
app.post(
  "/api/odontograma_json",
  [
    check("id_num_doc")
      .notEmpty()
      .withMessage("El ID del Paciente es requerido"),
    check("location_b")
      .notEmpty()
      .withMessage("El nombre de la Brigada es requerido"),  
  ],
  validatePostData,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      voided,
      id_num_doc,
      location_b,
      diente,
      cara_diente,
      hallazgo,
    } = req.body;

    const fecha_reg = new Date(); // Get the current date and time

    const query =
      "INSERT INTO alasparagente.odontograma (voided, fecha_reg, id_num_doc, location_b, diente, cara_diente, hallazgo) VALUES (?, ?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [
        voided,
        fecha_reg,
        id_num_doc,
        location_b,
        diente,
        cara_diente,
        hallazgo,
      ],
      (error, results) => {
        if (error) {
          console.error("Error executing query: ", error);
          return res.status(500).json({
            error: "Error cargando odontograma.",
          });
        }

        // Respond with the newly created medicine data
        res.status(201).json({
          id_cnt: results.insertId,
          voided,
          fecha_reg,
          id_num_doc,
          location_b,
          diente,
          cara_diente,
          hallazgo,
        });
      }
    );
  }
);

// Create a new OdontoTratamiento
app.post(
  "/api/tratamientodonto_json",
  [
    check("id_num_doc")
      .notEmpty()
      .withMessage("El ID del Paciente es requerido"),
    check("location_b")
      .notEmpty()
      .withMessage("El nombre de la Brigada es requerido"), 
    check("cantidad")
      .isInt({ min: 1 })
      .isInt({ max: 100 })
      .withMessage("Ingrese una cantidad válida para registrar"),   
  ],
  validatePostData,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      voided,
      id_num_doc,
      location_b,
      tratamiento,
      cantidad,
      comentario,
    } = req.body;

    const fecha_reg = new Date(); // Get the current date and time

    const query =
      "INSERT INTO alasparagente.odontograma (voided, fecha_reg, id_num_doc, location_b, tratamiento, cantidad, comentario) VALUES (?, ?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [
        voided,
        fecha_reg,
        id_num_doc,
        location_b,
        tratamiento,
        cantidad,
        comentario,
      ],
      (error, results) => {
        if (error) {
          console.error("Error executing query: ", error);
          return res.status(500).json({
            error: "Error cargando tratamiento odontologia.",
          });
        }

        // Respond with the newly created medicine data
        res.status(201).json({
          id_cnt: results.insertId,
          voided,
          id_num_doc,
          fecha_reg,
          location_b,
          tratamiento,
          cantidad,
          comentario,
        });
      }
    );
  }
);

// ipconfig getifaddr en0 = 192.168.10.15 mac AP
// ipconfig = 192.168.x.x pc NP
const port = process.env.PORT || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
