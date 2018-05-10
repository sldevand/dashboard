<?php
namespace Model;

use \OCFram\Manager;

class MesuresManagerPDO extends Manager{
	
	public function add(Mesure $mesure)
	{
		$q = $this->dao->prepare('INSERT INTO mesures (id_sensor, temperature, hygrometrie, horodatage) VALUES (:id_sensor,:temperature,:hygrometrie,:horodatage)');

		$q->bindParam(':id_sensor',$mesure->idSensor);
		$q->bindParam(':temperature',$mesure->temperature);
		$q->bindParam(':hygrometrie',$mesure->hygrometrie);
		$q->bindParam(':horodatage',$mesure->horodatage);
		$q->execute();
		
		$q->closeCursor();	
	}
}


