import React from "react";
import OdontologyItem from "./OdontologyItem";
import "./MedicList.css";
 
const OdontologyList = (props) => {
  // console.log("props.items en OdontologyList:", props.items);

  if (props.items.length === 0) {
    return <h2 className="history-list__fallback">No encontró resultados.</h2>;
  }

  return (
    <ul className="history-list">
      {props.items.map((odontology) => (
        <OdontologyItem
          key={odontology.id_cnt} // (int)
          id_num_doc={odontology.id_num_doc} // (varchar)
          fecha_ultima_visita={odontology.fecha_ultima_visita}
          intolerancia_anestesia={odontology.intolerancia_anestesia}
          medicacion_actual={odontology.medicacion_actual}
          alergias={odontology.alergias}
          convulsiones={odontology.convulsiones}
          diabetes={odontology.diabetes}
          sinusitis={odontology.sinusitis}
          hepatitis={odontology.hepatitis}
          hipertension_arterial={odontology.hipertension_arterial}
          hipotension_arterial={odontology.hipotension_arterial}
          hematopoyetico={odontology.hematopoyetico}
          enf_infectocontagiosas={odontology.enf_infectocontagiosas}
          enf_cardiovasculares={odontology.enf_cardiovasculares}
          enf_respiratorias={odontology.enf_respiratorias}
          enf_endocrinas={odontology.enf_endocrinas}
          fiebre_reumatoidea={odontology.fiebre_reumatoidea}
          cirugias={odontology.cirugias}
          cual={odontology.cual}
          otra_enfermedad={odontology.otra_enfermedad}
          penicilina={odontology.penicilina}
          otros_med={odontology.otros_med}
          cuales={odontology.cuales}
          atm={odontology.atm}
          ganglios={odontology.ganglios}
          labios={odontology.labios}
          lengua={odontology.lengua}
          paladar={odontology.paladar}
          piso_boca={odontology.piso_boca}
          glandula_salival={odontology.glandula_salival}
          carrillos={odontology.carrillos}
          fasetas_desgaste={odontology.fasetas_desgaste}
          fracturas={odontology.fracturas}
          patologia_pulpar={odontology.patologia_pulpar}
          patologia_tejidos={odontology.patologia_tejidos}
          observaciones={odontology.observaciones}
          frecuencia_cepillado={odontology.frecuencia_cepillado}
          seda_dental={odontology.seda_dental}
          habitos={odontology.habitos}
          observaciones2={odontology.observaciones2}
          diagnostico={odontology.diagnostico}
          plan_tratamiento={odontology.plan_tratamiento}
        />
      ))}
    </ul>
  );
};

export default OdontologyList;
