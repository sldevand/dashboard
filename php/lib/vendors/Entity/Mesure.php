<?php
namespace Entity;

use \OCFram\Entity;

class Mesure extends Entity{
	protected $idSensor;
	protected $temperature;
	protected $hygrometrie;
	protected $horodatage;
	
	//GETTERS
	public function idSensor(){return $this->idSensor;}
	public function temperature(){return $this->temperature;}
	public function hygrometrie(){return $this->hygrometrie;}
	public function horodatage(){return $this->horodatage;}
	
	//SETTERS
	
	public function setIdSensor($idSensor){
		
		if(!empty($idSensor) && is_string($idSensor){
			$this->idSensor=$idSensor;
		}else{
			throw new Exception('idSensor invalide!');
		}		
	}
	
	public function setTemperature($temperature){				
		$this->temperature=$temperature;			
	}
	
	public function setHygrometrie($hygrometrie){				
		$this->hygrometrie=$hygrometrie;			
	}
	
	public function setHorodatage($horodatage){
		
		if(!empty($horodatage) && is_string($horodatage){
			$this->horodatage=$horodatage;			
		}else{
			throw new Exception('horodatage invalide!');
	}	
	

	
	
}