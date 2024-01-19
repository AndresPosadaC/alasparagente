import React from "react";
import OptometryItem from "./OptometryItem";
import "./MedicList.css";

const OptometryList = (props) => {
  // console.log("props.items en OptometryList:", props.items);

  if (props.items.length === 0) {
    return <h2 className="history-list__fallback">No encontró resultados.</h2>;
  }
 
  return (
    <ul className="history-list">
      {props.items.map((optometry) => (
        <OptometryItem
          key={optometry.id_cnt} // (int)
          id_num_doc={optometry.id_num_doc} // (varchar)
          mala_vision_lejos={optometry.mala_vision_lejos} // (false)
          mala_vision_cerca={optometry.mala_vision_cerca} // (false)
          ojo_rojo={optometry.ojo_rojo} // (false)
          prurito_ocular={optometry.prurito_ocular} // (false)
          dolor={optometry.dolor} // (false)
          hiperemia={optometry.hiperemia} // (false)
          lagrimeo={optometry.lagrimeo} // (false)
          ardor_ocular={optometry.ardor_ocular} // (false)
          salto_renglon={optometry.salto_renglon} // (false)
          cansancio_visual={optometry.cansancio_visual} // (false)
          caspa_parpados={optometry.caspa_parpados} // (false)
          otro={optometry.otro} // (false)
          cual={optometry.cual} // (varchar)
          diabetes={optometry.diabetes} // (false)
          trauma_ocular={optometry.trauma_ocular} // (false)
          usa_correccion={optometry.usa_correccion} // (false)
          hta={optometry.hta} // (false)
          cirugia_ocular={optometry.cirugia_ocular} // (false)
          cardiovasculares={optometry.cardiovasculares} // (false)
          vicios_reflaccion={optometry.vicios_reflaccion} // (false)
          artritis={optometry.artritis} // (false)
          ceguera={optometry.ceguera} // (false)
          farmacos={optometry.farmacos} // varchar
          otros={optometry.otros} // (false)
          cuales={optometry.cuales} // varchar
          motivo_consulta={optometry.motivo_consulta} // varchar
          scvlod={optometry.scvlod} // agudeza visual sin correccion vision lateral ojo derecho varchar
          scvloi={optometry.scvloi} // agudeza visual sin correccion vision lateral ojo izquierdo varchar
          scvlao={optometry.scvlao} // agudeza visual sin correccion vision lateral ambos ojos varchar
          ccvlod={optometry.ccvlod} // agudeza visual con correccion vision lateral ojo derecho varchar
          ccvloi={optometry.ccvloi} // agudeza visual con correccion vision lateral ojo izquierdo varchar
          ccvlao={optometry.ccvlao} // agudeza visual con correccion vision lateral ambos ojos varchar
          lensometria_od={optometry.lensometria_od} // lensometria ojo derecho (varchar)
          lensometria_oi={optometry.lensometria_oi} // lensometria ojo izquierdo (varchar)
          tonometria_od={optometry.tonometria_od} // tonometria ojo derecho (varchar)
          tonometria_oi={optometry.tonometria_oi} // tonometria ojo izquierdo (varchar)
          cover_test={optometry.cover_test} // cover test (varchar)
          cover_test_6m={optometry.cover_test_6m} // cover test 6m (varchar)
          cover_test_30cm={optometry.cover_test_30cm} // cover test 30cm (varchar)
          oftalmoscopia_od={optometry.oftalmoscopia_od} // oftalmoscopia ojo derecho (varchar)
          oftalmoscopia_oi={optometry.oftalmoscopia_oi} // oftalmoscopia ojo izquierdo (varchar)
          queratometria_od={optometry.queratometria_od} // queratometria ojo derecho (varchar)
          queratometria_oi={optometry.queratometria_oi} // queratometria ojo derecho (varchar)
          test_color={optometry.test_color} // test color (varchar)
          estereopsis={optometry.estereopsis} // estereopsis (varchar)
          retinoscopia_od={optometry.retinoscopia_od} // retinoscopia ojo derecho (varchar)
          retinoscopia_od_avvl={optometry.retinoscopia_od_avvl} // retinoscopia AVVL ojo derecho (varchar)
          retinoscopia_od_avvp={optometry.retinoscopia_od_avvp} // retinoscopia AVVP ojo derecho (varchar)
          retinoscopia_oi={optometry.retinoscopia_oi} // retinoscopia ojo izquierdo (varchar)
          retinoscopia_oi_avvl={optometry.retinoscopia_oi_avvl} // retinoscopia AVVL ojo izquierdo (varchar)
          retinoscopia_oi_avvp={optometry.retinoscopia_oi_avvp} // retinoscopia AVVL ojo izquierdo (varchar)
          subjetivo_od={optometry.subjetivo_od} // subjetivo ojo derecho (varchar)
          subjetivo_od_av={optometry.subjetivo_od_av} // subjetivo AV ojo derecho (varchar)
          subjetivo_od_add={optometry.subjetivo_od_add} // subjetivo ADD ojo derecho (varchar)
          subjetivo_oi={optometry.subjetivo_oi} // subjetivo ojo izquierdo (varchar)
          subjetivo_oi_av={optometry.subjetivo_oi_av} // subjetivo AV ojo izquierdo (varchar)
          subjetivo_oi_add={optometry.subjetivo_oi_add} // subjetivo ADD ojo izquierdo (varchar)
          impresion_diagnostica={optometry.impresion_diagnostica} // varchar
          cie10={optometry.cie10} // varchar
          conducta={optometry.conducta} // varchar
          formula_final_od={optometry.formula_final_od} // varchar
          formula_final_od_add={optometry.formula_final_od_add} // varchar
          formula_final_od_dp={optometry.formula_final_od_dp} // varchar
          formula_final_oi={optometry.formula_final_oi} // varchar
          formula_final_oi_add={optometry.formula_final_oi_add} // varchar
          formula_final_oi_dp={optometry.formula_final_oi_dp} // varchar
          tipo={optometry.tipo} // varchar
          medicamentos={optometry.medicamentos} // Aqui debería traer la info de medicamentos disponibles
          rx={optometry.rx} //  rx (false)
          uso={optometry.uso} // varchar
          control={optometry.control} // varchar
        />
      ))}
    </ul>
  );
};

export default OptometryList;
