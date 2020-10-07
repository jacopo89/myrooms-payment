<?php


namespace App\Entity;


use App\Model\BookingPaymentDTO;
use Doctrine\ORM\Mapping as ORM;
use Ulid\Ulid;

/**
 * Class BookingPayment
 * @package App\Entity
 * @ORM\Entity()
 */
class BookingPayment extends Payment implements \JsonSerializable
{


    /**
     * @ORM\Column(type="string", length=255)
     */
    private $roomName;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $total;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $roomDescription;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $roomImageUrl;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $checkIn;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $checkOut;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $monthlyPrice;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $weeklyPrice;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $referenceId;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $client;

    /**
     * @ORM\Column(type="string")
     */
    protected $ulid;



    /**
     * @return string
     */
    public function getRoomName(): string
    {
        return $this->roomName;
    }

    /**
     * @param mixed $roomName
     */
    public function setRoomName($roomName): void
    {
        $this->roomName = $roomName;
    }

    /**
     * @return mixed
     */
    public function getTotal()
    {
        return $this->total;
    }

    /**
     * @param mixed $total
     */
    public function setTotal($total): void
    {
        $this->total = $total;
    }

    /**
     * @return mixed
     */
    public function getRoomDescription()
    {
        return $this->roomDescription;
    }

    /**
     * @param mixed $roomDescription
     */
    public function setRoomDescription($roomDescription): void
    {
        $this->roomDescription = $roomDescription;
    }

    /**
     * @return mixed
     */
    public function getRoomImageUrl()
    {
        return $this->roomImageUrl;
    }

    /**
     * @param mixed $roomImageUrl
     */
    public function setRoomImageUrl($roomImageUrl): void
    {
        $this->roomImageUrl = $roomImageUrl;
    }

    /**
     * @return mixed
     */
    public function getCheckIn()
    {
        return $this->checkIn;
    }

    /**
     * @param mixed $checkIn
     */
    public function setCheckIn($checkIn): void
    {
        $this->checkIn = $checkIn;
    }

    /**
     * @return mixed
     */
    public function getCheckOut()
    {
        return $this->checkOut;
    }

    /**
     * @param mixed $checkOut
     */
    public function setCheckOut($checkOut): void
    {
        $this->checkOut = $checkOut;
    }

    /**
     * @return mixed
     */
    public function getMonthlyPrice()
    {
        return $this->monthlyPrice;
    }

    /**
     * @param mixed $monthlyPrice
     */
    public function setMonthlyPrice($monthlyPrice): void
    {
        $this->monthlyPrice = $monthlyPrice;
    }

    /**
     * @return mixed
     */
    public function getWeeklyPrice()
    {
        return $this->weeklyPrice;
    }

    /**
     * @param mixed $weeklyPrice
     */
    public function setWeeklyPrice($weeklyPrice): void
    {
        $this->weeklyPrice = $weeklyPrice;
    }

    /**
     * @return mixed
     */
    public function getReferenceId()
    {
        return $this->referenceId;
    }

    /**
     * @param mixed $referenceId
     */
    public function setReferenceId($referenceId): void
    {
        $this->referenceId = $referenceId;
    }

    /**
     * @return mixed
     */
    public function getClient()
    {
        return $this->client;
    }

    /**
     * @param mixed $client
     */
    public function setClient($client): void
    {
        $this->client = $client;
    }

    /**
     * @return string
     */
    public function getUlid(): string
    {
        return $this->ulid;
    }

    /**
     * @param string $ulid
     */
    public function setUlid(string $ulid): Payment
    {
        $this->ulid = $ulid;
    }

    /**
     * @return int
     */
    public function getTotalAmount(): int
    {
        return $this->totalAmount;
    }

    /**
     * @param int $totalAmount
     */
    public function setTotalAmount(int $totalAmount): Payment
    {
        $this->totalAmount = $totalAmount;
    }

    /**
     * @return int
     */
    public function getStatus(): int
    {
        return $this->status;
    }

    /**
     * @param int $status
     */
    public function setStatus(int $status): Payment
    {
        $this->status = $status;
    }

    /**
     * @return mixed
     */
    public function getPaymentType():int
    {
        return $this->paymentType;
    }

    /**
     * @param mixed $paymentType
     */
    public function setPaymentType($paymentType): Payment
    {
        $this->paymentType = $paymentType;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getCreationTime(): \DateTimeImmutable
    {
        return $this->creationTime;
    }

    /**
     * @param \DateTimeImmutable $creationTime
     */
    public function setCreationTime(\DateTimeImmutable $creationTime): void
    {
        $this->creationTime = $creationTime;
    }

    /**
     * @return mixed
     */
    public function getPaymentTime()
    {
        return $this->paymentTime;
    }

    /**
     * @param mixed $paymentTime
     */
    public function setPaymentTime($paymentTime): void
    {
        $this->paymentTime = $paymentTime;
    }



    private function __construct(int $totalAmount, int $total, string $referenceId, string $client, string $roomName, string $roomDescription, string $roomImageUrl, \DateTimeImmutable $checkIn, \DateTimeImmutable $checkOut, int $monthlyPrice, int $weeklyPrice){
        parent::__construct($totalAmount);
        $this->referenceId = $referenceId;
        $this->total = $total;
        $this->client = $client;
        $this->roomName = $roomName;
        $this->roomDescription = $roomDescription;
        $this->roomImageUrl = $roomImageUrl;
        $this->checkIn = $checkIn;
        $this->checkOut = $checkOut;
        $this->monthlyPrice = $monthlyPrice;
        $this->weeklyPrice = $weeklyPrice;

    }

    public static function fromBookingPaymentDTO(BookingPaymentDTO $bookingPaymentDTO)
    {
        return new self($bookingPaymentDTO->getTotalAmount(), $bookingPaymentDTO->getTotal(), $bookingPaymentDTO->getReferenceId(), $bookingPaymentDTO->getClient(), $bookingPaymentDTO->getRoomName(), $bookingPaymentDTO->getRoomDescription(), $bookingPaymentDTO->getRoomImageUrl(), $bookingPaymentDTO->getCheckIn(), $bookingPaymentDTO->getCheckOut(), $bookingPaymentDTO->getMonthlyPrice(), $bookingPaymentDTO->getWeeklyPrice());
    }

    public function getUrl(){
        return "/pay/".$this->ulid;
    }

    public function jsonSerialize() :array
    {
        return [
            'amount' => $this->totalAmount,
            'roomName' =>$this->roomName,
            'roomDescription'=>$this->roomDescription,
            'roomImageUrl' => $this->roomImageUrl,
            'checkin' => $this->checkIn->format('Y-m-d'),
            'checkout' => $this->checkOut->format('Y-m-d'),
            'monthlyPrice' => $this->monthlyPrice,
            'weeklyPrice' => $this->weeklyPrice

        ];
    }





}