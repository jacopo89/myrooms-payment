<?php

namespace App\Entity;

use App\Model\PaymentDTO;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\DiscriminatorColumn;
use Doctrine\ORM\Mapping\DiscriminatorMap;
use Doctrine\ORM\Mapping\InheritanceType;
use Ulid\Ulid;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PaymentRepository")
 * @InheritanceType("JOINED")
 * @DiscriminatorColumn(name="discr", type="string")
 * @DiscriminatorMap({"payment" = "Payment", "booking" = "BookingPayment", "addon"="AddonPayment"})
 */
class Payment implements \JsonSerializable
{
    const STATUS_CREATED = 0;
    const STATUS_PENDING = 1;
    const STATUS_ACCEPTED = 2;

    const TYPE_STRIPE = 0;


    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $ulid;

    /**
     * @ORM\Column(type="integer")
     */
    protected $totalAmount;

    /**
     * @ORM\Column(type="integer")
     */
    protected $status;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $paymentType;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    protected $creationTime;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     */
    protected $paymentTime;


    private $discr;



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUlid(): ?string
    {
        return $this->ulid;
    }

    public function setUlid(string $ulid): self
    {
        $this->ulid = $ulid;

        return $this;
    }

    public function getTotalAmount(): ?int
    {
        return $this->totalAmount;
    }

    public function setTotalAmount(int $totalAmount): self
    {
        $this->totalAmount = $totalAmount;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getPaymentType(): ?int
    {
        return $this->paymentType;
    }

    public function setPaymentType(int $paymentType): self
    {
        $this->paymentType = $paymentType;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getDiscr()
    {
        return $this->discr;
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



    protected function __construct(int $totalAmount){
        $this->totalAmount = $totalAmount;
        $this->creationTime = new \DateTimeImmutable();
        $this->status = self::STATUS_CREATED;
        $this->ulid = (string) Ulid::generate();

    }


    public static function fromPaymentDTO(PaymentDTO $paymentDTO): self
    {
        return new self($paymentDTO->getTotalAmount());
    }

    public function jsonSerialize() :array
    {
        return [
            'amount' => $this->totalAmount,
        ];
    }
}
