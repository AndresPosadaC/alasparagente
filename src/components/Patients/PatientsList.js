import React from 'react';
import PatientItem from './PatientItem'; 
import './PatientsList.css';

const PatientsList = (props) => {
  // console.log('PatientsList:', props);

  if (props.items.length === 0) {
    return <h2 className='patients-list__fallback'>No encontró resultados.</h2>;
  }
 
  return (
    <ul className='patients-list'>
      {props.items.map((patient) => (
        <PatientItem
        key={patient.id_num_doc}
        id_num_doc={patient.id_num_doc}
        nombres={patient.nombres}
        apellidos={patient.apellidos}
        nacimiento={patient.nacimiento}
        edad={patient.edad}
        estado_civil={patient.estado_civil}
        sexo={patient.sexo}
        ocupacion={patient.ocupacion || ''}
        direccion_domicilio={patient.direccion_domicilio || ''}
        localidad={patient.localidad || ''}
        telefono_fijo={patient.telefono_fijo || ''}
        celular={patient.celular || ''}
        acompanante={patient.acompanante || '' || null}
        responsable={patient.responsable || ''}
        celular_acompanante={patient.celular_acompanante || ''}
        celular_responsable={patient.celular_responsable || ''}
        parentesco_responsable={patient.parentesco_responsable || ''}
        aseguradora={patient.aseguradora || ''}
        tipo_vinculacion={patient.tipo_vinculacion || ''}
        frec_cardiaca={patient.frec_cardiaca}
        tension_arterial={patient.tension_arterial}
        frec_respiratoria={patient.frec_respiratoria}
        sat_o2={patient.sat_o2}
        temperatura={patient.temperatura}
        peso={patient.peso}
        talla={patient.talla}
        />
      ))}
    </ul>
  );
};

export default PatientsList;