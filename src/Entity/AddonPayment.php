<?php


namespace App\Entity;


use Doctrine\ORM\Mapping as ORM;

/**
 * Class AddonPayment
 * @package App\Entity
 * @ORM\Entity
 */
class AddonPayment extends Payment
{
    /**
     * @ORM\Column(type="string", length=255)
     */
    private $addonName;

    /**
     * @return mixed
     */
    public function getAddonName()
    {
        return $this->addonName;
    }

    /**
     * @param mixed $addonName
     */
    public function setAddonName($addonName): void
    {
        $this->addonName = $addonName;
    }

    private function __construct($amount, $name){
        parent::__construct($amount);
        $this->addonName = $name;
    }

    public static function from($amount, $name)
    {
        return new self($amount, $name);
    }


}