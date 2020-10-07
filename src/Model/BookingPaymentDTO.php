<?php


namespace App\Model;


class BookingPaymentDTO
{
    /**
     * @var int
     */
    private $totalAmount;

    /**
     * @var string
     */
    private $referenceId;

    /**
     * @var string
     */
    private $client;

    /**
     * @var \DateTimeImmutable
     */
    private $checkIn;

    /**
     * @var \DateTimeImmutable
     */
    private $checkOut;

    /**
     * @var int
     */
    private $total;

    /**
     * @var string
     */
    private $roomName;

    /**
     * @var string
     */
    private $roomDescription;

    /**
     * @var string
     */
    private $roomImageUrl;

    /**
     * @var int
     */
    private $weeklyPrice;

    /**
     * @var int
     */
    private $monthlyPrice;

    public function __construct(int $amount, \DateTimeImmutable $checkIn, \DateTimeImmutable $checkOut, int $total, string $roomName, string $roomDescription, string $roomImageUrl, int $weeklyPrice, int $monthlyPrice, string $referenceId, string $client)
    {

        $this->totalAmount = $amount;
        $this->checkIn = $checkIn;
        $this->checkOut = $checkOut;
        $this->total = $total;
        $this->roomName = $roomName;
        $this->roomDescription = $roomDescription;
        $this->roomImageUrl = $roomImageUrl;
        $this->weeklyPrice = $weeklyPrice;
        $this->monthlyPrice = $monthlyPrice;
        $this->referenceId = $referenceId;
        $this->client = $client;
    }


    /**
     * @return int
     */
    public function getTotalAmount(): int
    {
        return $this->totalAmount;
    }

    /**
     * @return string
     */
    public function getReferenceId(): string
    {
        return $this->referenceId;
    }

    /**
     * @return string
     */
    public function getClient(): string
    {
        return $this->client;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getCheckIn(): \DateTimeImmutable
    {
        return $this->checkIn;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getCheckOut(): \DateTimeImmutable
    {
        return $this->checkOut;
    }

    /**
     * @return int
     */
    public function getTotal(): int
    {
        return $this->total;
    }

    /**
     * @return string
     */
    public function getRoomName(): string
    {
        return $this->roomName;
    }

    /**
     * @return string
     */
    public function getRoomDescription(): string
    {
        return $this->roomDescription;
    }

    /**
     * @return string
     */
    public function getRoomImageUrl(): string
    {
        return $this->roomImageUrl;
    }

    /**
     * @return int
     */
    public function getWeeklyPrice(): int
    {
        return $this->weeklyPrice;
    }

    /**
     * @return int
     */
    public function getMonthlyPrice(): int
    {
        return $this->monthlyPrice;
    }




}