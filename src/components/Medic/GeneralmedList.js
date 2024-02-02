import React from "react";
import GeneralmedItem from "./GeneralmedItem";
import "./MedicList.css";

const GeneralmedList = (props) => {
  // console.log("props.items en GeneralmedList:", props.items);

  if (props.items.length === 0) {
    return <h2 className="history-list__fallback">No encontró resultados.</h2>;
  }

  return (
    <ul className="history-list">
      {props.items.map((generalmed) => (
        <GeneralmedItem
          key={generalmed.id_cnt} // (int)
          id_num_doc={generalmed.id_num_doc} // ( varchar(45))
          fecha_registro={generalmed.fecha_registro} // ( date)
          frec_cardiaca={generalmed.frec_cardiaca} // ( double)
          tension_arterial={generalmed.tension_arterial} // ( varchar(45))
          frec_respiratoria={generalmed.frec_respiratoria} // ( double)
          sat_o2={generalmed.sat_o2} // ( double NOT)
          temperatura={generalmed.temperatura} // ( double NOT)
          peso={generalmed.peso} // ( double)
          talla={generalmed.talla} // ( double)
          paraclinicos={generalmed.paraclinicos} // ( varchar(500))
          enfermedad_actual={generalmed.enfermedad_actual} // ( varchar(100))
          gineco={generalmed.gineco} // ( tinyint(4))
          gineco_gestaciones={generalmed.gineco_gestaciones} // ( int(11))
          gineco_partos={generalmed.gineco_partos} // ( int(11))
          gineco_cesarias={generalmed.gineco_cesarias} // ( int(11))
          gineco_abortos={generalmed.gineco_abortos} // ( int(11))
          gineco_vivos={generalmed.gineco_vivos} // ( int(11))
          alergias={generalmed.alergias} // ( varchar(250))
          med_alergias={generalmed.med_alergias} // ( varchar(250))
          med_antecedentes={generalmed.med_antecedentes} // ( varchar(500))
          transfusion_ant={generalmed.transfusion_ant} // ( tinyint(4))
          quirurgicos_ant={generalmed.quirurgicos_ant} // ( varchar(250))
          alcohol_ant={generalmed.alcohol_ant} // ( tinyint(4))
          fuma_ant={generalmed.fuma_ant} // ( tinyint(4))
          psicoactivas_ant={generalmed.psicoactivas_ant} // ( tinyint(4))
          familia_ant={generalmed.familia_ant} // ( varchar(500))
          diagnostico={generalmed.diagnostico} // ( varchar(500))
          impresion_diagnostico={generalmed.impresion_diagnostico} // ( varchar(45))
          confirmado_diagnostico={generalmed.confirmado_diagnostico} // ( varchar(45))
          cod_cie10={generalmed.cod_cie10} // ( varchar(45))
          consulta_1vez={generalmed.consulta_1vez} // ( tinyint(4))
          consulta_control={generalmed.consulta_control} // ( tinyint(4))
          enfermedad_general={generalmed.enfermedad_general} // ( tinyint(4))
          paciente_sano={generalmed.paciente_sano} // ( tinyint(4))
          meternidad={generalmed.meternidad} // ( tinyint(4))
          accidente_trabajo={generalmed.accidente_trabajo} // ( tinyint(4))
          enfermedad_profesional={generalmed.enfermedad_profesional} // ( tinyint(4))
          plan={generalmed.plan} // ( varchar(500))
          tratamiento={generalmed.tratamiento} // ( varchar(500))
          seguimiento={generalmed.seguimiento} // ( tinyint(4))
          cual={generalmed.cual} // ( varchar(45))
          remision={generalmed.remision} // ( varchar(45))
        />
      ))}
    </ul>
  );
};

export default GeneralmedList;
