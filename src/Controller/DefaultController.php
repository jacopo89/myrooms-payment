<?php
/**
 * Created by PhpStorm.
 * User: jacop
 * Date: 23-Feb-20
 * Time: 1:44 AM
 */

namespace App\Controller;


use App\Entity\AddonPayment;
use App\Entity\BookingPayment;
use App\Entity\Payment;
use App\Model\BookingPaymentDTO;
use Doctrine\ORM\EntityManagerInterface;
use Myrooms\Payment\Contracts\REST\CreatePaymentRequest;
use Myrooms\Payment\Contracts\REST\CreatePaymentRequestContract;
use Myrooms\Payment\Contracts\REST\CreatePaymentResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class DefaultController extends AbstractController
{

    private $em;
    private $router;

    public function __construct(EntityManagerInterface $em, UrlGeneratorInterface $router){
        $this->em = $em;
        $this->router = $router;
    }

    /**
     * @Route("/{route}", name="home", requirements={"route"="^(?!api).*$"})
     */
    public function index()
    {
        return $this->render('default/base.html.twig');
    }


    /**
     * @param Payment $payment
     * @Route("/api/get-payment/{ulid}")
     */
    public function getPaymentByULID(Payment $payment){
        return new Response(json_encode($payment));
    }


    /**
     * @param Request $request
     * @Route("/api/create_payment")
     * @return Response
     */
    public function createPayment(Request $request){
        $data = json_decode($request->getContent(), true);
        $data["checkin"] = new \DateTimeImmutable($data["checkin"]);
        $data["checkout"] = new \DateTimeImmutable($data["checkout"]);

        $createPaymentRequest = CreatePaymentRequest::fromArray($data);

        $bookingPaymentDTO = new BookingPaymentDTO(
            $createPaymentRequest->getAmount(),$createPaymentRequest->getCheckIn(), $createPaymentRequest->getCheckOut(), $createPaymentRequest->getTotal(),
            $createPaymentRequest->getRoomName(),$createPaymentRequest->getRoomImageUrl(), $createPaymentRequest->getRoomImageUrl(),
            $createPaymentRequest->getWeeklyPrice(),$createPaymentRequest->getMonthlyPrice(), $createPaymentRequest->getReferenceId(), $createPaymentRequest->getClient());

        $bookingPayment = BookingPayment::fromBookingPaymentDTO($bookingPaymentDTO);

        $this->em->persist($bookingPayment);
        $this->em->flush();

        $url = $this->router->generate('home',['route'=>  $bookingPayment->getUrl()], UrlGeneratorInterface::ABSOLUTE_URL);
        $createPaymentResponse = new CreatePaymentResponse($url, $bookingPayment->getUlid());

        return new Response(json_encode($createPaymentResponse->toArray()));

    }

    /**
     * @param Request $request
     * @Route("/api/create_addon")
     * @return Response
     */
    public function createAddon(Request $request){
        $data = json_decode($request->getContent(), true);

        $addon = AddonPayment::from(1,"name");
        $this->em->persist($addon);
        $this->em->flush();

        $url = $this->router->generate('home',['route'=>  $addon->getUrl()], UrlGeneratorInterface::ABSOLUTE_URL);
        $createPaymentResponse = new CreatePaymentResponse($url, $addon->getUlid());

        return new Response(json_encode($createPaymentResponse->toArray()));

    }



}