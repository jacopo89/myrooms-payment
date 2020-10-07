<?php


namespace App\Model;


class PaymentDTO
{

    /**
     * @var int
     */
    private $totalAmount;


    public function __construct(int $totalAmount)
    {
        $this->totalAmount = $totalAmount;
    }

    /**
     * @return int
     */
    public function getTotalAmount(): int
    {
        return $this->totalAmount;
    }

}